import {
  FETCHING_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR
} from '../actions/user'

export function user(state = {}, action) {
  switch(action.type) {
    case FETCHING_USER:
      // TODO show loading state?

    case FETCH_USER_SUCCESS:
      return {...action.user}

    case FETCH_USER_ERROR:
      // TODO handle failure
      //
    default:
      return state
  }
}
