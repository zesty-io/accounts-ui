import { request } from "../../../../util/request";
import config from "../../../../shell/config";

export function userBlueprints(state = {}, action) {
  switch (action.type) {
    case "FETCHING_ACCOUNT_BLUEPRINTS":
      return state;

    case "FETCHING_ACCOUNT_BLUEPRINTS_SUCCESS":
      return { ...state, blueprints: action.blueprints };

    case "FETCHING_ACCOUNT_BLUEPRINTS_ERROR":
      return state;

    case "CREATING_BLUEPRINT":
      return { ...state, submitted: !state.submitted };

    case "CREATE_BLUEPRINT_SUCCESS":
      let blueprints = {
        ...state.blueprints,
        [action.blueprint.ID]: action.blueprint
      };
      return { ...state, blueprints, submitted: !state.submitted };

    case "CREATE_BLUEPRINT_ERROR":
      return state;
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
