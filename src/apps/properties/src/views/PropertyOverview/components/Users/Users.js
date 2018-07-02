import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import styles from './Users.less'

import { sendInvite } from '../../../../store/sites'
import { notify } from '../../../../../../../shell/store/notifications'
import { fetchSiteUsersPending } from '../../../../store/sitesUsers'

import UserRow from './UserRow'
import UserPendingRow from './UserPendingRow'

export default class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false,
      inviteeEmail: '',
      inviteeRoleZUID: ''
    }
  }
  render() {
    return (
      <Card className={styles.Users}>
        <CardHeader>
          <h2>
            <i className="fa fa-users" aria-hidden="true" />
            &nbsp;User Access
          </h2>
        </CardHeader>
        <CardContent>
          {this.props.isAdmin ? (
            <div className={styles.invite}>
              <Input
                className={styles.email}
                type="email"
                placeholder="Email of user to invite"
                name="inviteeEmail"
                value={this.state.inviteeEmail}
                onChange={this.handleEmail}
                required
              />
              <Select onSelect={this.handleSelectRole}>
                <Option key="default" value="" text="Select Role" />
                {this.props.siteRoles
                  .filter(role => role.name !== 'Owner')
                  .map(role => {
                    return (
                      <Option
                        key={role.ZUID}
                        value={role.ZUID}
                        text={role.name}
                      />
                    )
                  })}
              </Select>
              <Button
                onClick={this.handleInvite}
                disabled={this.state.submitted}>
                <i className="fa fa-envelope-o" aria-hidden="true" />Send Invite
              </Button>
            </div>
          ) : null}

          <div className={styles.UserList}>
            <header>
              <h3>Name</h3>
              <h3>Email</h3>
              <h3>Role</h3>
            </header>
            <main>
              <WithLoader
                condition={
                  !this.props.loadingUsers && !this.props.loadingUsersPending
                }
                message="Loading Instance Users"
                height="100px"
                width="100%">
                <div>
                  {Object.keys(this.props.users).map(ZUID => {
                    const user = this.props.users[ZUID]
                    if (user.pending) {
                      return (
                        <UserPendingRow
                          key={ZUID}
                          siteZUID={this.props.siteZUID}
                          siteRoles={this.props.siteRoles}
                          dispatch={this.props.dispatch}
                          isAdmin={this.props.isAdmin}
                          {...user}
                        />
                      )
                    } else {
                      return (
                        <UserRow
                          key={ZUID}
                          siteZUID={this.props.siteZUID}
                          siteRoles={this.props.siteRoles}
                          dispatch={this.props.dispatch}
                          isAdmin={this.props.isAdmin}
                          isOwner={this.props.isOwner}
                          {...user}
                        />
                      )
                    }
                  })}
                </div>
              </WithLoader>
            </main>
          </div>
        </CardContent>
      </Card>
    )
  }
  handleEmail = evt => {
    this.setState({
      inviteeEmail: evt.target.value
    })
  }
  handleSelectRole = evt => {
    this.setState({
      inviteeRoleZUID: evt.target.dataset.value
    })
  }
  handleInvite = evt => {
    // NOTE do we need to improve this validity check?
    if (this.state.inviteeEmail.includes('@')) {
      this.setState({
        submitted: true
      })
      this.props
        .dispatch(
          sendInvite(
            this.props.siteZUID,
            this.state.inviteeEmail,
            this.state.inviteeRoleZUID
          )
        )
        .then(() => {
          this.setState({
            submitted: false,
            inviteeEmail: ''
          })
        })
    } else {
      this.props.dispatch(
        notify({
          message: `Please provide a valid Email address`,
          type: 'error'
        })
      )
    }
  }
}
