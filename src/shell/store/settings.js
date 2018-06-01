export function settings(state = {}, action) {
  switch (action.type) {
    case 'SETTING_FILTER':
      return {
        ...state,
        filter: action.filter
      }
      break
    default:
      return state
  }
}
