import config from '../config'
import { request } from '../../util/request'
import { notify } from '../store/notifications'

export function user(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_USER':
      // TODO show loading state?
      return state

    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        ...action.user
      }
    case 'FETCH_AUTH_SUCCESS':
      return {
        ...state,
        ZUID: action.ZUID
      }

    case 'FETCH_VERIFY_SUCCESS':
      return {
        ...state,
        ZUID: action.ZUID
      }

    case 'FETCH_USER_ERROR':
      // TODO handle failure
      return state

    case 'UPDATE_USER_PROFILE':
      return { ...state, ...action.payload }

    case 'SAVING_PROFILE':
      return state

    case 'SAVING_PROFILE_ERROR':
      return state

    case 'SAVING_PROFILE_SUCCESS':
      return state

    case 'SAVING_PASSWORD':
      return state

    case 'SAVING_PASSWORD_ERROR':
      return state

    case 'SAVING_PASSWORD_SUCCESS':
      return state

    case 'ADDING_EMAIL':
      return state

    case 'ADD_EMAIL_SUCCESS':
      return state

    case 'ADD_EMAIL_FAILURE':
      return state

    case 'USER_INVITED':
      return { ...state, ...action.invite }

    default:
      return state
  }
}

export function fetchUser(ZUID) {
  return dispatch => {
    dispatch({
      type: 'FETCHING_USER'
    })
    request(`${config.API_ACCOUNTS}/users/${ZUID}`)
      .then(user => {
        dispatch({
          type: 'FETCH_USER_SUCCESS',
          user: user.data
        })
      })
      .catch(err => {
        console.table(err)
        dispatch({
          type: 'FETCH_USER_ERROR',
          err
        })
      })
  }
}

export function update2fa(add, payload) {
  if (add) {
    // start process of adding 2fa
    // payload will have user info
    // have to get authy user ID from somehwere
  } else {
    // call db to remove 2fa and do whatever cleanup is also required
    // PUT update user     "authyEnabled": "false"
    return (dispatch, getState) => {
      dispatch({
        type: 'SAVING_PROFILE'
      })
      const userZUID = getState().user.ZUID
      return request(`${config.API_ACCOUNTS}/users/${userZUID}`, {
        method: 'PUT',
        json: true,
        body: {
          authyEnabled: false
        }
      })
        .then(data => {
          dispatch({ type: 'SAVING_PROFILE_SUCCESS' })
          return data
        })
        .catch(err => {
          console.table(err)
          dispatch({ type: 'SAVING_PROFILE_ERROR' })
          throw err
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

export function saveProfile() {
  return (dispatch, getState) => {
    let { settings } = getState()
    dispatch({
      type: 'SAVING_PROFILE'
    })
    const userZUID = getState().user.ZUID
    const user = getState().user
    return request(`${config.API_ACCOUNTS}/users/${userZUID}`, {
      method: 'PUT',
      json: true,
      body: {
        firstName: user.firstName,
        lastName: user.lastName
      }
    })
      .then(data => {
        dispatch({ type: 'SAVING_PROFILE_SUCCESS' })
        return data
      })
      .catch(err => {
        console.table(err)
        dispatch({ type: 'SAVING_PROFILE_ERROR' })
        throw err
      })
  }
}

export function updatePassword(oldPassword, password) {
  return (dispatch, getState) => {
    dispatch({
      type: 'SAVING_PASSWORD'
    })
    const user = getState().user
    return request(`${config.API_AUTH}/login`, {
      body: {
        email: user.email,
        password: oldPassword
      }
    })
      .then(data => {
        return request(
          `${config.API_ACCOUNTS}/users/${user.ZUID}?updatePassword=true`,
          {
            method: 'PUT',
            json: true,
            body: {
              password
            }
          }
        ).then(data => {
          dispatch({ type: 'SAVING_PASSWORD_SUCCESS' })
          return data
        })
      })
      .catch(err => {
        console.table(err)
        dispatch({ type: 'SAVING_PASSWORD_ERROR' })
        throw err
      })
  }
}

export function addEmail() {
  return (dispatch, getState) => {
    dispatch({
      type: 'ADDING_EMAIL'
    })
    const userZUID = getState().user.ZUID
    const unverifiedEmails =
      getState().user.unverifiedEmails !== null &&
      getState().user.unverifiedEmails !== ''
        ? getState()
            .user.unverifiedEmails.split(',')
            .concat(getState().user.newEmail)
            .join(',')
        : getState().user.newEmail
    return request(`${config.API_ACCOUNTS}/users/${userZUID}`, {
      method: 'PUT',
      json: true,
      body: {
        unverifiedEmails
      }
    })
      .then(data => {
        dispatch(
          notify({
            message: 'Email added',
            type: 'success'
          })
        )
        dispatch(fetchUser(userZUID))
        dispatch({ type: 'ADD_EMAIL_SUCCESS' })
        return data
      })
      .catch(error => {
        dispatch(
          notify({
            message: `Problem adding email: ${error}`,
            type: 'error'
          })
        )
        return dispatch({ type: 'ADD_EMAIL_FAILURE' })
      })
  }
}
