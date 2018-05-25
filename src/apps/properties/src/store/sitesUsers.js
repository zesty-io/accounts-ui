import { request } from '../../../../util/request'

export function sitesUsers(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_USERS':
      return state

    case 'FETCH_USERS_SUCCESS':
      return {
        ...state, // Previous sites
        [action.siteZUID]: {
          ...state[action.siteZUID], // Previous site users
          ...action.users // new site users
        }
      }

    case 'FETCH_USERS_ERROR':
      return state

    case 'FETCHING_USERS_PENDING':
      return state

    case 'DELETE_USER':
      return { ...state, [action.siteZUID]: action.users }

    case 'FETCH_USERS_PENDING_SUCCESS':
      return {
        ...state,
        [action.siteZUID]: { ...state[action.siteZUID], ...action.users }
      }
    case 'FETCH_USERS_PENDING_ERROR':
      return state

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
    return request(
      `${CONFIG.API_ACCOUNTS}/instances/${siteZUID}/users?getRoles=true`
    )
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
    **
    **  const ROLE_ADMIN = 1; // Admin
    **  const ROLE_DEVELOPER = 2; // Developer
    **  const ROLE_SEO = 3; // SEO
    **  const ROLE_PUBLISHER = 4; // content editor/publisher
    **  const ROLE_CONTRIBUTOR = 5; // contributor
    **

    */

    // this will not work for custom roles

    // make a call to get the form so i can attrach the XCRF header to the request
    // http://accounts.zesty.localdev:3002/+/leaves/account-details-tabs/access?account_id=f49f89b3&account_id=f49f89b3&tab=access

    const newRole = getState().sitesRoles[siteZUID][newRoleZUID].name
    const instanceID = getState().sites[siteZUID].randomHashID
    const userID = getState().sitesUsers[siteZUID][userZUID].ID

    const newRoleID = role => {
      switch (role) {
        case 'Owner':
          return 0
        case 'Admin':
          return 1
        case 'Contributor':
          return 5
        case 'Publisher':
          return 4
        case 'Developer':
          return 2
        case 'SEO':
          return 3
        default:
          return 5
      }
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
        body: `website_hash_id=${instanceID}&user_id=${userID}&new_role_id=${newRoleID(
          newRole
        )}`
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

        // temporarily use the old API so that roles apply across all apps
        //
        // return request(
        //   `${CONFIG.API_ACCOUNTS}/users/${userZUID}/roles/${oldRoleZUID}`,
        //   {
        //     method: 'PUT',
        //     json: true,
        //     body: {
        //       roleZUID: newRoleZUID
        //     }
        //   }
        // )
  }
}
