import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./style.less";

import { inviteData, sendInvite } from "../../../store/invite";
import { notify } from "../../../../../../shell/store/notifications";

class UserAccess extends Component {
  constructor(props) {
    super();
    this.state = {
      submitted: false,
      inviteeEmail: "",
      inviteRole: "contributor"
    };
  }
  componentWillUnmount() {
    this.props.dispatch({ type: "CLEAR_USERS" });
  }
  handleInvite = evt => {
    if (this.state.inviteeEmail.includes('@')) {
      // needs another validity check here
      this.setState({ submitted: !this.state.submitted });
      this.props
        .dispatch(
          sendInvite({
            inviteeEmail: this.state.inviteeEmail,
            instanceZUID: this.props.site.ZUID,
            roleZUID: this.state.inviteRole
          })
        )
        .then(data => {
          this.setState({ submitted: !this.state.submitted });
        });
    } else {
      this.props.dispatch(
        notify({
          HTML: `<p>
          <i class="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;Please provide a valid Email address
        </p>`,
          type: "info"
        })
      );
    }
  };
  handleChange = evt => {
    // todo: validity check
    this.setState({ [evt.target.name]: evt.target.value });
  };
  render() {
    return (
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
          <Select
            onChange={this.handleChange}
            name="inviteRole"
            selection={{
              value: "contributor",
              html: '<option value="own">Contributor</option>'
            }}
            options={
              this.props.sitesRoles.length
                ? this.props.sitesRoles.map((role, i) => {
                    return {
                      value: role.ZUID,
                      html: `<option value="${role.ZUID}">${role.name}</option>`
                    };
                  })
                : [
                    {
                      value: "No Roles Created",
                      html: '<option value="none">No Roles</option>'
                    }
                  ]
            }
          />
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
            {Array.isArray(this.props.sitesUsers) ? (
              this.props.sitesUsers.map((user, i) => {
                return (
                  <article key={i}>
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                    <span>{user.staff}</span>
                    <span>{user.email} </span>
                  </article>
                );
              })
            ) : (
              <Loader />
            )}
          </main>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(UserAccess);
