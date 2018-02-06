import React, { Component } from 'react'
import {connect} from 'react-redux'

import styles from './Login.less'

import {request} from '../../../util/request'

class Login extends Component {
  constructor (props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }
  render () {
    return (
      <section className={styles.Login}>
        <form name='login' className={styles.LoginForm}>
          <h2>Zesty.io</h2>
          <label>
            <input name='email' className={styles.input} type='email' />
          </label>
          <label>
            <input name='pass' className={styles.input} type='password' />
          </label>
          <button onClick={this.handleLogin}>Login</button>
        </form>
      </section>
    )
  }
  handleLogin (evt) {
    evt.preventDefault()
    request('http://svc.zesty.localdev:3011/login', {
      body: {
        email: document.forms.login.email.value,
        password: document.forms.login.pass.value
      }
    })
    .then(json => {
      // TODO
      this.props.dispatch({
        type: 'AUTHENTICATED',
        auth: true
      })

      if (json.code === 200) {
        // TODO set logged in state
        // this.props.dispatch()
      } else {
        // Display error message
      }
    })
  }
}
export default connect(state => state)(Login)
