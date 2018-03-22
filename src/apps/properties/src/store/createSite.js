import { request } from "../../../../util/request";
import config from "../../../../shell/config";

export function createSite(state = {}, action) {
  switch (action.type) {
    case "ADD_SITE_INFO":
      return { ...state, ...action.payload };
    case "CREATING_SITE":
      //do some sort of validation
      return state;
    case "CREATE_SITE_SUCCESS":
      return state;
    case "CREATE_SITE_ERROR":
      return {...state, ...action.error};
    default:
      return state;
  }
}

export const postNewSite = (name) => {
  return dispatch => {
    dispatch({
      type: "CREATING_SITE"
    });
    return request(`${config.API_ACCOUNTS}/instances`, {
      method: "POST",
      json: true,
      body: { name }
    })
      // .then(site => {
      //   console.log('site-',site)
      //   dispatch({
      //     type: "CREATE_SITE_SUCCESS",
      //     site: site.data
      //   });
      // })
      // .catch(err => {
      //   console.error(err);
      //   dispatch({
      //     type: "CREATE_SITE_ERROR",
      //     err
      //   });
      // });
  };
};

export const addSiteInfo = payload => {
  return {
    type: "ADD_SITE_INFO",
    meta: {
      debounce: {
        time: 250
      }
    },
    payload
  };
};
