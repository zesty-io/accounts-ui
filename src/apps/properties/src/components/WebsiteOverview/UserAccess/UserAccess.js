import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./style.less";

import { inviteData, sendInvite } from "../../../store/invite";
import { notify } from "../../../../../../shell/store/notifications";

class UserAccess extends Component {
  componentWillUnmount() {
    this.props.dispatch({ type: "CLEAR_USERS" });
  }
  handleInvite = evt => {
    if (this.props.invite && this.props.invite.inviteeEmail) {
      this.props
        .dispatch(
          sendInvite({
            inviteeEmail: this.props.invite.inviteeEmail,
            instanceZUID: this.props.site.ZUID,
            roleZUID: this.props.invite.inviteRole
          })
        )
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
    if (evt.target.value.match(evt.target.pattern)) {
      this.props.dispatch(inviteData({ [evt.target.name]: evt.target.value }));
    }
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
            value={this.props.invite.inviteeEmail}
            onChange={this.handleChange}
          />
          <Select
            onChange={this.handleChange}
            name="newUserRole"
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
          <Button
            onClick={this.handleInvite}
            disabled={this.props.invite.submitted}
          >
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
