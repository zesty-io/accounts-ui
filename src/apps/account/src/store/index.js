export function profile(state = {}, action) {
  switch (action.type) {
    // case 'FETCHING_SITES':
    //   // TODO show loading state?
    //   return state

    case 'FETCH_SETTINGS_SUCCESS':
      const profile = action.profile
      return profile

    case 'FETCH_SETTINGS_ERROR':
      // TODO show global growl of error
      // leave state as is
      return state

    case 'MODIFY_FAILURE':
      //TODO: deactivate loading state
      //TODO: show global growl of error
      return state

    case 'MODIFY_PROFILE_SUCCESS':
      //TODO: deactivate loading state
      return state

    case 'MODIFY_EMAIL_SUCCESS':
      const emails = state.emails.concat([{email: action.payload, options: ''}])
      return { ...state, emails }

    case 'UPDATE_SETTINGS':
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export function updateSetting(payload) {
  return {
    type: 'UPDATE_SETTINGS',
    payload
  }
}

export function saveProfile(profile) {
  return (dispatch, getState) => {
    let { settings } = getState()

    console.log(settings)
    dispatch({
      type: 'MODIFYING_PROFILE'
    })
    setTimeout(() => {
      dispatch({
        type: "MODIFY_PROFILE_SUCCESS",
      })
    }, 500)
  }
}

export function addEmail(payload) {
  return (dispatch) => {
    dispatch({
      type: 'MODIFYING_EMAIL'
    })
    setTimeout(() => {
      dispatch({
        type: "MODIFY_EMAIL_SUCCESS",
        payload
      })
    }, 500)
  }
}

export function getSettings(id) {
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_SETINGS'
    })

    setTimeout(() => { // fake 500 ms delay
      dispatch({
        type: 'FETCH_SETTINGS_SUCCESS',
        profile: {
          firstName: 'Grant',
          lastName: 'Glidewell',
          emails: [
            { email: 'email@email.com' },
            { email: 'name@domain.com', options: 'an option' },
            { email: 'anotheremail@moredomains.com' }
          ],
          blueprints: [{
            name: 'blueprint',
            url: 'www.blueprint.com/blueprintname/867598',
            date: '06-23-17'
          }, {
            name: 'another one',
            url: 'https://www.slowlyprogressing.com',
            date: '03-14-17'
          }],
          twofa: true
        }
      })
    }, 500)
  }
}

// add change password, add email, modify user info, toggle 2fa

