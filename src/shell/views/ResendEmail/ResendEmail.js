import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import { request } from '../../../util/request'

import { ButtonGroup } from '@zesty-io/core/ButtonGroup'
import { Input } from '@zesty-io/core/Input'
import { Button } from '@zesty-io/core/Button'

import styles from './ResendEmail.less'
export default class ResendEmail extends Component {
  state = {
    email: '',
    submitted: false,
    error: '',
    success: ''
  }
  render() {
    return (
      <section className={cx(styles.VerifyEmail, styles.bodyText)}>
        <div className={styles.Wrapper}>
          <header></header>
          <main>
            <form name="VerifyEmail" className={styles.VerifyEmailForm}>
              <h1 className={styles.display}>Re-Send Email Verification</h1>
              <p className={styles.message}>
                Don't forget to check your spam folder for you verification
                email, sometimes they get lost there.
              </p>
              <section className={styles.ResendAction}>
                <Input
                  name="email"
                  placeholder="email@acme.com"
                  onChange={this.handleChange}
                  value={this.state.email}
                  className={styles.input}
                />

                {this.state.error ? (
                  <em className={styles.error}>
                    <i className="fa fa-exclamation-triangle" />
                    {this.state.error}
                  </em>
                ) : null}
                {this.state.success ? (
                  <em className={styles.success}>{this.state.success}</em>
                ) : null}

                <ButtonGroup className={styles.controls}>
                  <Button
                    onClick={this.handleClick}
                    className={styles.button}
                    disabled={this.state.submitted}>
                    <i className="fas fa-paper-plane"></i>
                    Re-Send Verification Email
                  </Button>

                  <Link to="/login">
                    <i className="fa fa-ban" aria-hidden="true" />
                    &nbsp;Cancel
                  </Link>
                </ButtonGroup>
              </section>

              <Route
                path="/resend-email/expired"
                render={() => {
                  return (
                    <em className={styles.Expired}>
                      Your email verification has expired, please re-send.
                    </em>
                  )
                }}
              />
            </form>
          </main>
          {/* <footer className={styles.Login}>
            <p>Already have an account?</p>
            <AppLink to="/login">Sign In</AppLink>
          </footer> */}
        </div>
      </section>
    )
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleClick = evt => {
    evt.preventDefault()

    if (!this.state.email.includes('@')) {
      this.setState({
        error: 'You must provide a valid email address'
      })
      return
    }

    this.setState({
      submitted: true,
      error: ''
    })

    request(
      `${
        CONFIG.API_ACCOUNTS
      }/users/emails/verifications?address=${encodeURIComponent(
        this.state.email
      )}`,
      {
        method: 'POST'
      }
    )
      .then(data => {
        if (!data.error) {
          this.setState({
            submitted: false,
            success: `A verification link has been sent to ${this.state.email}`,
            error: ''
          })
        } else {
          this.setState({
            submitted: false,
            success: '',
            error:
              'There was a problem sending a verification link to the email address you provided'
          })
        }
      })
      .catch(err => {
        this.setState({
          submitted: false,
          error: err.error || 'Failed to re-send verification email',
          success: ''
        })
      })
  }
}
