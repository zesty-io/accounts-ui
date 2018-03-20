import { request } from '../../../../util/request'
import config from '../../../../shell/config'

export function sitesStats(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_SITE_STATS':
      return state
    case 'FETCHING_SITE_STATS_SUCCESS':
      return state
    case 'FETCHING_SITE_STATS_ERROR':
      return state
    default:
      return state
  }
}
