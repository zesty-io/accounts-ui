import { request } from '../../../../util/request'
import config from '../../../../shell/config'

export function siteCompanies(state = {} , action) {
  switch(action.type){
    case 'FETCHING_COMPANIES':
      return state
    case 'FETCH_COMPANIES_SUCCESS':
      return state
    case 'FETCH_COMPANIES_ERROR':
      return state
    default:
      return state
  }
}