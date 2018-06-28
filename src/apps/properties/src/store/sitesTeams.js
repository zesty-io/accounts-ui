import { request } from '../../../../util/request'

export function sitesTeams(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_TEAMS':
      return state
    case 'FETCH_TEAMS_SUCCESS':
      return { ...state, [action.siteZuid]: action.Teams }
    case 'FETCH_TEAMS_ERROR':
      return state
    default:
      return state
  }
}

export const fetchSiteTeams = siteZuid => {
  return dispatch => {
    dispatch({
      type: 'FETCHING_TEAMS'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZuid}/Teams`)
      .then(Teams => {
        dispatch({
          type: 'FETCH_TEAMS_SUCCESS',
          Teams: Teams.data,
          siteZuid
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'FETCH_TEAMS_ERROR',
          err
        })
      })
  }
}
