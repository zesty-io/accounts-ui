import { request } from '../../../../util/request'
import config from '../../../../shell/config'

export function createSite(state = {}, action) {
  switch (action.type) {
    case 'ADD_SITE_INFO':
      return {...state, ...action.payload}
    case 'CREATING_SITE':
      //do some sort of validation
      return state
    case 'CREATE_SITE_SUCCESS':
      return state
    case 'CREATE_SITE_ERROR':
      return state
    default:
      return state
  }
}

export const postNewSite = (noSureWhatThisWillTake) => {
  return dispatch => {
    dispatch({
      type: 'CREATING_SITE'
    })
    request(`http://${config.API_ACCOUNTS}/instances/create`, {
      type: 'POST',
      data: newSite.data.goes.here
    })
      .then(users => {
        dispatch({
          type: 'CREATE_SITE_SUCCESS',
          users: users.data
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'CREATE_SITE_ERROR',
          err
        })
      })
  }
}

export const addSiteInfo = (payload) => {
  return {
    type: 'ADD_SITE_INFO',
    meta: {
      debounce: {
        time: 250
      }
    },
    payload
  }
}