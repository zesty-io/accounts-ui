import { request } from '../../../../util/request'

export function addEmail(name, email) {
  return (dispatch) => {
    return request(`${CONFIG.API_ACCOUNTS}/users/emails`, {
      method: 'PUT',
      json: true,
      body: {
        name,
        email
      }
    })
  }
}

export function resendVerificationEmail(email) {
  return dispatch => {
    return request(`${CONFIG.API_ACCOUNTS}/users/emails/verifications?address=${email}`, {
      method: 'POST'
    })
  }
}

export function deleteUserEmail(email) {
  return dispatch => {
    return request(`${CONFIG.API_ACCOUNTS}/users/emails/verifications?address=${email}`, {
      method: 'DELETE'
    })
  }
}

export function updatePassword(oldPassword, newPassword) {
  return (dispatch, getState) => {
    const { email, ZUID } = getState().user

    // TODO this endpoint does not return json which breaks our
    // request handler
    return request(`${CONFIG.API_ACCOUNTS}/users/${ZUID}?updatePassword=true`, {
      method: 'POST',
      json: true,
      body: {
        password: newPassword
      }
    })

    // TODO should we log user out after password reset?

    // TODO this won't work because it does not account for 2FA login flows
    // we need to figure out another way to validate the old password
    // return request(`${CONFIG.API_AUTH}/login`, {
    //   body: {
    //     email: email,
    //     password: oldPassword
    //   }
    // }).then(data => {
    //   console.log();
    //
    // })
  }
}
