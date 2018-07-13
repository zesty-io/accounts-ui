import { request } from '../../../../util/request'
import { notify } from '../../../../shell/store/notifications'

export function teams(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_TEAM_SUCCESS':
    case 'CREATE_TEAM_SUCCESS':
    case 'FETCH_TEAMS_SUCCESS':
    case 'FETCH_TEAM_SUCCESS':
      // Setup array for normalizing member data
      const teamWithMembers = action.data.map(team => {
        team.members = []
        return team
      })

      // We need the current state as an Array
      // so we can sort it after combining the new teams
      const currStateArray = Object.keys(state).reduce((acc, teamZUID) => {
        acc.push(state[teamZUID])
        return acc
      }, [])

      const combined = [...currStateArray, ...teamWithMembers]

      // Always sort after introducing new teams
      combined.sort((prev, next) => {
        if (prev.createdAt < next.createdAt) {
          return 1
        }
        if (prev.createdAt > next.createdAt) {
          return -1
        }
        return 0
      })

      // Convert back to expected state shape
      return combined.reduce((acc, team) => {
        acc[team.ZUID] = team
        return acc
      }, {})

    case 'INVITE_TEAM_MEMBER_SUCCESS':
    case 'FETCH_TEAM_MEMBERS_SUCCESS':
    // case 'FETCH_TEAM_MEMBER_INVITES_SUCCESS':
    //   return {
    //     ...state,
    //     [action.teamZUID]: {
    //       ...state[action.teamZUID],
    //       members: [
    //         ...state[action.teamZUID].members, // Previously fetched members
    //         ...action.data.map(member => member.ZUID) // New members
    //       ]
    //     }
    //   }

    case 'CANCEL_TEAM_INVITE_SUCCESS':
    case 'REMOVE_TEAM_MEMBER_SUCCESS':
      return {
        ...state,
        [action.teamZUID]: {
          ...state[action.teamZUID],
          members: state[action.teamZUID].members.filter(
            memberZUID => memberZUID !== action.memberZUID
          )
        }
      }

    case 'DELETE_TEAM_SUCCESS':
      return Object.keys(state)
        .filter(teamZUID => teamZUID !== action.teamZUID)
        .reduce((acc, teamZUID) => {
          acc[teamZUID] = state[teamZUID]
          return acc
        }, {})

    // case 'FETCH_TEAM_INSTANCES_SUCCESS':
    //   return {
    //     ...state,
    //     [action.teamZUID]: {
    //       ...state[action.teamZUID],
    //       instances: [...action.data]
    //     }
    //   }

    default:
      return state
  }
}

export function fetchTeams() {
  return dispatch => {
    dispatch({
      type: 'FETCH_TEAMS'
    })
    return request(`${CONFIG.API_ACCOUNTS}/teams`)
      .then(res => {
        dispatch({
          type: 'FETCH_TEAMS_SUCCESS',
          data: res.data
        })
        return res.data
      })
      .catch(err => {
        dispatch({
          type: 'FETCH_TEAMS_FAILURE',
          err
        })
        console.error(err)
        return err
      })
  }
}

export const fetchTeam = teamZUID => {
  return dispatch => {
    dispatch({
      type: 'FETCH_TEAM'
    })
    return request(`${CONFIG.API_ACCOUNTS}/teams/${teamZUID}`)
      .then(res => {
        dispatch({
          type: 'FETCH_TEAM_SUCCESS',
          data: [res.data]
        })
        return res.data
      })
      .catch(err => {
        dispatch({
          type: 'FETCH_TEAM_FAILURE',
          err
        })
        console.error(err)
        return err
      })
  }
}

export const createTeam = (name, description) => {
  return dispatch => {
    dispatch({ type: 'CREATE_TEAM' })
    return request(`${CONFIG.API_ACCOUNTS}/teams`, {
      method: 'POST',
      json: true,
      body: {
        name,
        description
      }
    })
      .then(res => {
        dispatch({
          type: 'CREATE_TEAM_SUCCESS',
          data: [res.data] // put data into shape the reducer expects
        })
        dispatch(
          notify({
            type: 'success',
            message: 'Created team successfully'
          })
        )
        return res.data
      })
      .catch(err => {
        dispatch({
          type: 'CREATE_TEAM_FAILURE',
          err
        })
        console.error(err)
        return err
      })
  }
}

export function deleteTeam(teamZUID) {
  return dispatch => {
    dispatch({
      type: 'DELETE_TEAM'
    })
    return request(`${CONFIG.API_ACCOUNTS}/teams/${teamZUID}`, {
      method: 'DELETE'
    })
      .then(res => {
        dispatch({
          type: 'DELETE_TEAM_SUCCESS',
          teamZUID
        })
        return res.data
      })
      .catch(err => {
        dispatch({
          type: 'DELETE_TEAM_FAILURE',
          err
        })
        console.error(err)
        return err
      })
  }
}

export function updateTeam(teamZUID, team) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_TEAM'
    })
    return request(`${CONFIG.API_ACCOUNTS}/teams/${teamZUID}`, {
      method: 'PUT',
      json: true,
      body: team
    })
      .then(res => {
        dispatch({
          type: 'UPDATE_TEAM_SUCCESS',
          data: [res.data]
        })

        return res.data
      })
      .catch(err => {
        dispatch({
          type: 'UPDATE_TEAM_FAILURE',
          err
        })

        console.error(err)
        return err
      })
  }
}

// export function fetchTeamInstances(teamZUID) {
//   return dispatch => {
//     dispatch({
//       type: 'FETCH_TEAM_INSTANCES'
//     })
//     return request(`${CONFIG.API_ACCOUNTS}/teams/${teamZUID}/instances`)
//       .then(res => {
//         dispatch({
//           type: 'FETCH_TEAM_INSTANCES_SUCCESS',
//           data: res.data,
//           teamZUID
//         })
//         return res.data
//       })
//       .catch(err => {
//         dispatch({
//           type: 'FETCH_TEAM_INSTANCES_FAILURE',
//           err
//         })
//         console.error(err)
//         return err
//       })
//   }
// }
