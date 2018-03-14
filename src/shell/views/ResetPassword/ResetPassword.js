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
          <h2>Zesty.io ResetPassword</h2>
          <label>
            <p>New Password</p>
            <input name='pass' className={styles.input} type='password' />
          </label>
          <label>
            <p>Confirm New Password</p>
            <input name='pass' className={styles.input} type='password' />
          </label>
          <Button onClick={this.handleSignup}>Reset Password</Button>
        </form>
      </section>
    )
  }
}
