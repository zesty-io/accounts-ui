import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from 'qs'

import styles from './Login.less'

import { login } from '../../store/auth'

import { Input } from '@zesty-io/core/Input'
import { AppLink } from '@zesty-io/core/AppLink'
import { Button } from '@zesty-io/core/Button'
import { Url } from '@zesty-io/core/Url'

class Login extends Component {
  constructor(props) {
    super()
    this.state = {
      error: false,
      submitted: false,
      message: ''
    }
  }
  componentDidMount() {
    const invite = qs.parse(window.location.search.substr(1))
    if (invite.invited) {
      this.props.dispatch({
        type: 'USER_INVITED',
        invite: {
          email: invite.email,
          invited: invite.invited
        }
      })
    }
    // if a user has a valid session send them through to instances
    if (this.props.auth.valid) {
      this.props.history.push('/instances')
    }
  }
  render() {
    return (
      <section className={cx(styles.LoginWrap, styles.bodyText)}>
        <div className={styles.Login}>
          <header>
            <Url href="https://zesty.io" title="https://zesty.io">
              <img
                src="https://brand-assets.zesty.io/zesty-io-logo-vertical.svg"
                height="200px"
              />
            </Url>
          </header>

          <main className={styles.gridSingle}>
            <form name="login" className={styles.LoginForm}>
              <div className={styles.FormTitle}>
                <h1 className={styles.subheadline}>Sign In</h1>
                <AppLink
                  className={styles.bodyText}
                  to="/reset-password"
                  tabIndex="4">
                  Forgot password?
                </AppLink>
              </div>

              <label>
                <i className="far fa-envelope"></i>
                <Input
                  tabIndex="1"
                  className={styles.loginInput}
                  type="text"
                  placeholder="Email"
                  name="email"
                  required={true}
                  autoFocus
                />
              </label>
              <label>
                <i className="fas fa-key"></i>
                <Input
                  tabIndex="2"
                  className={styles.loginInput}
                  placeholder="Password"
                  type="password"
                  name="pass"
                  required={true}
                />
              </label>

              {this.state.message ? (
                <p
                  className={cx(
                    'error',
                    styles.message,
                    this.state.error ? styles.error : styles.success
                  )}>
                  {this.state.error ? (
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    />
                  ) : (
                    <i className="fa fa-check-circle-o" aria-hidden="true" />
                  )}
                  &nbsp;
                  {this.state.message}
                </p>
              ) : null}
              <div className={styles.loginButtonWrap}>
                <Button
                  tabIndex="3"
                  onClick={this.handleLogin}
                  disabled={this.state.submitted}>
                  {this.state.submitted ? (
                    <React.Fragment>
                      <i className="fas fa-spinner"></i>&nbsp;Signing In
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <i className="fas fa-sign-in-alt"></i>&nbsp;Sign In
                    </React.Fragment>
                  )}
                </Button>
              </div>
            </form>

            <div className={styles.createAccount}>
              <p>Don't have an account?</p>
              <AppLink to="/signup" tabIndex="5">
                Sign up for free
              </AppLink>
            </div>
          </main>
        </div>
      </section>
    )
  }

  handleLogin = evt => {
    evt.preventDefault()

    this.setState({
      submitted: true
    })

    this.props
      .dispatch(
        login(document.forms.login.email.value, document.forms.login.pass.value)
      )
      .then(json => {
        if (json.code === 200) {
          // handle workflow redirect
          const queryParams = qs.parse(window.location.search.substr(1))
          if (queryParams.redirect) {
            if (
              queryParams.redirect.split('.')[2] === 'zesty' ||
              queryParams.redirect.split('.')[2] === 'zestyio'
            ) {
              this.setState({
                error: false,
                submitted: false,
                message: 'Redirecting'
              })
              window.location = queryParams.redirect + window.location.hash
            } else {
              this.setState({
                error: true,
                submitted: false,
                message: 'The redirect provided is not allowed. Check your URL.'
              })
            }
          } else {
            this.props.history.push('/instances')
          }
        } else if (json.code === 202) {
          this.props.history.push('/login/2fa')
        } else {
          this.setState({
            error: true,
            submitted: false,
            message: 'There was a problem signing you in'
          })
          this.props.dispatch({
            type: 'FETCH_AUTH_ERROR',
            auth: false
          })
        }
      })
      .catch(err => {
        console.error(err)
        if (err === 403) {
          this.setState({
            error: true,
            submitted: false,
            message: 'Too many failed login attempts'
          })
        } else {
          this.setState({
            error: true,
            submitted: false,
            message: 'There was a problem signing you in'
          })
        }
      })
  }
}

export default withRouter(connect(state => state)(Login))
