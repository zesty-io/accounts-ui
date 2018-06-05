import Cookies from 'js-cookie'

import { request } from '../../util/request'

export function auth(
  state = {
    checking: false,
    valid: Cookies.get(CONFIG.COOKIE_NAME) ? true : false
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
    case 'FETCH_AUTH_ERROR':
    case 'FETCH_VERIFY_SUCCESS':
    case 'FETCH_VERIFY_ERROR':
      return {
        checking: false,
        valid: action.auth
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
          ZUID: json.meta.userZuid,
          auth: json.code === 200
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
      if (!json.error) {
        dispatch({
          type: 'FETCH_AUTH_SUCCESS',
          ZUID: json.meta.userZuid,
          auth: true
        })
      }

      return json
    })
  }
}

export function logout() {
  return dispatch => {
    request(`${CONFIG.API_AUTH}/logout`)
      .then(json => {
        dispatch({
          type: 'LOGOUT'
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'FETCH_AUTH_ERROR',
          auth: false,
          err
        })
      })
  }
}
