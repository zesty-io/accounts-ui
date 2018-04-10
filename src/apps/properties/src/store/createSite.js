import { request } from "../../../../util/request";
import config from "../../../../shell/config";

export function createSite(
  state = { newSite: false },
  action
) {
  switch (action.type) {
    case "ADD_SITE_INFO":
      return { ...state, ...action.payload };
    case "CREATING_SITE":
      return state;
    case "CREATE_SITE_SUCCESS":
      return {
        state,
        newSite: true,
        randomHashID: action.data.randomHashID
      };
    case "CREATE_SITE_ERROR":
      return { ...state, ...action.error };
    case "CLEAR_NEW_SITE":
      return { ...state, newSite: false, propertyName: "" };
    default:
      return state;
  }
}

export const postNewSite = name => {
  return dispatch => {
    dispatch({
      type: "CREATING_SITE"
    });
    return request(`${config.API_ACCOUNTS}/instances`, {
      method: "POST",
      json: true,
      body: { name }
    }).then(data => {
      dispatch({
        type: "CREATE_SITE_SUCCESS",
        data: data.data
      });
      return data
    }).catch(err => {
      dispatch({
        type: "CREATE_SITE_ERROR",
        err
      })
      console.table(err)
      throw err
    })
  };
};

export const addSiteInfo = payload => {
  return {
    type: "ADD_SITE_INFO",
    payload
  };
};
