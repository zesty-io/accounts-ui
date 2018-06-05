import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from 'qs'

import styles from './Signup.less'

import { request } from '../../../util/request'
import { login } from '../../store/auth'

class Signup extends Component {
  constructor(props) {
    super()
    this.state = {
      message: '',
      submitted: false,
      email: '',
      firstName: '',
      lastName: '',
      pass: '',
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
    return (
      <section className={styles.Signup}>
        <form
          name="signup"
          className={styles.SignupForm}
          onSubmit={this.handleSignup}
        >
          <Url href="https://zesty.io" title="https://zesty.io">
            <img src="/zesty-io-logo.svg" height="70px" />
          </Url>

          <label>
            <p>Email Address</p>
            <Input
              className={styles.input}
              type="email"
              placeholder="e.g. hello@zesty.io"
              required
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <p>First Name</p>
            <Input
              className={styles.input}
              type="text"
              placeholder="Zesty"
              required
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <p>Last Name</p>
            <Input
              className={styles.input}
              type="text"
              placeholder=""
              required
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <p>Password</p>
            <small>
              Minimum 8 characters with at least one number, uppercase and
              lowercase letter.
            </small>
            <Input
              className={styles.input}
              type="password"
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[?=.*[a-zA-Z0-9!@#$%^&()<>.,:;[\]{}\-_.+,/]{8,}$"
              name="pass"
              value={this.state.pass}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <Input
              type="checkbox"
              required
              className={styles.checkbox}
              name="eula"
              checked={this.state.eula}
              onChange={this.handleChange}
            />
            <span>
              I have read and agree to the{' '}
              <Url
                href="https://www.zesty.io/en-us/about/end-user-license-agreement/"
                target="_blank"
              >
                End User License Agreement
              </Url>
            </span>
          </label>
          <Button type="submit" disabled={this.state.submitted}>
            {this.state.submitted ? (
              <React.Fragment>
                <i className="fa fa-hourglass-o" aria-hidden="true" />&nbsp;Creating
                Your Account
              </React.Fragment>
            ) : (
              <React.Fragment>
                <i className="fa fa-plus" aria-hidden="true" />
                &nbsp;Create Your Account
              </React.Fragment>
            )}
          </Button>
          <small>
            <AppLink to="/login">Already have an account?</AppLink>
          </small>

          {this.state.message ? (
            <p className={styles.error}>
              <i className="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;{
                this.state.message
              }
            </p>
          ) : null}
        </form>
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
        password: this.state.pass
      }
    })
      .then(json => {
        // this is in place of a code === 201,
        // server only returns an error, no code
        if (!json.error) {
          // Log user in after signing up
          this.props
            .dispatch(login(this.state.email, this.state.pass))
            .then(json => {
              if (!json.error) {
                this.props.history.push('/')
              } else {
                // if the user was created but login failed
                // send them to the login view
                this.setState({
                  mesage: 'There was a problem logging you in'
                })
                this.props.history.push('/login')
              }
            })
            .catch(err => {
              console.error(err)
              notify({
                message: 'There was a problem logging in',
                type: 'error'
              })
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
