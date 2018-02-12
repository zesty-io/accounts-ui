export function user (state = {}, action) {
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
      console.log('FETCH_AUTH_SUCCESS', action)
      return {
        ...state,
        zuid: action.zuid
      }

    case 'FETCH_USER_ERROR':
      // TODO handle failure
      return state

    default:
      return state
  }
}

export function getUser (zuid) {
  // console.log('action:getUser', zuid)
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_USER'
    })
    fetch(`http://localhost:6010/v1/user/${zuid}`)
      .then(res => res.json())
      .then(user => {
        console.log('user', user)
        dispatch({
          type: 'FETCH_USER_SUCCESS',
          user
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'FETCH_USER_ERROR',
          err
        })
      })
  }
}
