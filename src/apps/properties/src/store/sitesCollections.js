import { request } from '../../../../util/request'
import config from '../../../../shell/config'

export function sitesCollections(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_COLLECTIONS':
      return state
    case 'FETCH_COLLECTIONS_SUCCESS':
      return action.collections
    case 'FETCH_COLLECTIONS_ERROR':
      return state
    default:
      return state
  }
}

export const fetchSiteCollections = (userZuid, siteZuid) => {
  return dispatch => {
    dispatch({
      type: 'FETCHING_COLLECTIONS'
    })
    request(`http://${siteZuid}${config.API_INSTANCE}collections/`)
      .then(collections => {
        let normalizedCollections = {}
        collections.data.forEach(collection => {
          return normalizedCollections[collection.zuid] = collection
        })
        dispatch({
          type: 'FETCH_COLLECTIONS_SUCCESS',
          collections: normalizedCollections
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'FETCH_COLLECTIONS_ERROR',
          err
        })
      })
  }
}
