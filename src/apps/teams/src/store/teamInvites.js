import { request } from '../../../../util/request'
import { fetchTeam } from './teams'

export function teamInvites(state = {}, action) {
  switch (action.type) {
    case 'FETCH_TEAM_INVITES_SUCCESS':
      // Always sort after introducing new team invites
      action.data.sort((prev, next) => {
        if (prev.createdAt < next.createdAt) {
          return 1
        }
        if (prev.createdAt > next.createdAt) {
          return -1
        }
        return 0
      })

      const invites = action.data.reduce((acc, el) => {
        acc[el.ZUID] = el
        return acc
      }, {})

      return { ...state, ...invites }

    // When successfully accepting or declining
    // a team invite we drop the team invitation data
    case 'ACCEPT_TEAM_INVITE_SUCCESS':
    case 'DECLINE_TEAM_INVITE_SUCCESS':
      return Object.keys(state)
        .filter(ZUID => ZUID !== action.inviteZUID)
        .reduce((acc, ZUID) => {
          acc[ZUID] = state[ZUID]
          return acc
        }, {})

    default:
      return state
  }
}

export function fetchTeamInvites() {
  return dispatch => {
    dispatch({
      type: 'FETCH_TEAM_INVITES'
    })
    return request(`${CONFIG.API_ACCOUNTS}/teams/invites`)
      .then(res => {
        if (Array.isArray(res.data) && res.data.length) {
          dispatch({
            type: 'FETCH_TEAM_INVITES_SUCCESS',
            data: res.data
          })
        }
        return res.data
      })
      .catch(err => {
        dispatch({
          type: 'FETCH_TEAM_INVITES_ERROR',
          err
        })
        console.error(err)
        return err
      })
  }
}

export function acceptTeamInvite(inviteZUID, teamZUID) {
  return dispatch => {
    dispatch({
      type: 'ACCEPT_TEAM_INVITE'
    })
    return request(
      `${CONFIG.API_ACCOUNTS}/teams/invites/${inviteZUID}?action=accept`,
      {
        method: 'PUT'
      }
    )
      .then(res => {
        dispatch({
          type: 'ACCEPT_TEAM_INVITE_SUCCESS',
          inviteZUID
        })

        return dispatch(fetchTeam(teamZUID))
      })
      .catch(err => {
        dispatch({
          type: 'ACCEPT_TEAM_INVITE_ERROR',
          err
        })
        console.error(err)
        return err
      })
  }
}

export function declineTeamInvite(inviteZUID) {
  return dispatch => {
    dispatch({
      type: 'DECLINE_TEAM_INVITE'
    })
    return request(
      `${CONFIG.API_ACCOUNTS}/teams/invites/${inviteZUID}?action=decline`,
      {
        method: 'PUT'
      }
    )
      .then(res => {
        dispatch({
          type: 'DECLINE_TEAM_INVITE_SUCCESS',
          inviteZUID
        })
        return res.data
      })
      .catch(err => {
        dispatch({
          type: 'DECLINE_TEAM_INVITE_ERROR',
          err
        })
        console.error(err)
        return err
      })
  }
}

export function cancelTeamInvite(teamZUID, inviteZUID) {
  return dispatch => {
    dispatch({
      type: 'CANCEL_TEAM_INVITE'
    })
    return request(
      `${CONFIG.API_ACCOUNTS}/teams/invites/${inviteZUID}?action=cancel`,
      {
        method: 'PUT'
      }
    )
      .then(res => {
        dispatch({
          type: 'CANCEL_TEAM_INVITE_SUCCESS',
          teamZUID,
          memberZUID: inviteZUID
        })
        return res.data
      })
      .catch(err => {
        dispatch({
          type: 'CANCEL_TEAM_INVITE_ERROR',
          err
        })
        console.error(err)
        return err
      })
  }
}
