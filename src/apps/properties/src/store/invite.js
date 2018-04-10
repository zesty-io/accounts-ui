import { request } from "../../../../util/request";
import config from "../../../../shell/config";
import { notify } from "../../../../shell/store/notifications";

export function invite(
  state = {
    inviteRole: "editor",
    inviteeEmail: "",
    submitted: false
  },
  action
) {
  switch (action.type) {
    case "INVITE_DATA":
      return { ...state, ...action.siteZUID };
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

export function inviteData(siteZUID) {
  return {
    type: "INVITE_DATA",
    siteZUID
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
        inviteeEmail: payload.inviteeEmail,
        instanceZUID: payload.instanceZUID,
        roleZUID: payload.roleZUID
      }
    }).then(data => {
      dispatch(
        notify({
          HTML: `<p>
    <i class="fa fa-check-square-o" aria-hidden="true" />&nbsp;Invite sent to <i>${
      data.data.inviteeEmail
    }</i>
  </p>`,
          type: "success"
        })
      );
      dispatch({
        type: "SEND_INVITE_SUCCESS",
        data
      });
      return data;
    })
    .catch(err => {
      console.table(err);
      dispatch(
        notify({
          HTML: `<p>
      <i class="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;An error occured sending the invite: ${err}
    </p>`,
          type: "error"
        })
      );
      dispatch({
        type: "SEND_INVITE_ERROR",
        err
      });
    });
  };
}
