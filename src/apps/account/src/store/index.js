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
      .then(() => {
        dispatch(
          notify({
            message: 'Email added',
            type: 'success'
          })
        )
      })
      .catch(err => {
        dispatch(
          notify({
            message: `Problem adding email: ${err}`,
            type: 'error'
          })
        )
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
      .then(data => {
        dispatch(
          notify({
            type: 'success',
            message: 'email successfully removed'
          })
        )
      })
      .catch(err => {
        dispatch(
          notify({
            type: 'error',
            message: 'encountered a problem removing email'
          })
        )
      })
  }
}

export function updatePassword(oldPassword, newPassword) {
  return (dispatch, getState) => {
    const { email, ZUID } = getState().user

    // TODO this endpoint does not return json which breaks our
    // request handler
    return request(
      `${CONFIG.API_ACCOUNTS}/users/${ZUID}?action=updatePassword`,
      {
        method: 'PUT',
        json: true,
        body: {
          password: newPassword
        }
      }
    )

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
