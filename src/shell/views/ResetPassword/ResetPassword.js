import React, { Component } from 'react'
import {connect} from 'react-redux'

import styles from './ResetPassword.less'
import {request} from '../../../util/request'

export default class ResetPassword extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <section className={styles.ResetPassword}>
        <form name='ResetPassword' className={styles.ResetPasswordForm}>

          <img src="/zesty-z-logo.svg" />
          <h2>Reset Password</h2>
          <label>
            <p>New Password</p>
            <Input className={styles.input} type="password" name='pass' />
          </label>
          <label>
            <p>Confirm New Password</p>
            <Input className={styles.input} type="password" name='pass' />
          </label>
          <Button onClick={this.handleSignup}>Reset Password</Button>
          <Url href="/login">Return to Login</Url>
        </form>
      </section>
    )
  }
}
