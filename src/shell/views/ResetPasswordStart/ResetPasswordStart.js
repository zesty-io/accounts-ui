import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './ResetPasswordStart.less'
import { request } from '../../../util/request'

export default class ResetPasswordStart extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <section className={styles.ResetPasswordStart}>
        <form
          name="ResetPasswordStart"
          className={styles.ResetPasswordStartForm}
        >
          <img src="/zesty-z-logo.svg" />
          <label>
            <p>
              Enter the email for the account you need to reset your password
              for and we will send an email with instructions for resetting your
              password.
            </p>
            <Input className={styles.input} type="email" name="email" />
          </label>
          <Button onClick={this.handleSignup}>Send Password Reset Email</Button>
          <Url href="/login">Return to Login</Url>
        </form>
      </section>
    )
  }
}
