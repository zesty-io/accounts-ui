import { request } from "../../../../util/request";
import config from "../../../../shell/config";
import { notify } from "../../../../shell/store/notifications";

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
      return state;

    case "MODIFYING_PROFILE":
      return state;

    case "MODIFY_PROFILE_FAILURE":
      return state;

    case "MODIFY_PROFILE_SUCCESS":
      return state;

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
    const unverifiedEmails =
      getState().userProfile.unverifiedEmails !== null &&
      getState().userProfile.unverifiedEmails !== ""
        ? getState()
            .userProfile.unverifiedEmails.split(",")
            .concat(getState().userProfile.newEmail)
            .join(",")
        : getState().userProfile.newEmail.value;

    return request(`${config.API_ACCOUNTS}/users/${userZUID}`, {
      method: "PUT",
      json: true,
      body: {
        unverifiedEmails
      }
    }).then(data => {
      dispatch(
        notify({
          message: "Email added",
          type: "success"
        })
      );
      dispatch(getSettings())
      dispatch({ type: "ADD_EMAIL_SUCCESS" })
      return data
    })
    .catch(error => {
      dispatch(
        notify({
          message: `Problem adding email: ${error}`,
          type: "error"
        })
      );
      return dispatch({ type: "ADD_EMAIL_FAILURE" });
    });
  };
}

export function getSettings(userZUID) {
  return (dispatch, getState) => {
    dispatch({
      type: "FETCHING_SETINGS"
    });
    request(`${config.API_ACCOUNTS}/users/${userZUID || getState().user.zuid}`)
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

// add change password, toggle/add 2fa
