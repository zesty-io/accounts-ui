import Cookies from 'js-cookie'
import config from '../config'
import { request } from '../../util/request'

export function auth(
  state = {
    checking: false,
    valid: Cookies.get(config.COOKIE_NAME) ? true : false
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
      Cookies.remove(config.COOKIE_NAME, {
        path: '/',
        domain: config.COOKIE_DOMAIN
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
    request(`http://${config.SERVICE_URL}:3011/verify`)
      .then(json => {
        console.log('VERIFY JSON: ', json)
        dispatch({
          type: 'FETCH_VERIFY_SUCCESS',
          zuid: json.meta.userZuid,
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

export function logout() {
  return dispatch => {
    // dispatch({
    //   type: 'FETCHING_AUTH'
    // })
    request(`http://${config.SERVICE_URL}:3011/logout`)
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
