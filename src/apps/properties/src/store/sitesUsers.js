import { request } from '../../../../util/request'

const ROLES = {
  Owner: 0,
  Admin: 1,
  Developer: 2,
  SEO: 3,
  Publisher: 4,
  Contributor: 5
}

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

    case 'DELETE_USER':
      return { ...state, [action.siteZUID]: action.users }

    case 'FETCH_USERS_PENDING_SUCCESS':
      return {
        ...state,
        [action.siteZUID]: { ...state[action.siteZUID], ...action.users }
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

export const updateSiteUserRole = (
  userZUID,
  oldRoleZUID,
  newRoleZUID,
  siteZUID
) => {
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

    const newRole = state.sitesRoles[siteZUID][newRoleZUID].name
    const instanceID = state.sites[siteZUID].randomHashID
    const userID = state.sitesUsers[siteZUID][userZUID].ID

    const newRoleID = ROLES[newRole]

    if (!newRoleID) {
      throw new Error(`Invalid role: ${newRole}`)
      return
    }

    if (newRole === 'Owner') {
      return request(
        `${
          CONFIG.LEGACY_ACCOUNTS
        }/+/actions/manage-permissions/site/transfer-ownership`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: `website_hash_id=${instanceID}&user_id=${userID}`
        }
      )
    }

    return request(
      `${
        CONFIG.LEGACY_ACCOUNTS
      }/+/actions/manage-permissions/site/set-role-for-user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `website_hash_id=${instanceID}&user_id=${userID}&new_role_id=${newRoleID}`
      }
    )
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
        console.log(err)
        return err
      })
  }
}
