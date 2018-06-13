import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import qs from 'qs'

import styles from './Login.less'

import { request } from '../../../util/request'
import { login } from '../../store/auth'
import { fetchUser } from '../../store/user'

class Login extends Component {
  constructor(props) {
    super()
    this.state = {
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
  }
  render() {
    return (
      <section className={styles.LoginWrap}>
        <div className={styles.Login}>
          <header>
            <Url href="https://zesty.io" title="https://zesty.io">
              <img src="/zesty-io-logo.svg" height="70px" />
            </Url>
          </header>

          <main className={styles.gridSingle}>
            <form name="login" className={styles.LoginForm}>
              <label>
                <p>Email Address</p>
                <Input
                  tabIndex="1"
                  className={styles.loginInput}
                  type="text"
                  placeholder="e.g. hello@zesty.io"
                  name="email"
                  autoFocus
                />
              </label>
              <label>
                <p>
                  Password&nbsp;<small>
                    (<AppLink to="/reset-password" tabIndex="4">
                      Forgot?
                    </AppLink>)
                  </small>
                </p>

                <Input
                  tabIndex="2"
                  className={styles.loginInput}
                  type="password"
                  name="pass"
                />
              </label>
              <Button
                tabIndex="3"
                onClick={this.handleLogin}
                disabled={this.state.submitted}
              >
                {this.state.submitted ? (
                  <React.Fragment>
                    Logging You In&nbsp;
                    <i className="fa fa-hourglass-o" aria-hidden="true" />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    Log In&nbsp;<i
                      className="fa fa-sign-in"
                      aria-hidden="true"
                    />
                  </React.Fragment>
                )}
              </Button>
              {this.state.message ? (
                <p className={styles.error}>
                  <i
                    className="fa fa-exclamation-triangle"
                    aria-hidden="true"
                  />&nbsp;{this.state.message}
                </p>
              ) : null}
            </form>

            <div className={styles.createAccount}>
              <h3>Welcome to Zesty.io</h3>
              <p>
                Start creating content ready to be delivered securely, quickly
                and reliably to everywhere from anywhere.
              </p>
              <AppLink to="/signup" tabIndex="5">
                Create An Account
              </AppLink>
              {/* <h3>Additional Information</h3>
              <p>
                <Url href="https://zesty.io">https://zesty.io</Url>
              </p>
              <p>
                <Url href="mailto:hello@zesty.io">hello@zesty.io</Url>
              </p> */}
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
          this.props.history.push('/instances')
        } else if (json.code === 202) {
          this.props.history.push('/login/2fa')
        } else {
          this.setState({
            submitted: false,
            message: 'There was a problem logging you in'
          })
          this.props.dispatch({
            type: 'FETCH_AUTH_ERROR',
            auth: false
          })
        }
      })
      .catch(err => {
        console.error(err)
        this.setState({
          submitted: false,
          message: 'There was a problem logging you in'
        })
      })
  }
}

export default withRouter(connect(state => state)(Login))
