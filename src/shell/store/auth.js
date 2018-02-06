export function authenticated (state = false, action) {
  if (action.type === 'AUTHENTICATED') {
    return action.auth
  } else {
    return state
  }
}
