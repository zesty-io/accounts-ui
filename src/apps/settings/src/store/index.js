export function settings (state = {}, action) {
  switch (action.type) {
    // case 'FETCHING_SITES':
    //   // TODO show loading state?
    //   return state

    case 'FETCH_SETTINGS_SUCCESS':
      const settings = action.settings
      return settings

    case 'FETCH_SETTINGS_ERROR':
      // TODO show global growl of error
      // leave state as is
      return state

    case 'MODIFY_FAILURE':
      return state
      
    case 'MODIFY_PROFILE_SUCCESS':
      const profile = {...action.settings}
      return {...state, profile}

    case 'MODIFY_EMAIL_SUCCESS':
      const emails = [...state.settings.emails].push(action.payload)
      return {...state, emails}

    default:
      return state
  }
}

export function modifyProfile(payload) {
  return (dispatch) => {
    dispatch({
      type: 'MODIFYING_PROFILE'
    })
    setTimeout(() => {
      dispatch({
        type: "MODIFY_PROFILE_SUCCESS",
        settings: payload
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

export function getSettings (id) {
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_SETINGS'
    })

    setTimeout(() => { // fake 500 ms delay
      dispatch({
        type: 'FETCH_SETTINGS_SUCCESS',
        settings: {
          profile: {
            firstName: 'Grant',
            lastName: 'Glidewell',
            otherReleventInfo: ''
          },
          blueprints: [{
            name: 'blueprint',
            url: 'www.blueprint.com/blueprintname/867598',
            date: '06-23-17'
          },{
            name: 'another one',
            url: 'https://www.slowlyprogressing.com',
            date: '03-14-17'
          }],
          emails: [
            {email:'email@email.com'},
            {email:'name@domain.com', options: 'an option'},
            {email:'anotheremail@moredomains.com'}
          ],
          twofa: true
        }
      })}, 500)
  }
}

// add change password, add email, modify user info, toggle 2fa

