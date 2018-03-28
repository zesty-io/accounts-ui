import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./style.less";

import { inviteData, sendInvite } from "../../../store/invite";
import { notify } from '../../../../../../shell/store/notifications'
class UserAccess extends Component {
  constructor(props) {
    super();
    this.state = {
      message: "",
      error: "",
      info: ""
    };
  }
  componentWillUnmount() {
    this.props.dispatch({ type: "CLEAR_USERS" });
  }
  handleInvite = evt => {
    if (this.props.invite && this.props.invite.inviteeEmail) {
      this.props.dispatch({ type: "TOGGLE_SEND_INVITE_BUTTON" });
      this.props
        .dispatch(
          sendInvite({
            inviteeEmail: this.props.invite.inviteeEmail,
            InstanceZUID: this.props.site.ZUID,
            RoleZUID: this.props.invite.inviteRole
          })
        )
        .then(data => {
          this.props.dispatch(notify({
            message:'message here',
            type: 'success'
        }))
          // this.setState({ message: "Invite sent!" }, () => {
          //   setTimeout(() => this.setState({ message: "" }), 3000);
          // });

          // return this.props.dispatch({
          //   type: "SEND_INVITE_SUCCESS",
          //   data
          // });
        })
        .catch(err => {
          console.table(err);
          this.props.dispatch(notify({message: 'error here'}))
          
          // this.setState({ error: "Invite was not successful" }, () => {
          //   setTimeout(() => this.setState({ error: "" }), 3000);
          // });
          // this.props.dispatch({
          //   type: "SEND_INVITE_ERROR",
          //   err
          // });
        });
    } else {
      this.setState({ info: "Form is incomplete" }, () => {
        setTimeout(() => this.setState({ info: "" }), 3000);
      });
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
            options={[
              {
                value: "admin",
                html: '<option value="view">Admin</option>'
              },
              {
                value: "developer",
                html: '<option value="edit">Developer</option>'
              },
              {
                value: "editor",
                html: '<option value="own">Editor</option>'
              },
              {
                value: "contributor",
                html: '<option value="own">Contributor</option>'
              }
            ]}
          />
          {/* Messages to notify succes or failure */}
          {this.state.message ? (
            <Notify style="error" message={this.state.message} />
          ) : null}
          {this.state.info ? (
            <Notify style="info" message={this.state.info} />
          ) : null}
          {this.state.error ? (
            <Notify style="error" message={this.state.eror} />
          ) : null}
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
