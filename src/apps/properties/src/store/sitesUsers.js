import { request } from '../../../../util/request'
import config from '../../../../shell/config'

export function sitesUsers(state = [], action) {
  switch (action.type) {
    case 'FETCHING_USERS':
      return state
    case 'FETCH_USERS_SUCCESS':
      return action.users
    case 'FETCH_USERS_ERROR':
      return state
    case 'CLEAR_USERS':
      return []
    default:
      return state
  }
}

export const fetchSiteUsers = (userZuid, siteZuid) => {
  return dispatch => {
    dispatch({
      type: 'FETCHING_USERS'
    })
    request(`${config.API_ACCOUNTS}/instances/${siteZuid}/users`)
      .then(users => {
        dispatch({
          type: 'FETCH_USERS_SUCCESS',
          users: users.data
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'FETCH_USERS_ERROR',
          err
        })
      })
  }
}
