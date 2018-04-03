import { request } from "../../../../util/request";
import config from "../../../../shell/config";

export function userProfile(
  state = { submittedProfile: false, submittedEmail: false, newEmail: "" },
  action
) {
  switch (action.type) {
    case "FETCHING_SETTINGS":
      return state;

    case "FETCH_SETTINGS_SUCCESS":
      return { ...state, ...action.payload };

    case "FETCH_SETTINGS_ERROR":
      // TODO show global growl of error
      // leave state as is
      return state;

    case "MODIFYING_PROFILE":
      return { ...state, submittedProfile: !state.submittedProfile };

    case "MODIFY_FAILURE":
      //TODO: deactivate loading state
      //TODO: show global growl of error
      return state;

    case "MODIFY_PROFILE_SUCCESS":
      //TODO: deactivate loading state
      return { ...state, submittedProfile: !state.submittedProfile };

    case "ADDING_EMAIL":
      return { ...state, submittedEmail: !state.submittedEmail };
    case "ADD_EMAIL_SUCCESS":
    return { ...state, submittedEmail: !state.submittedEmail };

    case "ADD_EMAIL_FAILURE":
    return { ...state, submittedEmail: !state.submittedEmail };


    case "UPDATE_SETTINGS":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

export function updateSetting(payload) {
  return {
    type: "UPDATE_SETTINGS",
    meta: {
      debounce: {
        time: 250
      }
    },
    payload
  };
}

export function updateSettingRaw(payload) {
  return {
    type: "UPDATE_SETTINGS",
    payload
  };
}

export function saveProfile() {
  return (dispatch, getState) => {
    let { settings } = getState();
    dispatch({
      type: "MODIFYING_PROFILE"
    });
    const userZUID = getState().user.zuid;
    const profile = getState().userProfile;
    return request(`${config.API_ACCOUNTS}/users/${userZUID}`, {
      method: "PUT",
      json: true,
      body: {
        firstName: profile.firstName,
        lastName: profile.lastName
      }
    });
  };
}

export function addEmail() {
  return (dispatch, getState) => {
    dispatch({
      type: "ADDING_EMAIL"
    });
    const userZUID = getState().user.zuid;
    const unverifiedEmails = getState()
      .userProfile.unverifiedEmails.split(",")
      .concat(getState().userProfile.newEmail)
      .join(",");
    return request(`${config.API_ACCOUNTS}/users/${userZUID}`, {
      method: "PUT",
      json: true,
      body: {
        unverifiedEmails
      }
    });
  };
}

export function getSettings(userZUID) {
  return dispatch => {
    dispatch({
      type: "FETCHING_SETINGS"
    });
    request(`${config.API_ACCOUNTS}/users/${userZUID}`)
      .then(json => {
        return dispatch({
          type: "FETCH_SETTINGS_SUCCESS",
          payload: json.data
        });
      })
      .catch(err => {
        console.table(err);
        dispatch({
          type: "FETCH_SETTINGS_ERROR",
          err
        });
      });
  };
}

// add change password, modify user info, toggle 2fa
