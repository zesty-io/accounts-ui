import { request } from '../../../../util/request'

export function sitesUsers(state = {}, action) {
  switch (action.type) {
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state, // Previous sites
        [action.siteZUID]: {
          ...state[action.siteZUID], // Previous site users
          ...action.users // new site users
        }
      }

    case 'FETCH_USERS_PENDING_SUCCESS':
      return {
        ...state,
        [action.siteZUID]: { ...state[action.siteZUID], ...action.users }
      }

    case 'SEND_INVITE_SUCCESS':
      return {
        ...state, // Previous sites
        [action.user.entityZUID]: {
          ...state[action.user.entityZUID], // Previous site users
          [action.user.ZUID]: {
            email: action.user.inviteeEmail,
            inviteZUID: action.user.ZUID,
            name: '',
            pending: true
          } // new pending site user
        }
      }

    case 'REMOVE_USER_SUCCESS':
    case 'CANCEL_INVITE_SUCCESS':
      const siteUsers = Object.keys(state[action.siteZUID])
        .filter(userZUID => userZUID !== action.userZUID)
        .reduce((acc, userZUID) => {
          acc[userZUID] = state[action.siteZUID][userZUID]
          return acc
        }, {})

      return {
        ...state,
        [action.siteZUID]: { ...siteUsers }
      }

    case 'UPDATE_USER_ROLE':
      return {
        ...state,
        [action.siteZUID]: {
          ...state[action.siteZUID],
          [action.userZUID]: {
            ...state[action.siteZUID][action.userZUID],
            role: action.role
          }
        }
      }

    case 'DELETE_USER':
      return { ...state, [action.siteZUID]: action.users }

    default:
      return state
  }
}

export const fetchSiteUsers = siteZUID => {
  return dispatch => {
    dispatch({
      type: 'FETCHING_USERS'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZUID}/users/roles`)
      .then(users => {
        dispatch({
          type: 'FETCH_USERS_SUCCESS',
          siteZUID,
          users: users.data.reduce((acc, user) => {
            acc[user.ZUID] = user
            return acc
          }, {})
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'FETCH_USERS_ERROR',
          err
        })
      })
  }
}

export const fetchSiteUsersPending = siteZUID => {
  return dispatch => {
    dispatch({
      type: 'FETCHING_USERS_PENDING'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZUID}/users/pending`)
      .then(users => {
        dispatch({
          type: 'FETCH_USERS_PENDING_SUCCESS',
          siteZUID,
          users: users.data.reduce((acc, user) => {
            acc[user.inviteZUID] = user
            acc[user.inviteZUID].pending = true
            return acc
          }, {})
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'FETCH_USERS_PENDING_ERROR',
          err
        })
      })
  }
}

export const removeUser = (siteZUID, userZUID, roleZUID) => {
  return dispatch => {
    dispatch({ type: 'REMOVE_USER' })
    return request(
      `${CONFIG.API_ACCOUNTS}/users/${userZUID}/roles/${roleZUID}`,
      { method: 'DELETE' }
    )
      .then(res => {
        dispatch({
          type: 'REMOVE_USER_SUCCESS',
          siteZUID,
          userZUID
        })
        return res.data
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'REMOVE_USER_ERROR',
          err
        })
      })
  }
}

export function updateRole(siteZUID, userZUID, newRoleZUID) {
  return (dispatch, getState) => {
    const state = getState()
    const user = state.sitesUsers[siteZUID][userZUID]

    return request(
      `${CONFIG.API_ACCOUNTS}/users/${userZUID}/roles/${user.role.ZUID}`,
      {
        method: 'PUT',
        json: true,
        body: {
          roleZUID: newRoleZUID
        }
      }
    )
      .then(res => {
        dispatch({
          type: 'UPDATE_USER_ROLE',
          siteZUID,
          userZUID,
          role: state.sitesRoles[siteZUID][res.data.roleZUID]
        })
        return res.data
      })
      .catch(err => {
        console.error(err)
      })
  }
}
