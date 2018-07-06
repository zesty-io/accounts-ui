import React, { Component } from 'react'

import styles from './ResetPasswordStart.less'
import { request } from '../../../util/request'

export default class ResetPasswordStart extends Component {
  state = {
    error: false,
    message: '',
    submitted: false
  }
  render() {
    return (
      <section className={styles.ResetPasswordStart}>
        <form
          name="ResetPasswordStart"
          onSubmit={this.handleReset}
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
          <Button type="submit" disabled={this.state.submitted}>
            <i className="fa fa-envelope-o" aria-hidden="true" />
            {this.state.submitted
              ? 'Sending Reset Request'
              : 'Send Password Reset Email'}
          </Button>
          <small>
            <AppLink to="/login">Return to Login?</AppLink>
          </small>

          {this.state.message ? (
            this.state.error ? (
              <p className={styles.error}>
                <i className="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;{
                  this.state.message
                }
              </p>
            ) : (
              <p>
                <i className="fa fa-info-circle" aria-hidden="true" />&nbsp;{
                  this.state.message
                }
              </p>
            )
          ) : null}
        </form>
      </section>
    )
  }
  //Request URL: https://svc.zesty.io/auth/password-reset-request?email=ggcadc%40gmail.com
  handleReset = evt => {
    evt.preventDefault()
    this.setState({ submitted: true })
    return request(
      `${CONFIG.API_ACCOUNTS}/users/password/reset?email=${
        evt.target.email.value
      }`
    )
      .then(data => {
        this.setState({
          message:
            'Check your email and follow the provided link to complete the reset process'
        })
      })
      .catch(err => {
        // set message to an error
        this.setState({
          error: true,
          message: 'There was a problem requesting a reset for your password'
        })
      })
      .finally(() => this.setState({ submitted: true }))
  }
}
