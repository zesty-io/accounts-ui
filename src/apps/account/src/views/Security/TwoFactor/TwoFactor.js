import { Component } from "React";
import { updateSetting } from "../../../store";
import { connect } from "react-redux";
import Toggle from "../../../../../../core/toggle/Toggle";

import styles from "./TwoFactor.less";

class TwoFactor extends Component {
  handleChange = evt => {
    if (evt.target.value.match(evt.target.pattern)) {
      return this.props.dispatch(
        updateSetting({
          [evt.target.name]: evt.target.value
        })
      );
    }
  };
  handleEnable = () => {
    this.props.dispatch(
      updateSetting({
        twofa: true,
        showAuth: true
      })
    );
  };
  handleDisable = () => {
    this.props.dispatch(
      updateSetting({
        twofa: false,
        showAuth: false
      })
    );
  };
  render() {
    return (
      <section className={styles.TwoFactor}>
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
            </p><br />
              <label>Phone Number</label>
              <Input
                type="text"
                size="5"
                placeholder="+1"
                name="phoneNumberPrefix"
                onChange={this.handleChange}
              />
              <Input
                type="text"
                placeholder="123-456-7890"
                name="phoneNumber"
                pattern="d{3}-\d{3}-\d{4}"
                onChange={this.handleChange}
              />
            <Button text="Enable Two-factor" onClick={this.handleEnable} />
          </div>
        )}
      </section>
    );
  }
}

export default connect(state => state)(TwoFactor);
