import { request } from '../../../../util/request'
import { notify } from '../../../../shell/store/notifications'

export function addEmail(name, address) {
  return dispatch => {
    return request(`${CONFIG.API_ACCOUNTS}/users/emails`, {
      method: 'POST',
      json: true,
      body: {
        name,
        address
      }
    })
  }
}

export function resendVerificationEmail(email) {
  return dispatch => {
    return request(
      `${CONFIG.API_ACCOUNTS}/users/emails/verifications?address=${email}`,
      {
        method: 'POST'
      }
    )
  }
}

export function deleteUserEmail(email) {
  return dispatch => {
    return request(`${CONFIG.API_ACCOUNTS}/users/emails?address=${email}`, {
      method: 'DELETE'
    })
  }
}

export function updatePassword(oldPassword, password) {
  return (dispatch, getState) => {
    const { ZUID } = getState().user
    return request(
      `${CONFIG.API_ACCOUNTS}/users/${ZUID}?action=updatePassword`,
      {
        method: 'PUT',
        json: true,
        body: {
          password,
          oldPassword
        }
      }
    )
  }
}
