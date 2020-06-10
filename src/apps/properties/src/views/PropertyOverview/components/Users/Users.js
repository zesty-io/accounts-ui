import React, { Component } from 'react'
import cx from 'classnames'

import { sendInvite } from '../../../../store/sites'
import { notify } from '../../../../../../../shell/store/notifications'
import { fetchSiteUsersPending } from '../../../../store/sitesUsers'

import UserRow from './UserRow'
import UserPendingRow from './UserPendingRow'

import { WithLoader } from '@zesty-io/core/WithLoader'
import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { DropDownFieldType } from '@zesty-io/core/DropDownFieldType'
import { Button } from '@zesty-io/core/Button'
import { Input } from '@zesty-io/core/Input'

import styles from './Users.less'
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
            <div className={cx(styles.invite, 'invite')}>
              <div className={styles.inviteeEmail}>
                <Input
                  className={styles.email}
                  name="inviteeEmail"
                  type="email"
                  placeholder="Email of user to invite"
                  value={this.state.inviteeEmail}
                  onChange={this.handleEmail}
                  required
                />
              </div>

              <DropDownFieldType
                name="siteRoles"
                defaultValue=""
                defaultText="- Select Role -"
                onChange={this.handleSelectRole}
                options={this.props.siteRoles
                  .filter(role => role.name !== 'Owner')
                  .map(role => {
                    return {
                      value: role.ZUID,
                      text: role.name
                    }
                  })}
              />

              <Button
                onClick={this.handleInvite}
                id="inviteUserSend"
                disabled={this.state.submitted}>
                <i className="fas fa-user-plus"></i>
                Add User
              </Button>
            </div>
          ) : null}

          <div className={styles.UserList}>
            <header>
              <h3>Name</h3>
              <h3>Email</h3>
              <h3>Role</h3>
              <span></span>
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
                  {Object.keys(this.props.users)
                    // Do not include users who belong to a team
                    .filter(ZUID => !this.props.users[ZUID].teamZUID)
                    .filter(ZUID => {
                      /**
                       * 1) Pending invites do not have last names so we need to account for them
                       * here to ensure they are included on the users table
                       *
                       * 2) A user with a lastName equal to a ZUID is an access token.
                       * Do not include them on the users table
                       */
                      return (
                        this.props.users[ZUID].pending ||
                        this.props.users[ZUID].lastName !==
                          this.props.users[ZUID].ZUID
                      )
                    })
                    .map(ZUID => {
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
  handleSelectRole = (name, value) => {
    this.setState({
      inviteeRoleZUID: value
    })
  }
  handleInvite = evt => {
    if (!this.state.inviteeRoleZUID) {
      return this.props.dispatch(
        notify({
          message: `Please select a role`,
          type: 'error'
        })
      )
    }
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
          this.props.dispatch(
            notify({
              message: `User invite sent to ${this.state.inviteeEmail}`,
              type: 'success'
            })
          )
          this.setState({
            submitted: false,
            inviteeEmail: ''
          })
        })
        .catch(err => {
          this.setState({ submitted: false })
          this.props.dispatch(
            notify({
              message: `Error occurred sending the invite`,
              type: 'error'
            })
          )
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
