import { request } from '../../../../util/request'

export function sitesDomains(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_DOMAINS':
      return state
    case 'FETCH_SITE_DOMAINS_SUCCESS':
      return {
        ...state,
        [action.siteZUID]: {
          ...state[action.siteZUID],
          domains: action.domains
        }
      }
    case 'FETCH_DOMAINS_ERROR':
      return state
    case 'UPDATE_SITE_DOMAINS':
      return {
        ...state,
        [action.siteZUID]: {
          ...state[action.siteZUID],
          domains: [...state[action.siteZUID].domains, action.domain]
        }
      }
    case 'REMOVE_SITE_DOMAIN_SUCCESS':
      const domains = state[action.siteZUID].domains.filter(
        domain => domain.ZUID !== action.domainZUID
      )
      return {
        ...state,
        [action.siteZUID]: {
          ...state[action.siteZUID],
          domains
        }
      }
    default:
      return state
  }
}

export function fetchDomains(siteZUID) {
  return (dispatch, getState) => {
    const state = getState()
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZUID}/domains`, {
      method: 'Get',
      json: true
    }).then(res => {
      const domains = res.data.map(item => ({
        ZUID: item.ZUID,
        domain: item.domain,
        branch: item.branch,
        createdAt: item.createdAt
      }))

      if (!res.error) {
        dispatch({
          type: 'FETCH_SITE_DOMAINS_SUCCESS',
          domains,
          siteZUID
        })
      }
      return res.data
    })
  }
}

export function addDomain(siteZUID, domain, branch) {
  return dispatch => {
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZUID}/domains`, {
      method: 'POST',
      json: true,
      body: { domain, branch }
    }).then(res => {
      if (!res.error) {
        dispatch({
          type: 'UPDATE_SITE_DOMAINS',
          domain: res.data,
          siteZUID
        })
      }
      return res.data
    })
  }
}

export const removeDomain = (siteZUID, domainZUID) => {
  return dispatch => {
    return request(
      `${CONFIG.API_ACCOUNTS}/instances/${siteZUID}/domains/${domainZUID}`,
      { method: 'DELETE' }
    ).then(res => {
      dispatch({
        type: 'REMOVE_SITE_DOMAIN_SUCCESS',
        domainZUID,
        siteZUID
      })
      return res.data
    })
  }
}
