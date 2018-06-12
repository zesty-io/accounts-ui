import { Component } from 'React'
import { connect } from 'react-redux'

import Toggle from '../../../../../../../core/toggle/Toggle'
import { zConfirm } from '../../../../../../../shell/store/confirm'
import { update2fa } from '../../../../../../../shell/store/user'

import styles from './TwoFactor.less'

class TwoFactorOptions extends Component {
  constructor(props) {
    super()
    this.state = {
      authyPhoneCountyCode: '',
      authyPhoneNumber: ''
    }
  }
  render() {
    return (
      <Card>
        <CardHeader>
          <h1>Two-Factor Authentication</h1>
        </CardHeader>
        <CardContent className={styles.TwoFactor}>
          {this.props.authyEnabled ? (
            <React.Fragment>
              <p>
                Two-factor authentication currently set up for this account.
              </p>
              <p>number used {this.props.authyPhoneNumber}</p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p>
                <Url
                  className={styles.InfoLink}
                  target="_blank"
                  href="https://authy.com/what-is-2fa/"
                >
                  What is Authy 2 Factor Authentication?
                </Url>
              </p>

              <p>
                Two-factor authentication is not currently set up for this
                account. Put in the phone number you want to use for
                authentication below.
              </p>

              <label className={styles.PhoneNumber}>
                <span className={styles.PhoneNumberLabel}>Phone Number</span>
                <Input
                  type="text"
                  size="5"
                  placeholder="+1"
                  name="authyPhoneCountyCode"
                  value={this.state.authyPhoneCountyCode}
                  onChange={this.handleChange}
                />&nbsp;
                <Input
                  type="text"
                  placeholder="123-456-7890"
                  name="authyPhoneNumber"
                  required
                  value={this.state.authyPhoneNumber}
                  onChange={this.handleChange}
                />
              </label>
            </React.Fragment>
          )}
        </CardContent>
        <CardFooter>
          {this.props.authyEnabled ? (
            <Button onClick={this.handleDisable}>Disable Two-factor</Button>
          ) : (
            <Button onClick={this.handleEnable}>
              <i className="fa fa-shield" aria-hidden="true" />
              Enable Two-factor
            </Button>
          )}
        </CardFooter>
      </Card>
    )
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleEnable = evt => {
    this.props.dispatch(update2fa(true, this.state))
  }
  handleDisable = evt => {
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to disable two-factor authentication?',
        callback: response => {
          if (response) {
            this.props.dispatch(update2fa(false))
          }
        }
      })
    )
  }
}

export default connect(state => state.user)(TwoFactorOptions)
