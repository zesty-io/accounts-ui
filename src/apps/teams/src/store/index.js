import { request } from '../../../../util/request'
import config from '../../../../shell/config'

export function teams(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_TEAMS_SUCCESS':
      return { ...state, ...action.data }
    case 'FETCHING_TEAMS_FAILURE':
    case 'FETCHING_TEAMS':
    default:
      return state
  }
}

// CRUD teams here

export const fetchTeams = userZUID => {
  return dispatch => {
    dispatch({ type: 'FETCHING_TEAMS' })
    return request(`${config.API_ACCOUNTS}/teams/${userZUID}`)
      .then(res => {
        dispatch({ type: 'FETCHING_TEAMS_SUCCESS', data: res.data })
        return res.data
      })
      .catch(err => {
        dispatch({ type: 'FETCHING_TEAMS_FAILURE', err })
        console.table(err)
        return err
      })
  }
}
