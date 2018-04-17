import { request } from "../../../../util/request";
import config from "../../../../shell/config";

export function sitesCollections(state = {}, action) {
  switch (action.type) {
    case "FETCHING_COLLECTIONS":
      return state;
    case "FETCH_COLLECTIONS_SUCCESS":
      return { ...state, [action.siteZuid]: action.collections };
    case "FETCH_COLLECTIONS_ERROR":
      return state;
    default:
      return state;
  }
}

export const fetchSiteCollections = (userZuid, siteZuid) => {
  return dispatch => {
    dispatch({
      type: "FETCHING_COLLECTIONS"
    });
    request(`http://${siteZuid}${config.API_INSTANCE}collections/`)
      .then(collections => {
        let normalizedCollections = {};
        collections.data.forEach(collection => {
          return (normalizedCollections[collection.zuid] = collection);
        });
        dispatch({
          type: "FETCH_COLLECTIONS_SUCCESS",
          siteZuid,
          collections: normalizedCollections
        });
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: "FETCH_COLLECTIONS_ERROR",
          err
        });
        let normalizedCollections = {};
        fakeCollections.data.forEach(collection => {
          return (normalizedCollections[collection.zuid] = collection);
        });
        // this should be removed
        dispatch({
          type: "FETCH_COLLECTIONS_SUCCESS",
          siteZuid,
          collections: normalizedCollections
        });
      });
  };
};

const fakeCollections = { // this should be removed
  "data": [
    {
        "zuid": "6-5138075-071xtt",
        "zid": 10,
        "parentZUID": null,
        "kind": "dataset",
        "hasView": 0,
        "label": "Content Clippings",
        "description": null,
        "name": "clippings",
        "created_by_user_zuid": "",
        "updated_by_user_zuid": "",
        "createdAt": "2017-09-12T16:42:25Z",
        "updatedAt": "2017-09-12T16:42:29Z",
        "deletedAt": null
    },
    {
        "zuid": "6-5138075-hxjfz5",
        "zid": 14,
        "parentZUID": null,
        "kind": "dataset",
        "hasView": 0,
        "label": "Widgets",
        "description": null,
        "name": "widgets",
        "created_by_user_zuid": "",
        "updated_by_user_zuid": "",
        "createdAt": "2017-09-12T16:42:25Z",
        "updatedAt": "2017-09-12T16:42:29Z",
        "deletedAt": null
    },
    {
        "zuid": "6-5138075-3kb9n0",
        "zid": 500,
        "parentZUID": null,
        "kind": "templateset",
        "hasView": 0,
        "label": "Homepage",
        "description": null,
        "name": "homepage",
        "created_by_user_zuid": "",
        "updated_by_user_zuid": "",
        "createdAt": "2017-09-12T16:42:25Z",
        "updatedAt": "2017-09-12T16:42:29Z",
        "deletedAt": null
    },
    {
        "zuid": "6-5138075-sbr924",
        "zid": 502,
        "parentZUID": null,
        "kind": "templateset",
        "hasView": 0,
        "label": "Simple Page",
        "description": null,
        "name": "simple_page",
        "created_by_user_zuid": "",
        "updated_by_user_zuid": "",
        "createdAt": "2017-09-12T16:42:25Z",
        "updatedAt": "2017-09-12T16:42:29Z",
        "deletedAt": null
    },
    {
        "zuid": "6-5138075-74pg9s",
        "zid": 504,
        "parentZUID": null,
        "kind": "dataset",
        "hasView": 0,
        "label": "Sidebar Contact Form",
        "description": null,
        "name": "sidebar_contact_form",
        "created_by_user_zuid": "",
        "updated_by_user_zuid": "",
        "createdAt": "2017-09-12T16:42:25Z",
        "updatedAt": "2017-09-12T16:42:29Z",
        "deletedAt": null
    }
]
}