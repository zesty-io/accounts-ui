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
    },
    {
        "zuid": "6-51fc34e-hwx4vq",
        "zid": 509,
        "parentZUID": "0",
        "kind": "pageset",
        "hasView": 0,
        "label": "TEST Page group",
        "description": null,
        "name": "test_page_group",
        "created_by_user_zuid": "5-44ccc74-tr1vmph",
        "updated_by_user_zuid": "5-44ccc74-tr1vmph",
        "createdAt": "2017-09-21T23:54:54Z",
        "updatedAt": "2017-09-21T23:54:54Z",
        "deletedAt": null
    },
    {
        "zuid": "6-529ffcc-6hlgwp",
        "zid": 511,
        "parentZUID": null,
        "kind": "templateset",
        "hasView": 0,
        "label": "Blog",
        "description": null,
        "name": "blog_main_page",
        "created_by_user_zuid": "5-44ccc74-tr1vmph",
        "updated_by_user_zuid": "5-44ccc74-tr1vmph",
        "createdAt": "2017-09-29T18:15:40Z",
        "updatedAt": "2017-09-29T18:15:40Z",
        "deletedAt": null
    },
    {
        "zuid": "6-52a006a-p0m2st",
        "zid": 512,
        "parentZUID": "7-5138075-hf6mjv",
        "kind": "pageset",
        "hasView": 0,
        "label": "Blog_articles",
        "description": null,
        "name": "blog_articles",
        "created_by_user_zuid": "5-44ccc74-tr1vmph",
        "updated_by_user_zuid": "5-44ccc74-tr1vmph",
        "createdAt": "2017-09-29T18:18:18Z",
        "updatedAt": "2017-09-29T18:18:18Z",
        "deletedAt": null
    },
    {
        "zuid": "6-5b32f6d-g52g1g",
        "zid": 514,
        "parentZUID": "0",
        "kind": "templateset",
        "hasView": 0,
        "label": "Test Single Pages",
        "description": null,
        "name": "test_single_pages",
        "created_by_user_zuid": "5-44ccc74-tr1vmph",
        "updated_by_user_zuid": "5-44ccc74-tr1vmph",
        "createdAt": "2018-01-11T19:39:25Z",
        "updatedAt": "2018-01-11T19:39:25Z",
        "deletedAt": null
    },
    {
        "zuid": "6-5b331ea-jc1sn3",
        "zid": 515,
        "parentZUID": "0",
        "kind": "templateset",
        "hasView": 0,
        "label": "Test Single Pages 2",
        "description": null,
        "name": "test_single_page_2",
        "created_by_user_zuid": "5-44ccc74-tr1vmph",
        "updated_by_user_zuid": "5-44ccc74-tr1vmph",
        "createdAt": "2018-01-11T19:50:02Z",
        "updatedAt": "2018-01-11T19:50:02Z",
        "deletedAt": null
    }
]
}