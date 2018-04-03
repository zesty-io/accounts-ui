import { request } from "../../../../util/request";
import config from "../../../../shell/config";

export function userBlueprints(state = { submitted: false }, action) {
  switch (action.type) {
    case "FETCHING_ACCOUNT_BLUEPRINTS":
      return state;

    case "FETCHING_ACCOUNT_BLUEPRINTS_SUCCESS":
      return { ...state, ...action.blueprints };

    case "FETCHING_ACCOUNT_BLUEPRINTS_ERROR":
      return state;

    case "UPDATE_BLUEPRINT":
      return { ...state, ...action.payload };

    case "CREATING_BLUEPRINT":
      return { ...state, submitted: !state.submitted };

    case "CREATE_BLUEPRINT_SUCCESS":
      let blueprints = {
        ...state,
        [action.blueprint.ID]: action.blueprint
      };
      return { ...state, blueprints, submitted: !state.submitted };

    case "CREATE_BLUEPRINT_ERROR":
      return { ...state, submitted: !state.submitted };

    default:
      return state;
  }
}

export function fetchAccountBlueprints() {
  return dispatch => {
    dispatch({
      type: "FETCHING_ACCOUNT_BLUEPRINTS"
    });
    request(`${config.API_ACCOUNTS}/blueprints`)
      .then(json =>
        dispatch({
          type: "FETCHING_ACCOUNT_BLUEPRINTS_SUCCESS",
          blueprints: json.data
        })
      )
      .catch(err => {
        console.table(err);
        dispatch({
          type: "FETCHING_ACCOUNT_BLUEPRINTS_ERROR",
          err
        });
      });
  };
}
export function postNewBlueprint(name) {
  return dispatch => {
    dispatch({
      type: "CREATING_BLUEPRINT"
    });
    return request(`${config.API_ACCOUNTS}/blueprints`, {
      method: "POST",
      json: true,
      body: { name }
    });
  };
}

export function updateSetting(payload) {
  return {
    type: "UPDATE_BLUEPRINT",
    meta: {
      debounce: {
        time: 250
      }
    },
    payload
  };
}
