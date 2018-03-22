import { request } from "../../../../util/request";
import config from "../../../../shell/config";

export function invite(state = { inviteRole: "editor" }, action) {
  switch (action.type) {
    case "INVITE_DATA":
      return { ...state, ...action.payload };
    case "SENDING_INVITE":
      // this should send the email, and role and site zuid to an endpoint.
      console.log(state);
      return state
    case "SEND_INVITE_ERROR":
      return {...state, err}
    case "SEND_INVITE_SUCCESS":
      return { ...state, inviteEmail: "" };
    default:
      return state;
  }
}

export function inviteData(payload) {
  return {
    type: "INVITE_DATA",
    meta: {
      debounce: {
        time: 200
      }
    },
    payload
  };
}

export function sendInvite(payload) {
  return dispatch => {
    dispatch({
      type: "SENDING_INVITE"
    })
    request(`${config.API_ACCOUNTS}/invites`, {
      method: "POST",
      json: true,
      body: {
        inviteeEmail: payload.InviteeEmail,
        InstanceZUID: payload.InstanceZUID,
        RoleZUID: payload.RoleZUID
      }
    }).then(data => [
      dispatch({
        type: "SEND_INVITE_SUCCESS",
        data
      })
    ])
    .catch(err => {
      console.table(err);
      dispatch({
        type: "SEND_INVITE_ERROR",
        err
      })
    })
  };
}
