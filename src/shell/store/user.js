import { request } from '../../util/request'

export function user(
  state = {
    prefs: {
      favorite_sites: []
    }
  },
  action
) {
  switch (action.type) {
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        ...action.user
      }
    case 'FETCH_AUTH_SUCCESS':
    case 'FETCH_VERIFY_SUCCESS':
      return {
        ...state,
        ZUID: action.payload.meta.userZuid
      }

    case 'UPDATE_USER_PROFILE':
      return { ...state, ...action.payload }

    case 'USER_INVITED':
      return { ...state, ...action.invite }

    case 'FAVORITE_SITE':
      const favs = state.prefs.favorite_sites || []

      if (action.action === 'ADD') {
        favs.push(action.ZUID)
      } else if (action.action === 'REMOVE') {
        favs.splice(favs.indexOf(action.ZUID), 1)
      }

      return {
        ...state,
        prefs: {
          ...state.prefs,
          favorite_sites: favs
        }
      }

    case 'INSTANCE_LAYOUT':
      return {
        ...state,
        prefs: {
          ...state.prefs,
          instance_layout: action.layout
        }
      }
    case 'DEV_PREFS':
      return {
        ...state,
        prefs: {
          ...state.prefs,
          hasSelectedDev: 1,
          devOptions: action.payload
        }
      }
    case 'TEAM_PREFS':
      return {
        ...state,
        prefs: {
          ...state.prefs,
          teamOptions: action.payload
        }
      }

    case 'FETCH_USER_EMAILS_SUCCESS':
      return {
        ...state,
        emails: action.emails
      }

    case 'ENABLE_2FA_SUCCESS':
    case 'DISABLE_2FA_SUCCESS':
      return { ...state, ...action.data }

    default:
      return state
  }
}

export function fetchUser(ZUID) {
  return dispatch => {
    if (ZUID) {
      return request(`${CONFIG.API_ACCOUNTS}/users/${ZUID}`).then(user => {
        if (user.data) {
          // Parse user data response
          user.data.unverifiedEmails = user.data.unverifiedEmails
            ? user.data.unverifiedEmails.split(',')
            : []
          user.data.verifiedEmails = user.data.verifiedEmails
            ? user.data.verifiedEmails.split(',')
            : []
          user.data.prefs = JSON.parse(user.data.prefs || '{}')
          user.data.prefs.favorite_sites = user.data.prefs.favorite_sites || []

          dispatch({
            type: 'FETCH_USER_SUCCESS',
            user: user.data
          })

          return user.data
        } else {
          throw new Error('API returned missing user data')
        }
      })
    } else {
      // Missing user ZUID but consumer expects a promise
      return Promise.resolve()
    }
  }
}

export function update2fa(userZUID, enable, payload) {
  return dispatch => {
    if (enable) {
      return request(
        `${CONFIG.API_ACCOUNTS}/users/${userZUID}?action=enableAuthy`,
        {
          method: 'PUT',
          json: true,
          body: payload
        }
      ).then(() => {
        dispatch({
          type: 'ENABLE_2FA_SUCCESS',
          data: {
            ...payload,
            authyEnabled: true
          }
        })
      })
    } else {
      return request(`${CONFIG.API_ACCOUNTS}/users/${userZUID}`, {
        method: 'PUT',
        json: true,
        body: {
          authyEnabled: false
        }
      }).then(() => {
        dispatch({
          type: 'DISABLE_2FA_SUCCESS',
          data: {
            authyEnabled: false
          }
        })
      })
    }
  }
}

export function updateProfile(payload) {
  return {
    type: 'UPDATE_USER_PROFILE',
    payload
  }
}

export function saveProfile(payload) {
  return (dispatch, getState) => {
    dispatch({
      type: 'SAVING_PROFILE'
    })

    const user = getState().user
    return request(`${CONFIG.API_ACCOUNTS}/users/${user.ZUID}`, {
      method: 'PUT',
      json: true,
      body: {
        firstName: user.firstName,
        lastName: user.lastName,
        prefs: JSON.stringify(user.prefs),
        ...payload
      }
    }).then(res => {
      dispatch({ type: 'SAVING_PROFILE_SUCCESS' })
      return res.data
    })
  }
}

export function favoriteSite(ZUID, action) {
  return {
    type: 'FAVORITE_SITE',
    ZUID,
    action
  }
}

export function fetchUserEmails() {
  return dispatch => {
    return request(`${CONFIG.API_ACCOUNTS}/users/emails`).then(data => {
      dispatch({
        type: 'FETCH_USER_EMAILS_SUCCESS',
        emails: data.data
      })
    })
  }
}
