import Cookies from 'js-cookie'

import { request } from '../../util/request'

export function auth(
  state = {
    checking: false,
    valid: Cookies.get(CONFIG.COOKIE_NAME) ? true : false,
    sessionToken: Cookies.get(CONFIG.COOKIE_NAME)
  },
  action
) {
  switch (action.type) {
    case 'FETCHING_AUTH':
      return {
        ...state,
        checking: true
      }

    case 'FETCH_AUTH_SUCCESS':
    case 'FETCH_VERIFY_SUCCESS':
      if (action.payload.meta.token) {
        Cookies.set(CONFIG.COOKIE_NAME, action.payload.meta.token, {
          path: '/',
          domain: CONFIG.COOKIE_DOMAIN
        })
      }

      return {
        ...state,
        checking: false,
        valid: action.payload.code === 200,
        sessionToken: action.payload.meta.token
      }

    case 'FETCH_2FA_SUCCESS':
      return { ...state, valid: true }
    case 'FETCH_2FA_ERROR':
      return { ...state, valid: false }

    case 'FETCH_VERIFY_ERROR':
    case 'FETCH_AUTH_ERROR':
      return {
        ...state,
        checking: false,
        valid: false
      }

    case 'LOGOUT':
      Cookies.remove(CONFIG.COOKIE_NAME, {
        path: '/',
        domain: CONFIG.COOKIE_DOMAIN
      })

      return {
        checking: false,
        valid: false
      }
    default:
      return state
  }
}

export function verifyAuth(unsubscribe) {
  return dispatch => {
    request(`${CONFIG.API_AUTH}/verify`)
      .then(json => {
        dispatch({
          type: 'FETCH_VERIFY_SUCCESS',
          payload: json
        })
        if (unsubscribe) {
          unsubscribe()
        }
      })
      .catch(err => {
        console.error('VERIFY ERR', err)
        dispatch({
          type: 'FETCH_VERIFY_ERROR',
          auth: false,
          err
        })
      })
  }
}

export function login(email, password) {
  return dispatch => {
    return request(`${CONFIG.API_AUTH}/login`, {
      body: { email, password }
    }).then(json => {
      if ((!json.error && json.code === 200) || json.code === 202) {
        dispatch({
          type: 'FETCH_AUTH_SUCCESS',
          payload: json
        })
      }

      return json
    })
  }
}

export function logout() {
  return dispatch => {
    return request(`${CONFIG.API_AUTH}/logout`).catch(err => {
      console.error(err)
      dispatch({
        type: 'FETCH_AUTH_ERROR',
        err
      })
    })
  }
}
