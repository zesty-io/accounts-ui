import { request } from "../../../../util/request";
import config from "../../../../shell/config";

const defaultState = { submitted: false };

export function sitesPermissions(state = defaultState, action) {
  switch (action.type) {
    case "UPDATE_PERMISSIONS":
      return { ...state, ...action.payload };
    case "ADDING_ROLE":
      return { ...state, submitted: !state.submitted };
    case "ADDING_ROLE_SUCCESS":
      return { ...state, submitted: !state.submitted };
    case "ADDING_ROLE_FAILURE":
      return { ...state, submitted: !state.submitted };
    default:
      return state;
  }
}

export const createRole = (siteZUID, body) => {
  return dispatch => {
    dispatch({ type: "ADDING_ROLE" });
    return request(`${config.API_ACCOUNTS}/instances/${siteZUID}/roles`, {
      method: "POST",
      json: true,
      body: {
        name: body.name,
        systemRoleZUID: body.systemRoleZUID,
        expiry: body.expiry || null
      }
    });
  };
};
