import { request } from '../../../../util/request'

export function updateDomain(siteZUID, domain) {
  return dispatch => {
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZUID}?action=updateDomain`, {
      method: 'PUT',
      json: true,
      body: { domain }
    })
      .then(res => {
        return res.data.domain
      })
      .catch(err => {
        console.table(err)
        return err
      })
  }
}
