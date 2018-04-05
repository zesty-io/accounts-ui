import { request } from "../../../../util/request";
import config from "../../../../shell/config";

const defaultState = {};

export function sitesPermissions(state = defaultState, action) {
  switch (action.type) {
    case "UPDATE_PERMISSIONS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const createRole = (siteZUID, body) => {
  return request(`${config.API_ACCOUNTS}/instances/${siteZuid}/roles`, {
    method: "POST",
    json: true,
    body
  });
};
