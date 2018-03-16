import config from '../config'
import { request } from '../../util/request'

export function user(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_USER':
      // TODO show loading state?
      return state

    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        ...action.user
      }

    case 'FETCH_AUTH_SUCCESS':
    case 'FETCH_VERIFY_SUCCESS':
      // console.log('FETCH_AUTH_SUCCESS', action)
      return {
        ...state,
        zuid: action.zuid
      }

    case 'FETCH_USER_ERROR':
      // TODO handle failure
      return state

    default:
      return state
  }
}

export function fetchUser(zuid) {
  return dispatch => {
    dispatch({
      type: 'FETCHING_USER'
    })
    request(`http://${config.API_ACCOUNTS}:6010/v1/users/${zuid}`)
      .then(user => {
        dispatch({
          type: 'FETCH_USER_SUCCESS',
          user
        })
      })
      .catch(err => {
        console.table(err)
        dispatch({
          type: 'FETCH_USER_ERROR',
          err
        })
      })
  }
}
