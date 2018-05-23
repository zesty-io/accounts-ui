import { request } from '../../../../util/request'


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

export const sortSites = (sortBy, reverse) => {
  return (dispatch, getState) => {
    const sitesObj = getState().sitesFiltered
    let sites = Object.keys(sitesObj).map(site => sitesObj[site])
    if (reverse) {
      sites.sort((prev, next) => {
        if (prev[sortBy] < next[sortBy]) {
          return 1
        }
        if (prev[sortBy] > next[sortBy]) {
          return -1
        }
        return 0
      })
      return dispatch({
        type: 'FILTER_PROPERTIES',
        filtered: sites
      })
    }
    sites.sort((prev, next) => {
      if (prev[sortBy] < next[sortBy]) {
        return -1
      }
      if (prev[sortBy] > next[sortBy]) {
        return 1
      }
      return 0
    })
    return dispatch({
      type: 'FILTER_PROPERTIES',
      filtered: sites
    })
  }
}

export const filter = searchString => {
  return function(dispatch, getState) {
    let sites = getState().sites

    if (searchString !== '') {
      let filtered = {}
      if (typeof searchString !== 'number') {
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
          }
        }
      } else {
        for (const zuid in sites) {
          let site = sites[zuid]
          if (site.ecoID && site.ecoID == searchString) {
            filtered[zuid] = site
          }
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

export const filterEcosystem = searchString => {
  return function(dispatch, getState) {
    //uses the currently filtered sites list
    let sites = getState().sitesFiltered

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
