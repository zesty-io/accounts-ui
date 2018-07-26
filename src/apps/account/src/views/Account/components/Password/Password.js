import { Component } from 'React'
import { connect } from 'react-redux'
import { notify } from '../../../../../../../shell/store/notifications'
import { zConfirm } from '../../../../../../../shell/store/confirm'
import { updatePassword } from '../../../../store'

import styles from './Password.less'

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
      <Card>
        <CardHeader>
          <h1>Password</h1>
        </CardHeader>
        <CardContent className={styles.Password}>
          <p>
            Requirements are a minimum of 8 characters with at least one number,
            uppercase and lowercase letter.
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
            onChange={this.handleChange}
            value={this.state.newPassword}
            type="password"
            required
          />
          <Input
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            onChange={this.handleChange}
            value={this.state.confirmNewPassword}
            type="password"
            required
          />
        </CardContent>
        <CardFooter>
          <Button onClick={this.handleClick}>
            <i className="fa fa-floppy-o" aria-hidden="true" />
            Change Password
          </Button>
        </CardFooter>
      </Card>
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
          message: 'Please enter in your password.',
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
      this.props.dispatch(
        notify({
          message:
            'Your new password does not match your password confirmation.',
          type: 'error'
        })
      )
      return
    }
    if (this.failsRequirements(this.state.newPassword)) {
      this.props.dispatch(
        notify({
          message: 'Your new password does not meet the password requirements.',
          type: 'error'
        })
      )
      return
    }
    return this.props
      .dispatch(updatePassword(this.state.oldPassword, this.state.newPassword))
      .then(data => {
        if (data.error) {
          this.props.dispatch(
            notify({
              message: data.error,
              type: 'error'
            })
          )
        } else {
          // notify user
          // log out and sign in with new password
          this.props.dispatch(
            zConfirm({
              single: true,
              confirmText: 'Go to login',
              prompt:
                'Your password has been changed, please log in with your new password',
              callback: confirmed => {
                if (confirmed) {
                  this.props.history.push('/logout')
                }
              }
            })
          )
        }
      })
      .catch(() => {
        this.props.dispatch(
          notify({
            message: 'Password not updated. An API error occurred.',
            type: 'error'
          })
        )
      })
  }
  failsRequirements = pass => {
    if (pass.length < 8 || !pass.match(/\d/g) || !pass.match(/[A-Z]/g)) {
      return true
    }
    return false
  }
}

export default connect(state => state)(Password)
