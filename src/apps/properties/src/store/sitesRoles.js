import { request } from '../../../../util/request'
import config from '../../../../shell/config'

export function sitesRoles(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_ROLES':
      return state
    case 'FETCH_ROLES_SUCCESS':
      return {...state, [action.siteZuid]: action.normalizedRoles}
    case 'FETCH_ROLES_ERROR':
      return state
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
        let normalizedRoles = {}
        roles.data.forEach(role => {
          return normalizedRoles[role.ZUID] = role
        })
        dispatch({
          type: 'FETCH_ROLES_SUCCESS',
          siteZuid,
          normalizedRoles
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
