import { request } from '../../../../util/request'

export function sitesCollections(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_COLLECTIONS':
      return state
    case 'FETCH_COLLECTIONS_SUCCESS':
      return { ...state, [action.siteZuid]: action.collections }
    case 'FETCH_COLLECTIONS_ERROR':
      return state
    default:
      return state
  }
}

export const fetchSiteCollections = siteZuid => {
  return dispatch => {
    dispatch({
      type: 'FETCHING_COLLECTIONS'
    })
    request(`http://${siteZuid}${CONFIG.API_INSTANCE}/collections/`).then(
      collections => {
        let normalizedCollections = {}
        collections.data.forEach(collection => {
          return (normalizedCollections[collection.zuid] = collection)
        })
        dispatch({
          type: 'FETCH_COLLECTIONS_SUCCESS',
          siteZuid,
          collections: normalizedCollections
        })
      }
    )
  }
}
