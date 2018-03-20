import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Signup.less'
import { request } from '../../../util/request'
import config from '../../../shell/config'

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }
  render() {
    return (
      <section className={styles.Signup}>
        <form name="signup" className={styles.SignupForm}>
          <img src="/zesty-io-logo.svg" />
          {this.state.message ? (
            <p className={styles.error}>
              <i className="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;{
                this.state.message
              }
            </p>
          ) : null}
          <label>
            <p>Email Address</p>
            <Input
              className={styles.input}
              type="text"
              placeholder="e.g. hello@zesty.io"
              name="email"
            />
          </label>
          <label>
            <p>First Name</p>
            <Input
              className={styles.input}
              type="text"
              placeholder="Zesty"
              name="firstName"
            />
          </label>
          <label>
            <p>Last Name</p>
            <Input
              className={styles.input}
              type="text"
              placeholder=""
              name="lastName"
            />
          </label>
          <label>
            <p>Password</p>
            <Input className={styles.input} type="password" name="pass" />
          </label>
          <Button onClick={this.handleSignup}>Create An Account</Button>
          <AppLink to="/login">Already have an account?</AppLink>
        </form>
      </section>
    )
  }
  handleSignup = evt => {
    evt.preventDefault()
    request(`http://${config.API_ACCOUNTS}/users`, {
      method: 'POST',
      json: true,
      body: {
        email: document.forms.signup.email.value,
        firstName: document.forms.signup.firstName.value,
        lastName: document.forms.signup.lastName.value,
        password: document.forms.signup.pass.value
      }
    })
      .then(json => {
        console.log('USER: ', json)
        if (json.code === 201) {
          // Log user in after signing up
          request(`http://${config.API_AUTH}/login`, {
            body: {
              email: document.forms.signup.email.value,
              password: document.forms.signup.pass.value
            }
          })
            .then(json => {
              if (json.code === 200) {
                this.props.dispatch({
                  type: 'FETCH_AUTH_SUCCESS',
                  zuid: json.meta.userZuid,
                  auth: true
                })
              } else {
                // if the user was created but login failed
                // send them to the login view
                window.location = '/login'
              }
            })
            .catch(err => {
              console.table(err)
            })
        } else {
          this.setState({
            message: json.data.error
          })
        }
      })
      .catch(err => {
        console.table(err)
      })
  }
}
