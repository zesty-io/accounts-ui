export function settings(state = {}, action) {
  switch (action.type) {
    case 'SETTING_ECO':
      return {
        ...state,
        eco: action.eco
      }
    case 'SETTING_FILTER':
      return {
        ...state,
        filter: action.filter
      }
    default:
      return state
  }
}
