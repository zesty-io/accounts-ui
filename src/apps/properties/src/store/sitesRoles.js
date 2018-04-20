import { request } from "../../../../util/request";
import config from "../../../../shell/config";

export function sitesRoles(state = {}, action) {
  switch (action.type) {
    case "FETCHING_ROLES":
      return state;
    case "FETCH_ROLES_SUCCESS":
      return { ...state, [action.siteZuid]: action.normalizedRoles };
    case "FETCH_ROLES_ERROR":
      return state;
    case "ADDING_ROLE_FAILURE":
      return state;
    case "DELETING_ROLE":
      return state;
    case "DELETING_ROLE_SUCCESS":
      return state;
    case "DELETING_ROLE_FAILURE":
      return state;
    case "FETCHING_ROLE":
      return state;
    case "FETCHING_ROLE_SUCCESS":
      return {
        ...state,
        [action.siteZUID]: { ...state[action.siteZUID], ...action.role }
      };
    case "FETCHING_ROLE_FAILURE":
      return state;
    case "UPDATING_ROLE":
      return state;
    case "UPDATING_ROLE_SUCCESS":
      return state;
    case "UPDATING_ROLE_FAILURE":
      return state;
    default:
      return state;
  }
}

export const fetchSiteRoles = (userZuid, siteZuid) => {
  return dispatch => {
    dispatch({
      type: "FETCHING_ROLES"
    });
    request(`${config.API_ACCOUNTS}/instances/${siteZuid}/roles`)
      .then(roles => {
        let normalizedRoles = {};
        roles.data.forEach(role => {
          return (normalizedRoles[role.ZUID] = role);
        });
        dispatch({
          type: "FETCH_ROLES_SUCCESS",
          siteZuid,
          normalizedRoles
        });
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: "FETCH_ROLES_ERROR",
          err
        });
      });
  };
};

export const getRole = (roleZUID, siteZUID) => {
  return dispatch => {
    dispatch({ type: "FETCHING_ROLE" });
    return request(`${config.API_ACCOUNTS}/roles/${roleZUID}`)
      .then(data => {
        let fetchedRole = { [data.data.ZUID]: data.data };
        dispatch({
          type: "FETCHING_ROLE_SUCCESS",
          role: fetchedRole,
          siteZUID
        });
        return data.data;
      })
      .catch(err => {
        dispatch({ type: "FETCHING_ROLE_FAILURE" });
        console.table(err);
        throw err;
      });
  };
};

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

export const removeRole = roleZUID => {
  return dispatch => {
    dispatch({ type: "DELETING_ROLE" });
    return request(`${config.API_ACCOUNTS}/roles/${roleZUID}`, {
      method: "DELETE"
    })
      .then(data => {
        dispatch({ type: "DELETING_ROLE_SUCCESS" });
        return data;
      })
      .catch(err => {
        console.table(err);
        dispatch({ type: "DELETING_ROLE_FAILURE" });
        throw err;
      });
  };
};

export const updateRole = (role, roleZUID) => {
  return dispatch => {
    dispatch({ type: "UPDATING_ROLE" });
    return request(`${config.API_ACCOUNTS}/roles/${roleZUID}/granulars`, {
      method: "POST",
      body: role
    })
      .then(data => {
        dispatch({ type: "UPDATING_ROLE_SUCCESS" });
        return data;
      })
      .catch(err => {
        console.table(err);
        dispatch({ type: "UPDATING_ROLE_FAILURE" });
        throw err;
      });
  };
};
