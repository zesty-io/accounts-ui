import React, { Component } from 'react'
import { connect } from 'react-redux'

import Password from './Password'
import TwoFactor from './TwoFactor'

class Security extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Security</h1>
        <Password />
        <h1>Two-factor authentication</h1>
        <TwoFactor />
      </React.Fragment>
    )
  }
}

export default connect(state => {
  return {
    oldPassword: state.oldPassword,
    newPassword: state.newPassword,
    confirmNewPassword: state.confirmNewPassword,
    twofa: state.profile.twofa
  }
})(Security)
