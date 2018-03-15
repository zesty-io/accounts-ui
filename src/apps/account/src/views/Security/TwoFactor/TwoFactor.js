import { Component } from 'React'
import { updateSetting } from '../../../store'

export default class TwoFactor extends Component {
  render() {
    return (
      <section>
        {this.props.twofa ? (
          <div>
            <p>Two-factor authentication currently set up for this account.</p>
            <Button text="Disable Two-factor" onClick={this.handleDisable} />
          </div>
        ) : (
          <div>
            <p>
              Two-factor authentication is not currently set up for this
              account.
            </p>
            <p>
              Put in the phone number you want to use for authentication below.
            </p>
            <div>
              <Input
                type="text"
                size="5"
                placeholder="+1"
                name="phoneNumberPrefix"
                onChange={this.handleChange}
              />
              <Input
                type="text"
                placeholder="123 456 7890"
                name="phoneNumber"
                onChange={this.handleChange}
              />
            </div>
            <Button text="Enable Two-factor" onClick={this.handleEnable} />
          </div>
        )}
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
  handleEnable = () => {
    this.props.dispatch(
      updateSetting({
        twofa: true,
        showAuth: true
      })
    )
  }
  handleDisable = () => {
    this.props.dispatch(
      updateSetting({
        twofa: false,
        showAuth: false
      })
    )
  }
}
