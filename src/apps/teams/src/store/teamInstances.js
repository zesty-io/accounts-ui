import { request } from '../../../../util/request'

export function teamInstances(state = {}, action) {
  switch (action.type) {
    case 'FETCH_TEAM_INSTANCES_SUCCESS':
      return {
        ...state,
        [action.teamZUID]: {
          ...state[action.teamZUID],
          ...action.data
        }
      }

    default:
      return state
  }
}

export function fetchTeamInstances(teamZUID) {
  return dispatch => {
    dispatch({
      type: 'FETCH_TEAM_INSTANCES'
    })
    return request(`${CONFIG.API_ACCOUNTS}/teams/${teamZUID}/instances`).then(
      res => {
        dispatch({
          type: 'FETCH_TEAM_INSTANCES_SUCCESS',
          data: res.data,
          teamZUID
        })
        return res.data
      }
    )
  }
}
