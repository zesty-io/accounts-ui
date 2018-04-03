import { request } from "../../../../util/request";
import config from "../../../../shell/config";

export function userProfile(state = { submitted: false }, action) {
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
      return { ...state, submitted: !state.submitted };

    case "MODIFY_FAILURE":
      //TODO: deactivate loading state
      //TODO: show global growl of error
      return state;

    case "MODIFY_PROFILE_SUCCESS":
      //TODO: deactivate loading state
      return { ...state, submitted: !state.submitted };

    case "ADD_EMAIL_SUCCESS":
      const emails = state.emails.concat([
        { email: state.newEmail, options: state.newEmailOptions || "" }
      ]);
      return { ...state, newEmail: "", emails };

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
    const userZUID = getState().user.zuid
    const profile = getState().userProfile
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

export function addEmail(payload) {
  return dispatch => {
    dispatch({
      type: "ADDING_EMAIL"
    });
    setTimeout(() => {
      dispatch({
        type: "ADD_EMAIL_SUCCESS",
        payload
      });
    }, 500);
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
