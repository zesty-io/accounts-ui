import { request } from '../../../../util/request'
import config from '../../../../shell/config'

export function profile(state = {submitted: false}, action) {
  switch (action.type) {
    // case 'FETCHING_SITES':
    //   // TODO show loading state?
    //   return state

    case 'FETCH_SETTINGS_SUCCESS':
      return {...state, ...action.payload}

    case 'FETCH_SETTINGS_ERROR':
      // TODO show global growl of error
      // leave state as is
      return state

    case 'MODIFYING_PROFILE':
    return {...state, submitted: !state.submitted}
    
    case 'MODIFY_FAILURE':
      //TODO: deactivate loading state
      //TODO: show global growl of error
      return state

    case 'MODIFY_PROFILE_SUCCESS':
      //TODO: deactivate loading state
      return {...state, submitted: !state.submitted}

    case 'FETCHING_ACCOUNT_BLUEPRINTS':
      return state

    case 'FETCHING_ACCOUNT_BLUEPRINTS_SUCCESS':
      return {...state, blueprints: action.blueprints}

    case 'FETCHING_ACCOUNT_BLUEPRINTS_ERROR':
      return state

    case 'CREATING_BLUEPRINT':
      return {...state, submitted: !state.submitted}

    case 'CREATE_BLUEPRINT_SUCCESS':
      let blueprints = {...state.blueprints, [action.blueprint.ID]:action.blueprint}
      return {...state, blueprints, submitted: !state.submitted}

    case 'CREATE_BLUEPRINT_ERROR':
      return state

    case 'ADD_EMAIL_SUCCESS':
      const emails = state.emails.concat([{email: state.newEmail, options: state.newEmailOptions || ''}])
      return { ...state, newEmail: '', emails }

    case 'UPDATE_SETTINGS':
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export function fetchAccountBlueprints() {
  return dispatch => {
    dispatch({
      type: 'FETCHING_ACCOUNT_BLUEPRINTS'
    })
    request(`${config.API_ACCOUNTS}/blueprints`)
      .then(json =>
        dispatch({
          type: 'FETCHING_ACCOUNT_BLUEPRINTS_SUCCESS',
          blueprints: json.data
        })
      )
      .catch(err => {
        console.table(err)
        dispatch({
          type: 'FETCHING_ACCOUNT_BLUEPRINTS_ERROR',
          err
        })
      })
  }
}

export function updateSetting(payload) {
  return {
    type: 'UPDATE_SETTINGS',
    meta: {
      debounce: {
        time: 250
      }
    },
    payload
  }
}

export function updateSettingRaw(payload) {
  return {
    type: 'UPDATE_SETTINGS',
    payload
  }
}

export function postNewBlueprint(Name) {
  return dispatch => {
    dispatch({
      type: "CREATING_BLUEPRINT"
    });
    return request(`${config.API_ACCOUNTS}/blueprints`, {
      method: "POST",
      json: true,
      body: { Name }
    })
  };
}

export function saveProfile() {
  return (dispatch, getState) => {
    let { settings } = getState()
    dispatch({
      type: 'MODIFYING_PROFILE'
    })
    return new Promise((resolve, reject) => { // in place of network call which returns a promise
      resolve(setTimeout(() => {
        dispatch({
          type: "MODIFY_PROFILE_SUCCESS",
        })
      }, 500))
      reject(console.err)
    })
  }
}

export function addEmail(payload) {
  return (dispatch) => {
    dispatch({
      type: 'ADDING_EMAIL'
    })
    setTimeout(() => {
      dispatch({
        type: "ADD_EMAIL_SUCCESS",
        payload
      })
    }, 500)
  }
}

export function getSettings(userZUID) {
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_SETINGS'
    })
    request(`${config.API_ACCOUNTS}/users/${userZUID}`)
      .then(json =>{
        return dispatch({
          type: 'FETCHING_SETTINGS_SUCCESS',
          payload: json.data
        })}
      )
      .catch(err => {
        console.table(err)
        dispatch({
          type: 'FETCHING_SETTINGS_ERROR',
          err
        })
      })
  }
}

// add change password, modify user info, toggle 2fa
