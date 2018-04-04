import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./profile.less";

import {
  updateSettingRaw,
  saveProfile,
  getSettings
} from "../../../store/userProfile";
import { notify } from "../../../../../../shell/store/notifications";

class Profile extends Component {
  componentDidMount() {
    this.props.dispatch(getSettings(this.props.userZUID));
  }
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
        return this.props.dispatch({ type: "MODIFY_PROFILE_SUCCESS" });
      })
      .catch(err => {
        this.props.dispatch(
          notify({
            HTML: `<p>
        <i class="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;Error saving data ${err}
      </p>`,
            type: "error"
          })
        )
      this.props.disatch({ type: "MODIFY_PROFILE_FAILURE"})
      });
  };
  handleChange = evt => {
    this.props.dispatch(
      updateSettingRaw({ [evt.target.name]: evt.target.value })
    );
  };
  render() {
    return this.props.profile.firstName ? (
      <section className={styles.profile}>
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
            disabled={this.props.userProfile.submittedProfile}
            text="Save"
            onClick={this.handleClick}
          />
        </div>
      </section>
    ) : (
      <p>loading</p>
    );
  }
}

export default connect(state => {
  return { profile: state.userProfile, userZUID: state.user.zuid, ...state };
})(Profile);
