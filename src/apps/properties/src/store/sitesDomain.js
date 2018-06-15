import { request } from '../../../../util/request'

export function updateDomain(siteZUID, domain) {
  return dispatch => {
    return request(
      `${CONFIG.API_ACCOUNTS}/instances/${siteZUID}?action=updateDomain`,
      {
        method: 'PUT',
        json: true,
        body: { domain }
      }
    ).then(res => {
      return res.data.domain
    })
  }
}

export function checkDNS(dnsObject) {
  return dispatch => {
    return request(`${CONFIG.API_ACCOUNTS}/instances/dns`, {
      method: 'POST',
      json: true,
      body: dnsObject
    }).then(res => {
      return res.data
    })
  }
}
