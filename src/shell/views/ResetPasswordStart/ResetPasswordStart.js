import React, { Component } from 'react'
import cx from 'classnames'

import styles from './ResetPasswordStart.less'
import { request } from '../../../util/request'

import { AppLink } from '@zesty-io/core/AppLink'
import { Button } from '@zesty-io/core/Button'
import { Input } from '@zesty-io/core/Input'

export default class ResetPasswordStart extends Component {
  state = {
    error: false,
    message: '',
    submitted: false
  }
  render() {
    return (
      <section className={cx(styles.ResetPasswordStart, styles.bodyText)}>
        <div className={styles.Wrapper}>
          <header className={styles.Logo}>
            <img
              src="https://brand.zesty.io/zesty-io-logo-vertical.png"
              alt="Zesty.io Logo"
            />
          </header>
          <main>
            <form
              name="ResetPasswordStart"
              onSubmit={this.handleReset}
              className={styles.ResetPasswordStartForm}>
              <p>
                Enter the email associated with your account and we will send an
                email with instructions for resetting your password.
              </p>
              <label>
                <i className="far fa-envelope"></i>
                <Input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="Enter your account email"
                />
              </label>

              {this.state.message ? (
                this.state.error ? (
                  <p className={styles.error}>
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    />
                    &nbsp;{this.state.message}
                  </p>
                ) : (
                  <p className={styles.success}>
                    <i className="fa fa-info-circle" aria-hidden="true" />
                    &nbsp;{this.state.message}
                  </p>
                )
              ) : null}

              <Button type="submit" disabled={this.state.submitted}>
                <i className="fas fa-paper-plane"></i>
                {this.state.submitted
                  ? 'Sending Reset Request'
                  : 'Send Password Reset Email'}
              </Button>
            </form>
          </main>
          <footer>
            <AppLink to="/login">Return to Sign In?</AppLink>
          </footer>
        </div>
      </section>
    )
  }

  handleReset = evt => {
    evt.preventDefault()
    const address = evt.target.email.value
    this.setState({ submitted: true })
    return request(`${CONFIG.API_ACCOUNTS}/users/passwords/resets`, {
      method: 'POST',
      json: true,
      body: {
        address
      }
    })
      .then(() => {
        this.setState({
          message:
            'Check your email and follow the provided link to complete the reset process'
        })
      })
      .catch(() => {
        this.setState({
          error: true,
          message: 'There was a problem requesting a password reset'
        })
      })
      .finally(() => this.setState({ submitted: false }))
  }
}
