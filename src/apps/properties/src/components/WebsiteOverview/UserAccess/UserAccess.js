import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './style.less'
import { inviteData, sendInvite } from '../../../store/invite'
class UserAccess extends Component {
  componentWillUnmount() {
    this.props.dispatch({ type: 'CLEAR_USERS' })
  }
  handleInvite = evt => {
    if (this.props.invite && this.props.invite.inviteeEmail) {
      this.props.dispatch({ type: 'TOGGLE_SEND_INVITE_BUTTON' })
      this.props.dispatch(
        sendInvite({
          inviteeEmail: this.props.invite.inviteeEmail,
          InstanceZUID: this.props.site.ZUID,
          RoleZUID: this.props.invite.inviteRole
        })
      )
    } else {
      console.log('invite info incomplete') // placeholder for user notice
    }
  };
  handleChange = evt => {
    if (evt.target.value.match(evt.target.pattern)) {
      this.props.dispatch(inviteData({ [evt.target.name]: evt.target.value }))
    }
  };
  render() {
    return (
      <div className={styles.userAccess}>
        <div className={styles.invite}>
          <Input
            type="email"
            placeholder="Email"
            name="inviteeEmail"
            required
            value={this.props.invite.inviteeEmail}
            onChange={this.handleChange}
          />
          <select name="inviteRole" onChange={this.handleChange}>
            <option value="editor">Editor</option>
            <option value="developer">Developer</option>
            <option value="admin">Admin</option>
          </select>
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
                )
              })
            ) : (
              <Loader />
            )}
          </main>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(UserAccess)
