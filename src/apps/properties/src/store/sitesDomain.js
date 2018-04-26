import { request } from '../../../../util/request'
import config from '../../../../shell/config'

export function sitesDomain(state = {}, action) {
  switch (action.type) {
    case 'UPDATING_DOMAIN':
      return state
    case 'UPDATING_DOMAIN_SUCCESS':
      return state
    case 'UPDATING_DOMAIN_FAILURE':
      return state
    default:
      return state
  }
}

export function inviteData(payload) {
  return {
    type: 'INVITE_DATA',
    payload
  }
}

export function updateDomain(siteZUID, domain) {
  return dispatch => {
    dispatch({
      type: 'UPDATING_DOMAIN'
    })
    return request(`${config.API_ACCOUNTS}/instances/${siteZUID}`, {
      method: 'PUT',
      json: true,
      body: { domain }
    })
  }
}
