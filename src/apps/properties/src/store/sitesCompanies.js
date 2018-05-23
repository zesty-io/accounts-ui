import { request } from '../../../../util/request'


export function sitesCompanies(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_COMPANIES':
      return state
    case 'FETCH_COMPANIES_SUCCESS':
      return { ...state, [action.siteZuid]: action.companies }
    case 'FETCH_COMPANIES_ERROR':
      return state
    default:
      return state
  }
}

export const fetchSiteCompanies = siteZuid => {
  return dispatch => {
    dispatch({
      type: 'FETCHING_COMPANIES'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZuid}/companies`)
      .then(companies => {
        dispatch({
          type: 'FETCH_COMPANIES_SUCCESS',
          companies: companies.data,
          siteZuid
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
