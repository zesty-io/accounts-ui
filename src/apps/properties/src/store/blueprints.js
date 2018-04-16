import { request } from "../../../../util/request";
import config from "../../../../shell/config";

export function blueprints(state = {}, action) {
  switch (action.type) {
    case "FETCHING_BLUEPRINTS":
      return state;
    case "FETCHING_BLUEPRINTS_ERROR":
      // TODO show error message
      return {
        ...state,
        null: {
          name: "Looks like you havent selected a blueprint",
          coverImage: "",
          description: "Click the button to select a blueprint.",
          createdByUserZUID: null
        }
      };

    case "FETCHING_BLUEPRINTS_SUCCESS":
      return { ...state, ...action.blueprints };

    case "UPDATE_BLUEPRINT":
      return { ...state, ...action.payload };

    case "CREATING_BLUEPRINT":
      return state;

    case "CREATE_BLUEPRINT_SUCCESS":
      let blueprints = {
        ...state,
        [action.blueprint.ID]: action.blueprint
      };
      return blueprints;

    case "CREATE_BLUEPRINT_ERROR":
      return state;

    default:
      return state;
  }
}

export function fetchBlueprints() {
  return dispatch => {
    dispatch({
      type: "FETCHING_BLUEPRINTS"
    });
    request(`${config.API_ACCOUNTS}/blueprints`)
      .then(json => {
        let blueprints = json.data.reduce((acc, print) => {
          acc[print.ID] = print;
          return acc;
        }, {});
        dispatch({
          type: "FETCHING_BLUEPRINTS_SUCCESS",
          blueprints
        });
      })
      .catch(err => {
        console.table(err);
        dispatch({
          type: "FETCHING_BLUEPRINTS_ERROR",
          err
        });
      });
  };
}

export function fetchBlueprint(id) {
  return dispatch => {
    dispatch({
      type: "FETCHING_BLUEPRINTS"
    });
    request(`${config.API_ACCOUNTS}/blueprints/${id}`)
      .then(blueprint => {
        dispatch({
          type: "FETCHING_BLUEPRINTS_SUCCESS",
          blueprints: {
            [blueprint.data.ID]: blueprint.data
          }
        });
      })
      .catch(err => {
        console.table(err);
        dispatch({
          type: "FETCHING_BLUEPRINTS_ERROR",
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
    })
    .then(data => {
      dispatch({
        type: "CREATE_BLUEPRINT_SUCCESS",
        blueprint: data.data
      });
      return data.data
    })
    .catch(err => {
      console.table(error);
      dispatch({
        type: "CREATE_BLUEPRINT_ERROR",
        err
      })
      throw err
    })
  };
}