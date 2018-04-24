import { Component } from 'React'
import { connect } from 'react-redux'

import Toggle from '../../../../../../../core/toggle/Toggle'

import styles from './TwoFactor.less'

class TwoFactor extends Component {
  constructor(props) {
    super()
    this.state = {
      phoneNumberPrefix: '',
      phoneNumber: ''
    }
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleEnable = evt => {
    evt.preventDefault()
  }
  handleDisable = evt => {
    evt.preventDefault()
  }
  render() {
    return (
      <section className={styles.TwoFactor}>
        <h2>Two Factor Authentication</h2>

        {this.props.twofa ? (
          <div>
            <p>Two-factor authentication currently set up for this account.</p>
            <p>number used ***-***-3321</p>
            <Button text="Disable Two-factor" onClick={this.handleDisable} />
          </div>
        ) : (
          <div>
            <p>
              Two-factor authentication is not currently set up for this
              account. Put in the phone number you want to use for
              authentication below.
            </p>
            <label>Phone Number</label>
            <Input
              type="text"
              size="5"
              placeholder="+1"
              name="phoneNumberPrefix"
              value={this.state.phoneNumberPrefix}
              onChange={this.handleChange}
            />
            <Input
              type="text"
              placeholder="123-456-7890"
              name="phoneNumber"
              required
              value={this.state.phoneNumber}
              onChange={this.handleChange}
            />
            <Button text="Enable Two-factor" onClick={this.handleEnable} />
          </div>
        )}
      </section>
    )
  }
}

export default connect(state => state.user)(TwoFactor)
