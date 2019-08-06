import { Component } from 'react'
import cx from 'classnames'
import { notify } from '../../../../../../../shell/store/notifications'
import {
  resendVerificationEmail,
  deleteUserEmail,
  addEmail
} from '../../../../store'

import styles from './Email.less'
import { fetchUserEmails } from '../../../../../../../shell/store/user'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { Input } from '@zesty-io/core/Input'
import { Button } from '@zesty-io/core/Button'

class Email extends Component {
  constructor(props) {
    super()
    this.state = {
      submitted: false,
      email: '',
      name: '',
      emails: []
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.emails && props.emails.length !== state.emails.length) {
      return { ...state, emails: props.emails }
    } else {
      return null
    }
  }
  render() {
    return (
      <Card className={styles.Email}>
        <CardHeader>
          <h1>Email</h1>
        </CardHeader>
        <CardContent>
          <p>
            Setting up multiple emails lets you accept invitations from your
            verified addresses.
          </p>
          {this.props.user.verifiedEmails.map((email, i) => {
            if (email === this.props.user.email) {
              return (
                <div className={styles.EmailAddress} key={i}>
                  <i
                    className={cx(styles.verified, 'fas fa-check-square')}
                    aria-hidden="true"
                    title="This email is verified"
                  />
                  <span>{email}</span>
                  <strong className={styles.primary}>
                    <i className="fas fa-crown"></i>&nbsp;Primary
                  </strong>
                </div>
              )
            }
          })}
          {this.state.emails &&
            this.state.emails
              .filter(eml => eml.address !== this.props.user.email)
              .map((email, i) => {
                return (
                  <div className={styles.EmailAddress} key={i}>
                    <i
                      className={
                        email.responseReceived
                          ? cx(styles.verified, 'fas fa-check-square')
                          : cx(styles.verify, 'fas fa-unlink')
                      }
                      onClick={() => {
                        if (!email.responseReceived) {
                          this.sendVerifyEmail(email.address)
                        }
                      }}
                      aria-hidden="true"
                      title={
                        email.responseReceived
                          ? 'This email is verified'
                          : 'Click to re-send verification email'
                      }
                    />
                    <span>{email.address}</span>
                    {this.props.user.email === email.address ? (
                      <strong className={styles.primary}>
                        <i className="fas fa-crown"></i>&nbsp;Primary
                      </strong>
                    ) : (
                      <p>{email.name}</p>
                    )}
                    {this.props.user.email !== email.address && (
                      <Button
                        kind="warn"
                        className={styles.delete}
                        onClick={() => this.handleRemove(email.address)}>
                        <i className="fas fa-trash" />
                      </Button>
                    )}
                  </div>
                )
              })}
          <article className={styles.addEmail}>
            <label>
              Email
              <Input
                type="text"
                autoComplete="off"
                name="email"
                value={this.state.email}
                placeholder="e.g. email@acme-corp.com"
                onChange={this.handleChange}
              />
            </label>

            <label>
              Name
              <Input
                type="text"
                autoComplete="off"
                name="name"
                value={this.state.name}
                placeholder="e.g. backup email"
                onChange={this.handleChange}
              />
            </label>
          </article>
        </CardContent>
        <CardFooter>
          <Button
            className={styles.button}
            disabled={this.state.submitted}
            onClick={this.handleAddEmail}>
            <i className="fa fa-plus" aria-hidden="true" />
            Add Email Address
          </Button>
        </CardFooter>
      </Card>
    )
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleRemove = email => {
    return this.props
      .dispatch(deleteUserEmail(email))
      .then(() => {
        this.props.dispatch(fetchUserEmails()).catch(err => {
          this.props.dispatch(
            notify({
              message: `Error fetching emails`,
              type: 'error'
            })
          )
        })
        this.props.dispatch(
          notify({
            type: 'success',
            message: 'email successfully removed'
          })
        )
      })
      .catch(() => {
        this.props.dispatch(
          notify({
            type: 'error',
            message: 'Error removing email'
          })
        )
      })

      .then(data => {})
  }

  sendVerifyEmail = email => {
    this.props
      .dispatch(resendVerificationEmail(email))
      .then(() =>
        this.props.dispatch(
          notify({
            message: 'Verification email re-sent',
            type: 'success'
          })
        )
      )
      .catch(err => {
        this.props.dispatch(
          notify({
            message: 'There was a problem re-sending the verification email.',
            type: 'error'
          })
        )
      })
  }

  handleAddEmail = evt => {
    if (
      this.state.email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,3}$/g)
    ) {
      this.setState({
        submitted: true
      })
      this.props
        .dispatch(addEmail(this.state.name, this.state.email))
        .then(() => {
          this.props.dispatch(fetchUserEmails()).catch(err => {
            this.props.dispatch(
              notify({
                message: `Error fetching emails`,
                type: 'error'
              })
            )
          })
          this.setState({
            submitted: false,
            name: '',
            email: ''
          })
          dispatch(
            notify({
              message: 'Email added',
              type: 'success'
            })
          )
        })
        .catch(err => {
          this.setState({ submitted: false })
          this.props.dispatch(notify({ message: err.error, type: 'error' }))
        })
    } else {
      this.props.dispatch(
        notify({
          message: 'Please submit a valid email',
          type: 'error'
        })
      )
    }
  }
}

export default Email
