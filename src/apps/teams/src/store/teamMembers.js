import { request } from '../../../../util/request'

export function teamMembers(state = {}, action) {
  switch (action.type) {
    // Team members and team member invites are
    // treated the same
    case 'INVITE_TEAM_MEMBER_SUCCESS':
    case 'FETCH_TEAM_MEMBERS_SUCCESS':
    case 'FETCH_TEAM_MEMBER_INVITES_SUCCESS':
      const members = action.data.reduce((acc, member) => {
        acc[member.ZUID] = member
        return acc
      }, {})
      return { ...state, ...members }

    default:
      return state
  }
}

export function fetchTeamMembers(teamZUID) {
  return dispatch => {
    dispatch({
      type: 'FETCH_TEAM_MEMBERS'
    })
    return request(`${CONFIG.API_ACCOUNTS}/teams/${teamZUID}/users`).then(
      res => {
        dispatch({
          type: 'FETCH_TEAM_MEMBERS_SUCCESS',
          data: res.data,
          teamZUID
        })
        return res.data
      }
    )
  }
}

export function fetchTeamMemberInvites(teamZUID) {
  return dispatch => {
    dispatch({
      type: 'FETCH_TEAM_MEMBER_INVITES'
    })
    return request(
      `${CONFIG.API_ACCOUNTS}/teams/${teamZUID}/users/pending`
    ).then(res => {
      dispatch({
        type: 'FETCH_TEAM_MEMBER_INVITES_SUCCESS',
        data: res.data,
        teamZUID
      })
      return res.data
    })
  }
}

export function inviteTeamMember(teamZUID, inviteeEmail, admin) {
  return dispatch => {
    dispatch({ type: 'INVITE_TEAM_MEMBER' })
    return request(`${CONFIG.API_ACCOUNTS}/teams/invites`, {
      method: 'POST',
      json: true,
      body: {
        teamZUID,
        inviteeEmail,
        admin
      }
    }).then(res => {
      dispatch({
        type: 'INVITE_TEAM_MEMBER_SUCCESS',
        data: [res.data],
        inviteeEmail,
        teamZUID
      })
      return res.data
    })
  }
}

export function removeTeamMember(teamZUID, userZUID) {
  return dispatch => {
    dispatch({
      type: 'REMOVE_TEAM_MEMBER'
    })
    return request(
      `${CONFIG.API_ACCOUNTS}/teams/${teamZUID}/users/${userZUID}`,
      {
        method: 'DELETE'
      }
    ).then(res => {
      dispatch({
        type: 'REMOVE_TEAM_MEMBER_SUCCESS',
        teamZUID,
        memberZUID: userZUID
      })
      return res.data
    })
  }
}
