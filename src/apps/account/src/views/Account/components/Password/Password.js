import { Component } from 'React'
import { connect } from 'react-redux'
import { updatePassword } from '../../../../../../../shell/store/user'

import styles from './Password.less'
import { notify } from '../../../../../../../shell/store/notifications'

class Password extends Component {
  constructor(props) {
    super()
    this.state = {
      oldPassword: '',
      confirmNewPassword: '',
      newPassword: ''
    }
  }
  handleChange = evt => {
    return this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleClick = evt => {
    if (
      this.state.newPassword == this.state.confirmNewPassword &&
      this.state.oldPassword
    ) {
      return this.props
        .dispatch(
          updatePassword(this.state.oldPassword, this.state.newPassword)
        )
        .then(data => {
          this.setState({
            oldPassword: '',
            confirmNewPassword: '',
            newPassword: ''
          })
          this.props.dispatch(
            notify({
              message: 'Password was updated',
              type: 'success'
            })
          )
        })
        .catch(err => {
          this.setState({
            oldPassword: '',
            confirmNewPassword: '',
            newPassword: ''
          })
          this.props.dispatch(
            notify({
              message: 'Password was not updated',
              type: 'error'
            })
          )
        })
    } else {
      this.props.dispatch(
        notify({
          message: 'Passwords no bueno',
          type: 'error'
        })
      )
    }
  }
  render() {
    return (
      <section className={styles.Password}>
        <h2>Password</h2>
        <p>
          Minimum eight characters, at least one uppercase letter, one lowercase
          letter and one number
        </p>
        <div>
          <Input
            name="oldPassword"
            placeholder="Old Password"
            onChange={this.handleChange}
            value={this.state.oldPassword}
            type="password"
            required
          />
        </div>
        <div>
          <Input
            name="newPassword"
            placeholder="New Password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[?=.*[a-zA-Z0-9!@#$%^&()<>.,:;[\]{}\-_.+,/]{8,}$"
            onChange={this.handleChange}
            value={this.state.newPassword}
            type="password"
            required
          />
        </div>
        <div>
          <Input
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[?=.*[a-zA-Z0-9!@#$%^&()<>.,:;[\]{}\-_.+,/]{8,}$"
            onChange={this.handleChange}
            value={this.state.confirmNewPassword}
            type="password"
            required
          />
        </div>
        <Button text="Set Password" onClick={this.handleClick} />
      </section>
    )
  }
}

export default connect(state => state)(Password)
