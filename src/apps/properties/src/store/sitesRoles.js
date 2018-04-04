import { request } from '../../../../util/request'
import config from '../../../../shell/config'

export function sitesRoles(state = [], action) {
  switch (action.type) {
    case 'FETCHING_ROLES':
      return state
    case 'FETCH_ROLES_SUCCESS':
      return action.roles
    case 'FETCH_ROLES_ERROR':
      return state
    case 'CLEAR_ROLES':
      return []
    default:
      return state
  }
}

export const fetchSiteRoles = (userZuid, siteZuid) => {
  return dispatch => {
    dispatch({
      type: 'FETCHING_ROLES'
    })
    request(`${config.API_ACCOUNTS}/instances/${siteZuid}/roles`)
      .then(roles => {
        dispatch({
          type: 'FETCH_ROLES_SUCCESS',
          roles: [roles.data]
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'FETCH_ROLES_ERROR',
          err
        })
      })
  }
}
