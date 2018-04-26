import { Component } from 'React'
import { connect } from 'react-redux'
import { notify } from '../../../../../../../shell/store/notifications'
import { updatePassword } from '../../../../store'

import styles from './Password.less'

// TODO this regex pattern is invalid
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[?=.*[a-zA-Z0-9!@#$%^&()<>.,:;[]{}-_.+,]{8,}$/g

class Password extends Component {
  constructor(props) {
    super(props)
    this.state = {
      oldPassword: '',
      confirmNewPassword: '',
      newPassword: ''
    }
  }
  render() {
    return (
      <article className={styles.Password}>
        <header>
          <h2>Password</h2>
        </header>
        <main>
          <p>
            Minimum eight characters, at least one uppercase letter, one
            lowercase letter and one number
          </p>
          <Input
            name="oldPassword"
            placeholder="Old Password"
            onChange={this.handleChange}
            value={this.state.oldPassword}
            type="password"
            required
          />
          <Input
            name="newPassword"
            placeholder="New Password"
            pattern={passwordPattern}
            onChange={this.handleChange}
            value={this.state.newPassword}
            type="password"
            required
          />
          <Input
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            pattern={passwordPattern}
            onChange={this.handleChange}
            value={this.state.confirmNewPassword}
            type="password"
            required
          />
        </main>
        <footer>
          <Button onClick={this.handleClick}>
            <i className="fa fa-floppy-o" aria-hidden="true" />
            Set Password
          </Button>
        </footer>
      </article>
    )
  }
  handleChange = evt => {
    return this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleClick = evt => {
    if (!this.state.oldPassword || !this.state.newPassword) {
      this.props.dispatch(
        notify({
          message: 'Please enter your password.',
          type: 'error'
        })
      )
      return
    }
    if (this.state.oldPassword === this.state.newPassword) {
      this.props.dispatch(
        notify({
          message: 'Your new password cannot be the same as your old one.',
          type: 'error'
        })
      )
      return
    }
    if (this.state.newPassword !== this.state.confirmNewPassword) {
      notify({
        message: 'Your new password does not match your password confirmation.',
        type: 'error'
      })
      return
    }
    if (this.state.newPassword.match(passwordPattern)) {
      notify({
        message: 'Your new password does not meet the password requirements.',
        type: 'error'
      })
      return
    }

    return this.props
      .dispatch(updatePassword(this.state.oldPassword, this.state.newPassword))
      .then(() => {
        this.props.dispatch(
          notify({
            message: 'Password was updated',
            type: 'success'
          })
        )
      })
      .catch(() => {
        this.props.dispatch(
          notify({
            message: 'Password not updated. An API error occured.',
            type: 'error'
          })
        )
      })
      .finally(() => {
        this.setState({
          oldPassword: '',
          confirmNewPassword: '',
          newPassword: ''
        })
      })
  }
}

export default connect(state => state)(Password)
