import { request } from "../../../../util/request";
import config from "../../../../shell/config";

const initialState = { submitted: false, systemRoleZUID: "31-71cfc74-s30" };

export function sitesPermissions(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_PERMISSIONS":
      return { ...state, ...action.payload };
    case "ADDING_ROLE":
      return { ...state, submitted: !state.submitted };
    case "ADDING_ROLE_SUCCESS":
      return {
        ...state,
        currentRole: action.role,
        submitted: !state.submitted
      };
    case "CHANGE_CURRENT_ROLE":
      return { ...state, currentRole: action.role };
    case "ADDING_ROLE_FAILURE":
      return { ...state, submitted: !state.submitted };
    case "DELETING_ROLE":
      return state
    case "DELETING_ROLE_SUCCESS":
      return state
    case "DELETING_ROLE_FAILURE":
      return state
    case "FETCHING_ROLE":
      return state;
    case "FETCHING_ROLE_SUCCESS":
      return { ...state, currentRole: action.role };
    case "FETCHING_ROLE_FAILURE":
      return state;
    default:
      return state;
  }
}

export const createRole = (siteZUID, body) => {
  return dispatch => {
    dispatch({ type: "ADDING_ROLE" });
    return request(`${config.API_ACCOUNTS}/roles`, {
      method: "POST",
      json: true,
      body: {
        entityZUID: siteZUID,
        name: body.name,
        systemRoleZUID: body.systemRoleZUID
        // add expiry once allowed by API again
      }
    })
      .then(data => {
        dispatch({ type: "ADDING_ROLE_SUCCESS", role: data.data });
        return data.data;
      })
      .catch(err => {
        console.table(err);
        dispatch({ type: "ADDING_ROLE_FAILURE" });
        throw err;
      });
  };
};

export const getRole = roleZUID => {
  return dispatch => {
    dispatch({ type: "FETCHING_ROLE" });
    return request(`${config.API_ACCOUNTS}/roles/${roleZUID}`)
      .then(data => {
        dispatch({ type: "FETCHING_ROLE_SUCCESS", role: data.data });
        return data.data;
      })
      .catch(err => {
        dispatch({ type: "FETCHING_ROLE_FAILURE" });
        console.table(err);
        throw err;
      });
  };
};

export const updateRole = roleZUID => {
  return null;
};

export const changeCurrentRole = roleZUID => {
  return (dispatch, getState) => {
    const role = getState().sitesRoles.filter(
      siteRole => siteRole.ZUID === roleZUID
    )[0];
    return dispatch({ type: "CHANGE_CURRENT_ROLE", role });
  };
};

export const removeRole = roleZUID => {
  return dispatch => {
    dispatch({ type: "DELETING_ROLE" })
    return request(`${config.API_ACCOUNTS}/roles/${roleZUID}`, {
      method: "DELETE"
    })
    .then(data => {
      dispatch({ type: "DELETING_ROLE_SUCCESS"})
      return data
    })
    .catch(err => {
      console.table(err)
      dispatch({ type: "DELETING_ROLE_FAILURE"})
      throw err
    })
  }
}