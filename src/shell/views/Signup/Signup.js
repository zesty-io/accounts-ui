import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import cx from 'classnames'
import qs from 'qs'

import styles from './Signup.less'

import { request } from '../../../util/request'
import { login } from '../../store/auth'

import { Input } from '@zesty-io/core/Input'
import { AppLink } from '@zesty-io/core/AppLink'
import { Button } from '@zesty-io/core/Button'
import { Url } from '@zesty-io/core/Url'

class Signup extends Component {
  constructor(props) {
    super()
    this.state = {
      message: '',
      submitted: false,
      email: '',
      firstName: '',
      lastName: '',
      'new-password': '',
      eula: false
    }
  }
  componentDidMount() {
    const invite = qs.parse(window.location.search.substr(1))
    if (invite.email) {
      this.setState({ email: invite.email })
    }
    if (invite) {
      this.props.dispatch({
        type: 'USER_INVITED',
        invite: {
          email: invite.email,
          invited: invite.invited
        }
      })
    }
  }
  render() {
    document.title = 'Accounts: Create an Account'
    return (
      <section className={cx(styles.Signup, styles.bodyText)}>
        <div className={styles.FormWrapper}>
          <header className={styles.Logo}>
            <Url href="https://zesty.io" title="https://zesty.io">
              <img
                alt="Zesty.io Logo"
                src="https://brand.zesty.io/zesty-io-logo-vertical.png"
                height="140px"
              />
            </Url>
          </header>
          <main>
            <form
              name="signup"
              className={styles.SignupForm}
              onSubmit={this.handleSignup}>
              <label>
                <p>Email Address</p>
                <Input
                  required
                  autoFocus
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="e.g. hello@zesty.io"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <p>First Name</p>
                <Input
                  required
                  className={styles.input}
                  type="text"
                  name="firstName"
                  placeholder="Zesty"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <p>Last Name</p>
                <Input
                  required
                  className={styles.input}
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <p>Password</p>
                <small>
                  Minimum 8 characters. At least one number. A combination of
                  lower and uppercase letters.
                </small>
                <Input
                  required
                  className={styles.input}
                  type="password"
                  name="new-password"
                  autoComplete="new-password"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[?=.*[a-zA-Z0-9!@#$%^&()<>.,:;[\]{}\-_.+,/]{8,}$"
                  value={this.state['new-password']}
                  onChange={this.handleChange}
                />
              </label>
              <label className={styles.eula}>
                <Input
                  required
                  className={styles.checkbox}
                  type="checkbox"
                  name="eula"
                  value={this.state.eula}
                  onChange={this.handleChange}
                />
                <span>
                  I have read and agree to the{' '}
                  <Url
                    href="https://www.zesty.io/en-us/about/end-user-license-agreement/"
                    target="_blank">
                    <abbr title="End User License Agreement">EULA</abbr>
                  </Url>
                </span>
              </label>

              <div className={styles.Actions}>
                <Button
                  type="submit"
                  name="submit"
                  disabled={this.state.submitted}>
                  {this.state.submitted ? (
                    <React.Fragment>
                      <i className="fas fa-hourglass" aria-hidden="true" />
                      &nbsp;Creating Your Account
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <i className="fas fa-plus" aria-hidden="true" />
                      &nbsp;Create Your Zesty.io Account
                    </React.Fragment>
                  )}
                </Button>
              </div>
              <p className={styles.divider}>
                <span className={styles.text}>or</span>
              </p>
              <a href={`${CONFIG.API_AUTH}/azure/login`}>
                <img
                  src="/ms-symbollockup_signin_light.svg"
                  height="41px"
                  width="215px"
                  alt="Microsoft Single Sign On"
                />
              </a>

              {this.state.message ? (
                <p className={styles.error}>
                  <i
                    className="fa fa-exclamation-triangle"
                    aria-hidden="true"
                  />
                  &nbsp;{this.state.message}
                </p>
              ) : null}
            </form>
          </main>
          <footer className={styles.Login}>
            <p>Already have an account?</p>
            <AppLink to="/login">Sign In</AppLink>
          </footer>
        </div>
      </section>
    )
  }
  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleSignup = evt => {
    evt.preventDefault()

    this.setState({
      submitted: true
    })

    request(`${CONFIG.API_ACCOUNTS}/users`, {
      method: 'POST',
      json: true,
      body: {
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state['new-password']
      }
    })
      .then(json => {
        // this is in place of a code === 201,
        // server only returns an error, no code
        if (!json.error) {
          // run GA call
          gtag('event', 'button', {
            event_category: 'account-creation',
            event_label: 'new user: ' + this.state.email
          })

          gtag('event', 'conversion', {
            send_to: 'AW-955374362/ivZJCMeG3JoBEJq2x8cD'
          })

          // log the new user in to get a valid session
          // send the user to the confirm email page
          // once validated user will automatically get into the app
          this.props
            .dispatch(login(this.state.email, this.state['new-password']))
            .then(() => {
              this.props.history.push('/instances')
            })
        } else {
          this.setState({
            submitted: false,
            message: json.data.error
          })
        }
      })
      .catch(err => {
        console.error(err)
        this.setState({
          submitted: false,
          message: 'There was a problem creating your account'
        })
      })
  }
}

export default withRouter(connect()(Signup))
