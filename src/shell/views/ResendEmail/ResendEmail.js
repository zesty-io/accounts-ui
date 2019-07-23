import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { request } from '../../../util/request'

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
      <section className={styles.VerifyEmail}>
        <form name="VerifyEmail" className={styles.VerifyEmailForm}>
          <h1>Re-Send Email Verification</h1>
          <p className={styles.message}>
            Don't forget to check your spam folder for you verification email,
            sometimes they get lost there.
          </p>
          <section className={styles.ResendAction}>
            <Input
              name="email"
              placeholder="email@acme.com"
              onChange={this.handleChange}
              value={this.state.email}
              className={styles.input}
            />
            <Button
              onClick={this.handleClick}
              className={styles.button}
              disabled={this.state.submitted}>
              <i className="fa fa-envelope-o" aria-hidden="true" />
              Send Verification
            </Button>
          </section>

          {this.state.error ? (
            <em className={styles.error}>
              <i className="fa fa-exclamation-triangle" />
              {this.state.error}
            </em>
          ) : null}
          {this.state.success ? (
            <em className={styles.success}>{this.state.success}</em>
          ) : null}

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
