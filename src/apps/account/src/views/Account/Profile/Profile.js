import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./profile.less";

import { updateSettingRaw, saveProfile } from "../../../store";
import { notify } from "../../../../../../shell/store/notifications";

class Profile extends Component {
  handleClick = evt => {
    evt.preventDefault();
    this.props
      .dispatch(saveProfile())
      .then(data => {
        this.props.dispatch(
          notify({
            HTML: `<p>
        <i class="fa fa-check-square-o" aria-hidden="true" />&nbsp;Name changed to <i>${
          this.props.profile.firstName
        } ${this.props.profile.lastName}</i>
      </p>`,
            type: "success"
          })
        );
      })
      .catch(err => {
        this.props.dispatch(
          notify({
            HTML: `<p>
        <i class="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;Error saving data ${err}
      </p>`,
            type: "error"
          })
        );
      });
  };
  handleChange = evt => {
    this.props.dispatch(
      updateSettingRaw({ [evt.target.name]: evt.target.value })
    );
  };
  render() {
    return (
      <section className={styles.profile}>
        <h2>Profile</h2>
        <div className={styles.field}>
          <div>
            <label>First Name</label>
          </div>
          <Input
            type="text"
            value={this.props.profile.firstName}
            onChange={this.handleChange}
            name="firstName"
          />
        </div>
        <div className="field">
          <div>
            <label>Last Name</label>
          </div>
          <Input
            type="text"
            value={this.props.profile.lastName}
            onChange={this.handleChange}
            name="lastName"
          />
          <Button
            className={styles.ProfileSave}
            disabled={this.props.profile.submitted}
            text="Save"
            onClick={this.handleClick}
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { profile: state.profile };
};
export default connect(mapStateToProps)(Profile);
