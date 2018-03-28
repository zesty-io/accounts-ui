import { request } from "../../../../util/request";
import config from "../../../../shell/config";

export function invite(
  state = {
    inviteRole: "editor",
    inviteeEmail: "",
    submitted: false },
  action
) {
  switch (action.type) {
    case "INVITE_DATA":
      return { ...state, ...action.payload };
    case "SENDING_INVITE":
      return { ...state, submitted: !state.submitted };
    case "SEND_INVITE_ERROR":
      return { ...state, err };
    case "SEND_INVITE_SUCCESS":
      return { ...state, inviteeEmail: "", submitted: !state.submitted };
    default:
      return state;
  }
}

export function inviteData(payload) {
  return {
    type: "INVITE_DATA",
    payload
  };
}

export function sendInvite(payload) {
  return dispatch => {
    dispatch({
      type: "SENDING_INVITE"
    });
    return request(`${config.API_ACCOUNTS}/invites`, {
      method: "POST",
      json: true,
      body: {
        inviteeEmail: payload.InviteeEmail,
        InstanceZUID: payload.InstanceZUID,
        RoleZUID: payload.RoleZUID
      }
    })
  };
}
