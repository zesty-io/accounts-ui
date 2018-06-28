import { request } from '../../../../util/request'

export function sitesTeams(state = {}, action) {
  switch (action.type) {
    case 'FETCH_INSTANCE_TEAMS_SUCCESS':
      return { ...state, [action.siteZuid]: action.teams }
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
      .then(teams => {
        dispatch({
          type: 'FETCH_INSTANCE_TEAMS_SUCCESS',
          teams: teams.data,
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

export const addTeamToInstance = (siteZUID, teamZUID, roleZUID) => {
  return dispatch => {
    dispatch({ type: 'ADDING_TEAM_TO_INSTANCE' })
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZUID}/teams`, {
      method: 'POST',
      json: true,
      body: {
        teamZUID,
        roleZUID
      }
    })
      .then(data => {
        dispatch({
          type: 'ADDING_TEAM_TO_INSTANCE_SUCCESS',
          team: data.data
        })
        return data.data
      })
      .catch(err => console.error(err))
  }
}

export const removeTeamFromInstance = (siteZUID, teamZUID) => {
  return dispatch => {
    dispatch({ type: 'REMOVING_TEAM_FROM_INSTANCE' })
    return request(
      `${CONFIG.API_ACCOUNTS}/instances/${siteZUID}/teams/${teamZUID}`,
      {
        method: 'DELETE'
      }
    )
      .then(data => {
        dispatch({
          type: 'REMOVING_TEAM_FROM_INSTANCE_SUCCESS',
          team: data.data
        })
        return data.data
      })
      .catch(err => console.error(err))
  }
}
