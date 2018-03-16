import { request } from '../../../../util/request'
import config from '../../../../shell/config'

import { normalizeSites } from '../store'

export function sitesFiltered(state = {}, action) {
  switch (action.type) {
    case 'FETCH_SITES_SUCCESS':
      return normalizeSites(action.sites)
    // return {}

    case 'FILTER_PROPERTIES':
      return action.filteredSites
    // return {}

    default:
      return state
  }
}

// export const filterProperties = searchString => {
//   return function(dispatch, getState) {
//     let sites = getState().sites
//     if (searchString !== '') {
//       let filteredSites = {}
//       for (const zuid in sites) {
//         if (
//           sites[zuid].ZUID &&
//           sites[zuid].ZUID.toLowerCase().includes(searchString.toLowerCase())
//         ) {
//           filteredSites[zuid] = sites[zuid]
//         }
//         if (
//           sites[zuid].AccountName &&
//           sites[zuid].AccountName.toLowerCase().includes(
//             searchString.toLowerCase()
//           )
//         ) {
//           filteredSites[zuid] = sites[zuid]
//         }
//         if (
//           sites[zuid].RandomHashID &&
//           sites[zuid].RandomHashID.toLowerCase().includes(
//             searchString.toLowerCase()
//           )
//         ) {
//           filteredSites[zuid] = sites[zuid]
//         }
//       }
//       dispatch({
//         meta: { debounce: { time: 250 } },
//         type: 'FILTER_PROPERTIES',
//         filteredSites
//       })
//     } else {
//       dispatch({ type: 'FILTER_PROPERTIES', filteredSites: sites })
//     }
//   }
// }
