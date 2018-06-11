import { Component } from 'react'
import cx from 'classnames'
import { notify } from '../../../../../../../shell/store/notifications'
import {
  resendVerificationEmail,
  deleteUserEmail,
  addEmail
} from '../../../../store'

import styles from './Email.less'

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
    if (props.emails) {
    }
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
          {/* {this.props.user.verifiedEmails.map((email, i) => {
              return (
                <div className={styles.Email} key={i}>
                  <i
                    className={cx(styles.verified, 'fa fa-check-square-o')}
                    aria-hidden="true"
                    title="This email is verified"
                  />
                  <span>{email}</span>
                  {this.props.user.email === email ? (
                    <strong className={styles.primary}>(Primary)</strong>
                  ) : null}
                </div>
              )
            })} */}
          {this.state.emails.length &&
            this.state.emails.map((email, i) => {
              return (
                <div className={styles.Email} key={i}>
                  <i
                    className="fa fa-calendar-check-o"
                    aria-hidden="true"
                    title="This email is waiting to be verified"
                  />
                  <span>{email.address}</span>
                  {this.props.user.email === email.address ? (
                    <strong className={styles.primary}>(Primary)</strong>
                  ) : null}
                </div>
              )
            })}
          <article className={styles.addEmail}>
            <label>name</label>
            <Input
              type="text"
              name="name"
              placeholder="backup email"
              onChange={this.handleChange}
            />
            <label>email</label>
            <Input
              type="text"
              name="email"
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
            Add Email
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
}

export default Email
