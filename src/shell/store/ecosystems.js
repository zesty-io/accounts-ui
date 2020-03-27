import { request } from '../../util/request'

export function ecosystems(state = [], action) {
  switch (action.type) {
    case 'FETCH_ECOSYSTEM_SUCCESS':
      return state.map(eco => {
        if (eco.ZUID === action.payload.ZUID) {
          return action.payload
        } else {
          return eco
        }
      })
    case 'FETCH_ECOSYSTEMS_SUCCESS':
      return action.payload
    default:
      return state
  }
}

export function fetchEcosystem(ZUID) {
  return dispatch => {
    return request(`${CONFIG.API_ACCOUNTS}/ecosystems/${ZUID}`)
      .then(res => {
        dispatch({
          type: 'FETCH_ECOSYSTEM_SUCCESS',
          payload: res.data
        })
        return res
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function fetchEcosystems() {
  return dispatch => {
    return request(`${CONFIG.API_ACCOUNTS}/ecosystems`)
      .then(res => {
        dispatch({
          type: 'FETCH_ECOSYSTEMS_SUCCESS',
          payload: res.data
        })
        return res
      })
      .catch(err => {
        console.error(err)
      })
  }
}
