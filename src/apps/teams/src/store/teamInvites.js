import { request } from '../../../../util/request'

export function teamInvites(state = {}, action) {
  switch (action.type) {
    case 'FETCH_TEAM_INVITES_SUCCESS':
      return { ...state, ...action.data }
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
            data: res.data.reduce((acc, el) => {
              acc[el.ZUID] = el
              return acc
            }, {})
          })
        }
        return res.data
      })
      .catch(err => {
        dispatch({
          type: 'FETCH_TEAM_INVITES_ERROR',
          err
        })
        console.table(err)
        return err
      })
  }
}

export function acceptTeamInvite(inviteZUID) {
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
          type: 'ACCEPT_TEAM_INVITE_SUCCESS'
        })
        return res.data
      })
      .catch(err => {
        dispatch({
          type: 'ACCEPT_TEAM_INVITE_ERROR',
          err
        })
        console.table(err)
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
          type: 'DECLINE_TEAM_INVITE_SUCCESS'
        })
        return res.data
      })
      .catch(err => {
        dispatch({
          type: 'DECLINE_TEAM_INVITE_ERROR',
          err
        })
        console.table(err)
        return err
      })
  }
}
