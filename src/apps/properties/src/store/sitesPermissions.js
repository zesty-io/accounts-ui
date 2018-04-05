const defaultState = {};

export function sitesPermissions(state = defaultState, action) {
  switch (action.type) {
    case "UPDATE_PERMISSIONS":
      return {...state, ...action.payload};
    default:
      return state;
  }
}
