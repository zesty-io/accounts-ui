import { request } from '../../../../util/request'

export function sitesTeams(state = {}, action) {
  switch (action.type) {
    case 'FETCH_INSTANCE_TEAMS_SUCCESS':
      return { ...state, [action.siteZuid]: action.Teams }
    case 'FETCH_INSTANCE_TEAMS_ERROR':
      return state
    default:
      return state
  }
}

export const fetchSiteTeams = siteZuid => {
  return dispatch => {
    dispatch({
      type: 'FETCHING_INSTANCE_TEAMS'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZuid}/teams`)
      .then(data => {
        dispatch({
          type: 'FETCH_INSTANCE_TEAMS_SUCCESS',
          Teams: data.data,
          siteZuid
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'FETCH_INSTANCE_TEAMS_ERROR',
          err
        })
      })
  }
}
