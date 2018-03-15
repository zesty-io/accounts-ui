import { Component } from 'React'

export default class Password extends Component {
  render() {
    return (
      <section>
        <h4>Password</h4>
        <div>
          <Input
            name="oldPassword"
            placeholder="Old Password"
            onChange={this.handleChange}
            value={this.props.oldPassword}
            type="password"
          />
        </div>
        <div>
          <Input
            name="newPassword"
            placeholder="New Password"
            onChange={this.handleChange}
            value={this.props.newPassword}
            type="password"
          />
        </div>
        <div>
          <Input
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            onChange={this.handleChange}
            value={this.props.confirmNewPassword}
            type="password"
          />
        </div>
        <Button text="Submit" onClick={this.handleClick} />
      </section>
    )
  }
  handleChange = evt => {
    return this.props.dispatch(
      updateSetting({
        [evt.target.name]: evt.target.value
      })
    )
  }
  handleClick = evt => {
    console.log('submitting password change')
  }
}
