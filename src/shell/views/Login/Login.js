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
        <div className={styles.gridWrap} >
          <header>
            <img src="/zesty-z-logo.svg" />
          </header>
          <div className={styles.gridSingle} >
            <form name="login" className={styles.LoginForm}>

              <label>
                <p>Email Address</p>
                <Input className={styles.loginInput} type="text" placeholder="e.g. hello@zesty.io" name='email' />
              </label>
              <label>
                <p>Password</p>
                <Input className={styles.loginInput} type="password" name='pass' />
              </label>
              <Button onClick={e => this.handleLogin(e)}>Login</Button>
              <p>{this.state.message}</p>
            </form>

            <Url href="/reset-password">Forgot Password?</Url>
          </div>
          <div className={styles.gridSingle} >
            <div className={styles.createAccount} >
              <h2>Create an Account</h2>
              <p>Welcome to Zesty.io. Sign Up to start creating and managing content ready to be delivered securely, quickily and scalably to everywhere from anywhere.<br/></p>
              <Url href="/signup">Create Account</Url>
              <h3>Additional Information</h3>
              <p><Url href="https://zesty.io">Zesty.io</Url></p>
              <p><Url href="mailto:hello@zesty.io">hello@zesty.io</Url></p>
            </div>
          </div>
        </div>
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
        if (json.code === 200) {
          this.props.dispatch({
            type: 'FETCH_AUTH_SUCCESS',
            zuid: json.meta.userZuid,
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
