import config from "../config";
import { request } from "../../util/request";
import { notify } from "../store/notifications";

export function user(state = {}, action) {
  switch (action.type) {
    case "FETCHING_USER":
      // TODO show loading state?
      return state;

    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        ...action.user
      };
    case "FETCH_AUTH_SUCCESS":
      return state;

    case "FETCH_VERIFY_SUCCESS":
      // console.log('FETCH_AUTH_SUCCESS', action)
      return {
        ...state,
        zuid: action.zuid
      };

    case "FETCH_USER_ERROR":
      // TODO handle failure
      return state;

    case "UPDATE_USER_PROFILE":
      return { ...state, ...action.payload };

    case "SAVING_PROFILE":
      return state;

    case "SAVING_PROFILE_ERROR":
      return state;

    case "SAVING_PROFILE_SUCCESS":
      return state;

    case "ADDING_EMAIL":
      return state;

    case "ADD_EMAIL_SUCCESS":
      return state;

    case "ADD_EMAIL_FAILURE":
      return state;

    default:
      return state;
  }
}

export function fetchUser(zuid) {
  return dispatch => {
    dispatch({
      type: "FETCHING_USER"
    });
    request(`${config.API_ACCOUNTS}/users/${zuid}`)
      .then(user => {
        dispatch({
          type: "FETCH_USER_SUCCESS",
          user: user.data
        });
      })
      .catch(err => {
        console.table(err);
        dispatch({
          type: "FETCH_USER_ERROR",
          err
        });
      });
  };
}

export function updateProfile(payload) {
  return {
    type: "UPDATE_USER_PROFILE",
    payload
  };
}

export function saveProfile() {
  return (dispatch, getState) => {
    let { settings } = getState();
    dispatch({
      type: "SAVING_PROFILE"
    });
    const userZUID = getState().user.zuid;
    const profile = getState().user;
    return request(`${config.API_ACCOUNTS}/users/${userZUID}`, {
      method: "PUT",
      json: true,
      body: {
        firstName: profile.firstName,
        lastName: profile.lastName
      }
    })
      .then(data => {
        dispatch({ type: "SAVING_PROFILE_SUCCESS" });
        return data;
      })
      .catch(err => {
        console.table(err);
        dispatch({ type: "SAVING_PROFILE_ERROR" });
        throw err;
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
      getState().user.unverifiedEmails !== null &&
      getState().user.unverifiedEmails !== ""
        ? getState()
            .user.unverifiedEmails.split(",")
            .concat(getState().user.newEmail)
            .join(",")
        : getState().user.newEmail;
    return request(`${config.API_ACCOUNTS}/users/${userZUID}`, {
      method: "PUT",
      json: true,
      body: {
        unverifiedEmails
      }
    })
      .then(data => {
        dispatch(
          notify({
            message: "Email added",
            type: "success"
          })
        );
        dispatch(fetchUser(userZUID));
        dispatch({ type: "ADD_EMAIL_SUCCESS" });
        return data;
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
