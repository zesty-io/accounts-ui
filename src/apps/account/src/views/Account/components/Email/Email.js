import { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { notify } from '../../../../../../../shell/store/notifications'
import { addEmail } from '../../../../store'

import styles from './Email.less'

class Email extends Component {
  constructor(props) {
    super()
    this.state = {
      submitted: false,
      email: ''
    }
  }

  handleChange = evt => {
    this.setState({
      email: evt.target.value
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
        .dispatch(addEmail(this.props.user.ZUID, this.state.email))
        .then(() => {
          this.setState({
            submitted: false
          })
          this.props.dispatch(
            notify({
              message: 'Email added',
              type: 'success'
            })
          )
        })
        .catch(err => {
          this.props.dispatch(
            notify({
              message: `Problem adding email: ${error}`,
              type: 'error'
            })
          )
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
          {this.props.user.verifiedEmails.map((email, i) => {
            return (
              <article className={styles.Email} key={i}>
                <i
                  className={cx(styles.verified, 'fa fa-check-square-o')}
                  aria-hidden="true"
                  title="This email is verified"
                />
                <span>{email}</span>
                {this.props.user.email === email ? (
                  <strong className={styles.primary}>(Primary)</strong>
                ) : null}
              </article>
            )
          })}
          {this.props.user.unverifiedEmails.map((email, i) => {
            return (
              <article className={styles.Email} key={i}>
                <i
                  className="fa fa-calendar-check-o"
                  aria-hidden="true"
                  title="This email is waiting to be verified"
                />
                <span>{email}</span>
                {this.props.user.email === email ? (
                  <strong className={styles.primary}>(Primary)</strong>
                ) : null}
              </article>
            )
          })}
          <Input
            type="text"
            placeholder="email@domain.com"
            className={styles.field}
            onChange={this.handleChange}
          />
        </main>
        <footer>
          <Button
            className={styles.button}
            disabled={this.state.submitted}
            onClick={this.handleAddEmail}>
            <i className="fa fa-plus" aria-hidden="true" />
            Add Email
          </Button>
        </footer>
      </article>
    )
  }
}

export default connect(state => {
  return { user: state.user }
})(Email)
