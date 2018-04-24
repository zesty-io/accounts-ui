import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { notify } from '../../../../../../../shell/store/notifications'
import {
  updateProfile,
  addEmail,
  fetchUser
} from '../../../../../../../shell/store/user'

import styles from './Email.less'

class Email extends Component {
  constructor(props) {
    super()
    this.state = {
      submitted: false
    }
  }
  handleChange = evt => {
    if (evt.target.value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/g)) {
      // this does not allow caps
      return this.props.dispatch(
        updateProfile({ [evt.target.name]: evt.target.value })
      )
    } else {
      return null
    }
  }

  handleClick = e => {
    if (this.props.newEmail.length) {
      this.setState({ submitted: !this.state.submitted })
      this.props.dispatch(addEmail()).then(data => {
        this.setState({ submitted: !this.state.submitted })
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

  render() {
    return (
      <article className={styles.EmailSettings}>
        <header>
          <h2>Email</h2>
        </header>
        <main>
          <p>
            Setting up multiple emails lets you accept all of your account
            invitations in one place.
          </p>
          {this.props.verifiedEmails.map((email, i) => {
            return (
              <article className={styles.Email} key={i}>
                <i
                  className={cx(styles.verified, 'fa fa-check-square-o')}
                  aria-hidden="true"
                  title="This email is verified"
                />
                <span>{email}</span>
                {this.props.email === email ? (
                  <strong className={styles.primary}>(Primary)</strong>
                ) : null}
              </article>
            )
          })}
          {this.props.unverifiedEmails.map((email, i) => {
            return (
              <article className={styles.Email} key={i}>
                <i
                  className="fa fa-calendar-check-o"
                  aria-hidden="true"
                  title="This email is waiting to be verified"
                />
                <span>{email}</span>
                {this.props.email === email ? (
                  <strong className={styles.primary}>(Primary)</strong>
                ) : null}
              </article>
            )
          })}
          <Input
            type="text"
            placeholder="email@domain.com"
            name="newEmail"
            className={styles.field}
            required
            onChange={this.handleChange}
          />
        </main>
        <footer>
          <Button
            onClick={this.handleClick}
            className={styles.button}
            disabled={this.state.submitted}
          >
            <i className="fa fa-plus" aria-hidden="true" />
            Add Email
          </Button>
        </footer>
      </article>
    )
  }
}

const mapStateToProps = state => {
  return {
    email: state.user.email,
    unverifiedEmails: state.user.unverifiedEmails
      ? state.user.unverifiedEmails.split(',')
      : [],
    verifiedEmails: state.user.verifiedEmails
      ? state.user.verifiedEmails.split(',')
      : [],
    newEmail: state.user.newEmail || '',
    ...state
  }
}

export default connect(mapStateToProps)(Email)
