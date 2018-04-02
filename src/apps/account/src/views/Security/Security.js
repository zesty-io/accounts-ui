import React, { Component } from 'react'
import { connect } from 'react-redux'

import Password from './Password'
import TwoFactor from './TwoFactor'

import styles from './Security.less'

class Security extends Component {
  render() {
    return (
      <div className={styles.Security}>
        <h1>Security</h1>
        <Password />
        <h1>Two-factor authentication</h1>
        <TwoFactor />
      </div>
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
