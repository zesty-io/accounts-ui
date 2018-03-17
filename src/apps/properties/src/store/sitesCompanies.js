import { request } from '../../../../util/request'
import config from '../../../../shell/config'

export function sitesCompanies(state = {}, action) {
  switch (action.type) {
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

export const fetichSiteCompanies = (userZuid, siteZuid) => {
  return dispatch => {
    dispatch({
      type: 'FETCHING_COMPANIES'
    })

    request(`http://${config.API_ACCOUNTS}/instances/${siteZuid}/companies`)
      .then(companies => {
        dispatch({
          type: 'FETCH_COMPANIES_SUCCESS',
          companies: companies.data
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'FETCH_COMPANIES_ERROR',
          err
        })
      })
  }
}
