import React, { Component } from 'react'
import styles from './Login.less'

export default class Login extends Component {
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

    let email = document.forms.login.email.value
    let password = document.forms.login.pass.value

    let form = new FormData()
    form.append('email', email)
    form.append('password', password)

    fetch('http://auth-svc.zesty.localdev:3011/login', {
      method: 'POST',
      // credentials: 'include',
      mode: 'no-cors',
      body: form
    })
    .then(res => res.json())
    .then(json => {
      console.log('login', json)
      switch (json.code) {
        case 200:
          console.log('success')
          break

        case 202:
          console.log('2FA. Start polling')
          break

        case 400:
        case 401:
        case 404:
        case 500:
          console.log('Error')
          break

        default:
          console.log('Unknown error')
      }
    })
    .catch(err => console.log(err))
  }
}
