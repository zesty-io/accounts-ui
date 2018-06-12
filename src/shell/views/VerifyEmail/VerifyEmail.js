import React, { Component } from 'react'
import styles from './VerifyEmail.less'
export default class VerifyEmail extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <section className={styles.VerifyEmail}>
          <h1>Check your email!</h1>
          <p>A verification email has been sent to the address you provided.</p>
          <p>
            Once your email has been verified you can log in and begin using
            Zesty.io
          </p>
          <small>
            (if you do not receive a verification email, check your spam folder.
            you can also <AppLink to="/resend-email">re-send the email</AppLink>)
          </small>
      </section>
    )
  }
}
