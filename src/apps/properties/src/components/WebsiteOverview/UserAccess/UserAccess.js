import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./style.less";

import { sendInvite } from "../../../store/sites";
import { notify } from "../../../../../../shell/store/notifications";

class UserAccess extends Component {
  constructor(props) {
    super();
    this.state = {
      submitted: false,
      inviteeEmail: "",
      inviteRole: ""
    };
  }
  handleInvite = evt => {
    if (this.state.inviteeEmail.includes("@")) {
      // needs mo betta validity check here
      this.setState({ submitted: !this.state.submitted });
      this.props
        .dispatch(
          sendInvite({
            inviteeEmail: this.state.inviteeEmail,
            entityZUID: this.props.site.ZUID,
            roleZUID: this.state.inviteRole
          })
        )
        .then(data => {
          this.setState({ submitted: !this.state.submitted, inviteeEmail: "" });
        });
    } else {
      this.props.dispatch(
        notify({
          HTML: `<p>
          <i class="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;Please provide a valid Email address
        </p>`,
          type: "error"
        })
      );
    }
  };
  handleChange = evt => {
    // todo: validity check
    this.setState({ [evt.target.name]: evt.target.value });
  };
  render() {
    return this.props.sitesRoles ? (
      <div className={styles.userAccess}>
        <div className={styles.invite}>
          <Input
            className={styles.email}
            type="email"
            placeholder="Email"
            name="inviteeEmail"
            required
            value={this.state.inviteeEmail}
            onChange={this.handleChange}
          />
          <select name="inviteRole" onChange={this.handleChange}>
            <option value="none">Select Role</option>
            {this.props.sitesRoles[this.props.siteZUID] instanceof Object &&
              Object.keys(this.props.sitesRoles[this.props.siteZUID]).map(
                (roleZUID, i) => {
                  if (
                    this.props.sitesRoles[this.props.siteZUID][roleZUID]
                      .name === "SYSTEM_ROLE"
                  ) {
                    return;
                  } else {
                    return (
                      <option
                        key={i}
                        value={this.props.sitesRoles[this.props.siteZUID][roleZUID].ZUID}
                        >
                        {this.props.sitesRoles[this.props.siteZUID][roleZUID].name}
                      </option>
                    );
                  }
                }
              )}
          </select>
          {/* <Select
            onChange={this.handleChange}
            name="inviteRole"
            selection={{
              value: "Select Role",
              html: '<option value="none">Select Role</option>'
            }}
            options={
              this.props.sitesRoles[this.props.siteZUID] instanceof Object ?
              Object.keys(this.props.sitesRoles[this.props.siteZUID]).map((roleZUID, i) => {
                  return {
                    value: this.props.sitesRoles[this.props.siteZUID][roleZUID].ZUID,
                    html: `<option value="${this.props.sitesRoles[this.props.siteZUID][roleZUID].ZUID}">${this.props.sitesRoles[this.props.siteZUID][roleZUID].name}</option>`
                  };
                  }) : []
            }
          /> */}
          <Button onClick={this.handleInvite} disabled={this.state.submitted}>
            Send Invite
          </Button>
        </div>
        <div className={styles.userTable}>
          <header>
            <h3>User Name</h3>
            <h3>Role</h3>
            <h3>Email</h3>
          </header>
          <main>
            {this.props.sitesUsers[this.props.siteZUID] instanceof Object ? (
              Object.keys(this.props.sitesUsers[this.props.siteZUID]).map(
                (user, i) => {
                  return (
                    <article key={i}>
                      <span>
                        {
                          this.props.sitesUsers[this.props.siteZUID][user]
                            .firstName
                        }{" "}
                        {
                          this.props.sitesUsers[this.props.siteZUID][user]
                            .lastName
                        }
                      </span>
                      <span>
                        {this.props.sitesUsers[this.props.siteZUID][user].staff}
                      </span>
                      <span>
                        {this.props.sitesUsers[this.props.siteZUID][user].email}{" "}
                      </span>
                    </article>
                  );
                }
              )
            ) : (
              <Loader />
            )}
          </main>
        </div>
      </div>
    ) : (
      <Loader />
    );
  }
}

const mapStateToProps = state => {
  return { sitesRoles: state.sitesRoles, sitesUsers: state.sitesUsers };
};

export default connect(state => state)(UserAccess);
