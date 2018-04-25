import config from '../../../../shell/config'
import { request } from '../../../../util/request'

export function addEmail(userZUID, email) {
  return (dispatch, getState) => {
    // dispatch({
    //   type: 'ADDING_EMAIL'
    // })

    let state = getState()
    state.user.unverifiedEmails.push(email)

    return request(`${config.API_ACCOUNTS}/users/${userZUID}`, {
      method: 'PUT',
      json: true,
      body: {
        unverifiedEmails: state.user.unverifiedEmails.join(',')
      }
    })
    // .then(() => {
    //   dispatch({
    //     type: 'ADD_EMAIL_SUCCESS'
    //   })
    // })
    // .catch(err => {
    //   dispatch({
    //     type: 'ADD_EMAIL_FAILURE',
    //     error: err
    //   })
    // })
  }
}
