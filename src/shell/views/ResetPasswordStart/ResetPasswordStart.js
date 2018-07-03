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
          onSubmit={this.handleSignup}
          className={styles.ResetPasswordStartForm}>
          <img src="/zesty-io-logo.svg" />

          <label>
            <p>
              Enter the email associated with your account and we will send an
              email with instructions for resetting your password.
            </p>
            <Input
              className={styles.input}
              type="email"
              name="email"
              placeholder="Enter your account email"
            />
          </label>
          <Button type="submit">
            <i className="fa fa-envelope-o" aria-hidden="true" />
            Send Password Reset Email
          </Button>
          <small>
            <AppLink to="/login">Return to Login?</AppLink>
          </small>

          {this.state.message ? (
            <p className={styles.error}>
              <i className="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;{
                this.state.message
              }
            </p>
          ) : null}
        </form>
      </section>
    )
  }
  //Request URL: https://svc.zesty.io/auth/password-reset-request?email=ggcadc%40gmail.com
  handleSignup = evt => {
    evt.preventDefault()
    return console.log(evt.target.email.value)
    return request(
      `https://svc.zesty.io/auth/password-reset-request?email=${evt.target}`
    )
  }
}
// https://accounts.zesty.io/reset-password?email=ggcadc@gmail.com&code=264f9f7dfec70e8c48e334383545df4d89fb433c
