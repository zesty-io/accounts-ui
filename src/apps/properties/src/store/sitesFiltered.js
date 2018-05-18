import { request } from '../../../../util/request'
import config from '../../../../shell/config'

import { normalizeSites } from '../store'

export function sitesFiltered(state = {}, action) {
  switch (action.type) {
    case 'FETCH_SITES_SUCCESS':
      return normalizeSites(action.sites)
    case 'FETCH_SITES_SUCCESS_NOSITES':
      return {}
    case 'FILTER_PROPERTIES':
      return action.filtered

    default:
      return state
  }
}

export const filter = searchString => {
  return function(dispatch, getState) {
    let sites = getState().sites
    if (searchString !== '') {
      let filtered = {}
      for (const zuid in sites) {
        let site = sites[zuid]
        if (
          site.name &&
          site.name.toLowerCase().includes(searchString.toLowerCase())
        ) {
          filtered[zuid] = site
        } else if (site.ZUID && site.ZUID.includes(searchString)) {
          filtered[zuid] = site
        } else if (
          site.RandomHashID &&
          site.RandomHashID.includes(searchString)
        ) {
          filtered[zuid] = site
        } else if (
          site.ecoID &&
          site.ecoID.toString() === searchString.toString()
        ) {
          filtered[zuid] = site
        }
      }
      dispatch({
        meta: { debounce: { time: 250 } },
        type: 'FILTER_PROPERTIES',
        filtered
      })
    } else {
      dispatch({
        type: 'FILTER_PROPERTIES',
        filtered: sites
      })
    }
  }
}
