import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './ResetPasswordStart.less'
import { request } from '../../../util/request'

export default class ResetPasswordStart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }
  render() {
    return (
      <section className={styles.ResetPasswordStart}>
        <form
          name="ResetPasswordStart"
          className={styles.ResetPasswordStartForm}
        >
          <img src="/zesty-io-logo.svg" />
          {this.state.message ? (
            <p className={styles.error}>
              <i className="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;{
                this.state.message
              }
            </p>
          ) : null}
          <label>
            <p>
              Enter the email for associated with your account and we will send
              an email with instructions for resetting your password.
            </p>
            <Input className={styles.input} type="email" name="email" />
          </label>
          <Button onClick={this.handleSignup}>Send Password Reset Email</Button>
          <AppLink to="/login">Return to Login?</AppLink>
        </form>
      </section>
    )
  }
}
