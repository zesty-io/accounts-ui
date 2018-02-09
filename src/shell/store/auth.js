import {request} from '../../util/request'

export function authenticated (state = false, action) {
  switch (action.type) {
    case 'FETCH_AUTH_SUCCESS':
      return action.auth
    case 'FETCH_AUTH_ERROR':
      // TODO clear cookie
      return false
    case 'LOGOUT':
      // TODO clear cookie
      return false
    default:
      return state
  }
}

export function verifyAuth () {
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_AUTH'
    })
    request('http://svc.zesty.localdev:3011/verify')
    .then(json => {
      console.log(json)
      dispatch({
        type: 'FETCH_AUTH_SUCCESS',
        auth: (json.code === 200) ? true : false
      })
    })
    .catch(err => {
      console.error(err)
      dispatch({
        type: 'FETCH_AUTH_ERROR',
        auth: false,
        err
      })
    })
  }
}
