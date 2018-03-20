import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './ResetPasswordEnd.less'
import { request } from '../../../util/request'

export default class ResetPasswordEnd extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <section className={styles.ResetPasswordEnd}>
        <form name="ResetPasswordEnd" className={styles.ResetPasswordEndForm}>
          <img src="/zesty-io-logo.svg" />
          <h2>Enter New Password</h2>
          <label>
            <p>New Password</p>
            <Input className={styles.input} type="password" name="pass" />
          </label>
          <label>
            <p>Confirm New Password</p>
            <Input className={styles.input} type="password" name="pass" />
          </label>
          <Button onClick={this.handleSignup}>Reset Password</Button>
        </form>
      </section>
    )
  }
}
