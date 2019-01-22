import { request } from '../../../../util/request'

export function sitesTeams(state = {}, action) {
  switch (action.type) {
    case 'FETCH_INSTANCE_TEAMS_SUCCESS':
      return { ...state, [action.siteZUID]: action.teams }
    case 'REMOVING_TEAM_FROM_INSTANCE_SUCCESS':
      let siteTeam = state
      siteTeam[action.siteZUID] = state[action.siteZUID].filter(
        team => team.ZUID !== action.teamZUID
      )
      return { ...siteTeam }
    case 'FETCH_INSTANCE_TEAMS_ERROR':
    default:
      return state
  }
}

export const fetchSiteTeams = siteZUID => {
  return dispatch => {
    dispatch({
      type: 'FETCHING_INSTANCE_TEAMS'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZUID}/teams`)
      .then(teams => {
        dispatch({
          type: 'FETCH_INSTANCE_TEAMS_SUCCESS',
          teams: teams.data,
          siteZUID
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
        return data
      })
      .catch(err => console.error(err))
  }
}

export function removeTeamFromInstance(siteZUID, teamZUID) {
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
          team: data.data,
          siteZUID,
          teamZUID
        })
        return data.data
      })
      .catch(err => console.error(err))
  }
}
