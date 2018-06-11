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

export const removeSiteUser = (userZUID, siteZUID) => {
  return (dispatch, getState) => {
    let users = getState().sitesUsers[siteZUID]
    delete users[userZUID]
    return dispatch({
      type: 'DELETE_USER',
      users,
      siteZUID
    })
  }
}

export function LEGACY_transferOwnership(instanceHash, userID) {
  return request(
    `${
      CONFIG.LEGACY_ACCOUNTS
    }/+/actions/manage-permissions/site/transfer-ownership`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `website_hash_id=${instanceHash}&user_id=${userID}`
    }
  )
}

export function LEGACY_updateUserRole(instanceHash, userID, roleID) {
  return request(
    `${
      CONFIG.LEGACY_ACCOUNTS
    }/+/actions/manage-permissions/site/set-role-for-user`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `website_hash_id=${instanceHash}&user_id=${userID}&new_role_id=${roleID}`
    }
  )
}

export const updateSiteUserRole = (siteZUID, userZUID, roleZUID) => {
  return (dispatch, getState) => {
    /*
    **
    ** for role updates until the API can handle ZUID roles
    ** it looks like what we need to do is a `POST` to
    ** `https://stage-accounts.zesty.io/+/actions/manage-permissions/site/set-role-for-user
    ** ` (base URL varies per environment), and send it a body like:
    **
    ** ```website_hash_id=090z7hxt&user_id=21474534&new_role_id=5```
    **
    ** and set the auth cookie on the request.
    */

    const state = getState()

    // NOTE: this will break for custom roles since the names
    // won't match our system roles
    const newRoleName = state.sitesRoles[siteZUID][roleZUID].name
    const instanceHash = state.sites[siteZUID].randomHashID
    const userID = state.sitesUsers[siteZUID][userZUID].ID
    const role = state.systemRoles.find(role => role.name === newRoleName)

    if (!role) {
      throw new Error(`Invalid role: ${newRoleName}`)
      return
    }

    let req

    if (newRoleName === 'Owner') {
      req = LEGACY_transferOwnership(instanceHash, userID).then(() => {
        // TODO do new accounts transfer as well
      })
    } else {
      req = LEGACY_updateUserRole(instanceHash, userID, role.accessLevel).then(
        () => {
          // TODO do new accounts role update as well
        }
      )
    }

    return req
      .then(data => {
        console.log(data)
        dispatch({
          type: 'UPDATE_USER_ROLE',
          userZUID,
          siteZUID,
          role: newRole
        })
        return data
      })
      .catch(err => {
        console.error(err)
        return err
      })
  }
}
