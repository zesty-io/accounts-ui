import { Component } from "React";
import { connect } from "react-redux";
import { updateSetting } from "../../../store";

import styles from "./Password.less";

class Password extends Component {
  handleChange = evt => {
    if (evt.target.value.match(evt.target.pattern)) {
      return this.props.dispatch(
        updateSetting({
          [evt.target.name]: evt.target.value
        })
      );
    }
  };
  handleClick = evt => {
    console.log("submitting password change");
  };
  render() {
    return (
      <section className={styles.Password}>
        <h4>Password</h4>
        <div>
          <Input
            name="oldPassword"
            placeholder="Old Password"
            onChange={this.handleChange}
            value={this.props.oldPassword}
            type="password"
            required
          />
        </div>
        <div>
          <p>
            Minimum eight characters, at least one uppercase letter, one
            lowercase letter and one number
          </p>
          <Input
            name="newPassword"
            placeholder="New Password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
            onChange={this.handleChange}
            value={this.props.newPassword}
            type="password"
            required
          />
        </div>
        <div>
          <Input
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
            onChange={this.handleChange}
            value={this.props.confirmNewPassword}
            type="password"
            required
          />
        </div>
        <Button text="Submit" onClick={this.handleClick} />
      </section>
    );
  }
}

export default connect(state => state)(Password);
