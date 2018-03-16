import { request } from '../../../../util/request'
import config from '../../../../shell/config'

export function blueprints(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_BLUEPRINTS':
      return state
    case 'FETCHING_BLUEPRINTS_ERROR':
      // TODO show error message
      return state
    case 'FETCHING_BLUEPRINTS_SUCCESS':
      return { ...state, ...action.blueprints }
    default:
      return state
  }
}

export function fetchBlueprints(userZuid) {
  return dispatch => {
    dispatch({
      type: 'FETCHING_BLUEPRINTS'
    })
    request(`http://${config.API_ACCOUNTS}:6010/v1/blueprints`)
      .then(json => {
        let blueprints = json.reduce((acc, print) => {
          acc[print.ID] = print
          return acc
        }, {})
        dispatch({
          type: 'FETCHING_BLUEPRINTS_SUCCESS',
          blueprints
        })
      })
      .catch(err => {
        console.table(err)
        dispatch({
          type: 'FETCHING_BLUEPRINTS_ERROR',
          err
        })
      })
  }
}
