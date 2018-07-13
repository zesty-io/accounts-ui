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
      <Card>
        <CardHeader>
          <h1>Email</h1>
        </CardHeader>
        <CardContent className={styles.Email}>
          <p>
            Setting up multiple emails lets you accept invitations from your
            verified addresses.
          </p>
          {this.props.user.verifiedEmails.map((email, i) => {
            if (email === this.props.user.email) {
              return (
                <div className={styles.Email} key={i}>
                  <i
                    className={cx(styles.verified, 'fa fa-check-square-o')}
                    aria-hidden="true"
                    title="This email is verified"
                  />
                  <span>{email}</span>
                  <strong className={styles.primary}>(Primary)</strong>
                </div>
              )
            }
          })}
          {this.state.emails &&
            this.state.emails
              .filter(eml => eml.address !== this.props.user.email)
              .map((email, i) => {
                return (
                  <div className={styles.Email} key={i}>
                    <i
                      className={
                        email.responseReceived
                          ? cx(styles.verified, 'fa fa-check-square-o')
                          : cx(styles.verify, 'fa fa-chain-broken')
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
                      <strong className={styles.primary}>(Primary)</strong>
                    ) : (
                      <p>{email.name}</p>
                    )}
                    {this.props.user.email !== email.address && (
                      <i
                        className={`fa fa-close ${styles.delete}`}
                        onClick={() => this.handleRemove(email.address)}
                      />
                    )}
                  </div>
                )
              })}
          <article className={styles.addEmail}>
            <label>Name: </label>
            <Input
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              placeholder="backup email"
              onChange={this.handleChange}
            />
            <label>Email: </label>
            <Input
              type="text"
              autoComplete="off"
              name="email"
              value={this.state.email}
              placeholder="email@acme-corp.com"
              onChange={this.handleChange}
            />
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
    return this.props.dispatch(deleteUserEmail(email)).then(data => {
      this.props.dispatch(fetchUserEmails())
    })
  }

  sendVerifyEmail = email => {
    this.props.dispatch(resendVerificationEmail(email))
    this.props.dispatch(
      notify({
        message: 'Verification email re-sent',
        type: 'success'
      })
    )
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
        .then(data => {
          this.props.dispatch(fetchUserEmails())
          return this.setState({
            submitted: false,
            name: '',
            email: ''
          })
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
