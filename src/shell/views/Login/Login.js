import React, { Component } from 'react'
import { connect } from 'react-redux'

import { request } from '../../../util/request'
import config from '../../config'

import styles from './Login.less'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: 'TEST'
    }
  }
  render() {
    return (
      <section className={styles.Login}>
        <form name="login" className={styles.LoginForm}>
          <img src="/zesty-z-logo.png" />
          <h2>Zesty.io</h2>
          <label>
            <p>Email Address</p>
            <input
              name="email"
              className={styles.input}
              type="email"
              placeholder="e.g. hello@zesty.io"
            />
          </label>
          <label>
            <p>Password</p>
            <input name="pass" className={styles.input} type="password" />
          </label>
          <Button onClick={e => this.handleLogin(e)}>Login</Button>
          <p>{this.state.message}</p>
        </form>

        <Url href="/reset-password">Reset Password</Url>
        <Url href="/signup">Create Account</Url>
      </section>
    )
  }
  handleLogin(evt) {
    evt.preventDefault()
    request(`http://${config.SERVICE_URL}:3011/login`, {
      body: {
        email: document.forms.login.email.value,
        password: document.forms.login.pass.value
      }
    })
      .then(json => {
        console.log('LOGIN JSON: ', json)

        if (json.code === 200) {
          this.props.dispatch({
            type: 'FETCH_AUTH_SUCCESS',
            zuid: json.meta.user_zuid,
            auth: true
          })
        } else if (json.code === 201) {
          // TODO Show 2FA screen
          // TODO poll auth api for 2FA one touch
          this.props.dispatch({
            type: 'FETCH_AUTH_SUCCESS',
            auth: false
          })
        } else {
          // TODO Display error message
          this.setState({
            message: json.message
          })
          this.props.dispatch({
            type: 'FETCH_AUTH_ERROR',
            auth: false
          })
        }
      })
      .catch(err => {
        console.error('LOGIN ERR', err)
      })
  }
}
export default connect(state => state)(Login)
