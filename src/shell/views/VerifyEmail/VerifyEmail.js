import React, { Component } from 'react'

import AppLink from '../../../core/AppLink'

import styles from './VerifyEmail.less'
export default class VerifyEmail extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <section className={styles.VerifyEmail}>
        <main className={styles.aligner}>
          <h1>
            Check your email&nbsp;
            <i className="fa fa-envelope-o" aria-hidden="true" />
          </h1>
          <p>
            We have sent a verification email to the email address you signed up
            with. This is done for account security to ensure you are the owner
            of the email address. Once you have verified your email return here
            to begin using Zesty.io
          </p>
          <small>
            If you do not receive a verification email, make sure to check your
            spam folder. You can also{' '}
            <AppLink to="/resend-email">re-send the email</AppLink>
          </small>

          <AppLink className={styles.Continue} to="/instances">
            Continue to Zesty.io&nbsp;
            <i className="fa fa-arrow-right" aria-hidden="true" />
          </AppLink>
        </main>
      </section>
    )
  }
}
