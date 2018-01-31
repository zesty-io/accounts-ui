import React, { Component } from 'react'
import styles from './Login.less'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }
  render() {
    return (
      <section className={styles.Login}>
        <form className={styles.LoginForm}>
          <h2>Zesty.io</h2>
          <label>
            <input className={styles.input} type="email" />
          </label>
          <label>
            <input className={styles.input} type="password" />
          </label>
          <button onClick={this.handleLogin}>Login</button>
        </form>
      </section>
    )
  }
  handleLogin() {
    // TODO make auth service request
  }
}
