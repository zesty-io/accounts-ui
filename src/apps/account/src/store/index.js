import config from '../../../../shell/config'
import { request } from '../../../../util/request'

export function addEmail(userZUID, email) {
  return (dispatch, getState) => {
    let state = getState()
    state.user.unverifiedEmails.push(email)

    return request(`${config.API_ACCOUNTS}/users/${userZUID}`, {
      method: 'PUT',
      json: true,
      body: {
        unverifiedEmails: state.user.unverifiedEmails.join(',')
      }
    })
  }
}

export function updatePassword(oldPassword, newPassword) {
  return (dispatch, getState) => {
    const { email, ZUID } = getState().user

    // TODO this endpoint does not return json which breaks our
    // request handler
    return request(`${config.API_ACCOUNTS}/users/${ZUID}?updatePassword=true`, {
      method: 'PUT',
      json: true,
      body: {
        password: newPassword
      }
    })

    // TODO should we log user out after password reset?

    // TODO this won't work because it does not account for 2FA login flows
    // we need to figure out another way to validate the old password
    // return request(`${config.API_AUTH}/login`, {
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
