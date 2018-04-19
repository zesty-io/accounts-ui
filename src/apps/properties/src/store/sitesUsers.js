import { request } from "../../../../util/request";
import config from "../../../../shell/config";

export function sitesUsers(state = {}, action) {
  switch (action.type) {
    case "FETCHING_USERS":
      return state;
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        [action.siteZUID]: { ...state[action.siteZUID], ...action.users }
      };
    case "FETCH_USERS_ERROR":
      return state;
    case "FETCHING_USERS_PENDING":
      return state;

    case "DELETE_USERS_PENDING":
      return {...state, [action.siteZUID]: action.users};

    case "FETCH_USERS_PENDING_SUCCESS":
      return {
        ...state,
        [action.siteZUID]: { ...state[action.siteZUID], ...action.users }
      };
    case "FETCH_USERS_PENDING_ERROR":
      return state;
    default:
      return state;
  }
}

export const fetchSiteUsers = (userZUID, siteZUID) => {
  return dispatch => {
    dispatch({
      type: "FETCHING_USERS"
    });
    request(`${config.API_ACCOUNTS}/instances/${siteZUID}/users`)
      .then(users => {
        let normalizedUsers = {};
        users.data.forEach(user => {
          return (normalizedUsers[user.ZUID] = user);
        });
        dispatch({
          type: "FETCH_USERS_SUCCESS",
          siteZUID,
          users: normalizedUsers
        });
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: "FETCH_USERS_ERROR",
          err
        });
      });
  };
};

export const fetchSiteUsersPending = (userZUID, siteZUID) => {
  return dispatch => {
    dispatch({
      type: "FETCHING_USERS_PENDING"
    });
    request(`${config.API_ACCOUNTS}/instances/${siteZUID}/users/pending`)
      .then(users => {
        if (!users.data.length) {
          dispatch({
            type: "FETCH_USERS_PENDING_SUCCESS",
            siteZUID,
            users: null
          });
        }
        let normalizedUsers = {};
        users.data.forEach(user => {
          user.pending = true;
          return (normalizedUsers[user.inviteZUID] = user);
        });
        dispatch({
          type: "FETCH_USERS_PENDING_SUCCESS",
          siteZUID,
          users: normalizedUsers
        });
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: "FETCH_USERS_PENDING_ERROR",
          err
        });
      });
  };
};

export const removeSiteUsersPending = (inviteZUID, siteZUID) => {
  return (dispatch, getState) => {
    let users = getState().sitesUsers[siteZUID];
    delete users[inviteZUID]
    return dispatch({
      type: "DELETE_USERS_PENDING",
      users,
      siteZUID
    })
  };
};
