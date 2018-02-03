export const FETCHING_USER = 'FETCHING_USER'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'

export function getUser (zuid) {
  console.log('action:getUser', zuid)
  return (dispatch) => {
    dispatch({
      type: FETCHING_USER
    })
    fetch(`http://localhost:6010/v1/user/${zuid}`)
      .then(res => res.json())
      .then(user => {
        console.log('user', user)
        dispatch({
          type: FETCH_USER_SUCCESS,
          zuid,
          user
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: FETCH_USER_ERROR,
          zuid,
          err
        })
      })
  }
}

export function user (state = {}, action) {
  switch (action.type) {
    case FETCHING_USER:
      // TODO show loading state?
      return state

    case FETCH_USER_SUCCESS:
      return {...action.user}

    case FETCH_USER_ERROR:
      // TODO handle failure
      return state

    default:
      return state
  }
}
