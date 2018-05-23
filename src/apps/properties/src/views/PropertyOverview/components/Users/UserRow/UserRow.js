import { PureComponent } from 'react'
import styles from './UserRow.less'

import {
  updateSiteUserRole,
  removeSiteUser
} from '../../../../../store/sitesUsers'
import { cancelInvite } from '../../../../../store/sites'

import { zConfirm } from '../../../../../../../../shell/store/confirm'
import { notify } from '../../../../../../../../shell/store/notifications'

const OWNER_ZUID = '31-71cfc74-0wn3r'

export default class UserRow extends PureComponent {
  state = {
    submitted: false
  }
  render() {
    console.log('UserRow', this.props)
    return (
      <article className={styles.UserRow}>
        <span className={styles.name}>
          {this.props.firstName} {this.props.lastName}
          {!this.props.lastName &&
            !this.props.firstName && <em>Invited User</em>}
        </span>
        <span className={styles.email}>{this.props.email}</span>

        {this.props.isAdmin ? (
          <span className={styles.action}>
            {this.props.pending ? (
              <Button onClick={() => this.confirm(this.props.inviteZUID)}>
                <i className="fa fa-trash-o" aria-hidden="true" />Revoke Invite
              </Button>
            ) : null}
            {this.props.role &&
            this.props.role.systemRoleZUID !== OWNER_ZUID ? (
              !this.state.submitted ? (
                <span className={styles.select}>
                  <Select
                    onSelect={this.handleSelectRole}
                    selection={
                      this.props.siteRoles
                        .filter(role => role.ZUID === this.props.role.ZUID)
                        .map(item => {
                          return { value: item.ZUID, text: item.name }
                        })[0]
                    }
                  >
                    {this.props.siteRoles.map(role => {
                      return (
                        <Option
                          key={role.ZUID}
                          value={role.ZUID}
                          text={role.name}
                        />
                      )
                    })}
                  </Select>
                  <i
                    className={styles.trash + ' fa fa-trash-o'}
                    aria-hidden="true"
                    onClick={() =>
                      this.removeUser(this.props.ZUID, this.props.role.ZUID)
                    }
                  />
                </span>
              ) : (
                <Loader />
              )
            ) : null}
          </span>
        ) : (
          <span className={styles.action}>{this.props.role.name}</span>
        )}
      </article>
    )
  }
  removeUser = (userZUID, roleZUID) => {
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to remove this user?',
        callback: result => {
          if (result) {
            // removes user if confirmed
            if (result) {
              this.props
                .dispatch(removeUser(userZUID, roleZUID))
                .then(data => {
                  this.props.dispatch(
                    notify({
                      message: 'User Removed',
                      type: 'success'
                    })
                  )
                  this.props.dispatch(
                    removeSiteUser(userZUID, this.props.siteZUID)
                  )
                })
                .catch(err => {
                  this.props.dispatch(
                    notify({
                      message: 'Error Removing User',
                      type: 'error'
                    })
                  )
                })
            }
          }
        }
      })
    )
  }
  confirm = inviteZUID => {
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to revoke this users invite?',
        callback: result => {
          if (result) {
            // removes invite if confirmed
            this.props
              .dispatch(cancelInvite(inviteZUID))
              .then(data => {
                this.props.dispatch(
                  removeSiteUser(inviteZUID, this.props.siteZUID)
                )
                return data
              })
              .then(data => {
                this.props.dispatch(
                  notify({
                    message: 'User Invite Cancelled',
                    type: 'success'
                  })
                )
              })
          }
        }
      })
    )
  }
  handleSelectRole = evt => {
    const newRole = evt.target.dataset.value
    this.setState({
      submitted: true
    })
    this.props
      .dispatch(
        updateSiteUserRole(
          this.props.ZUID,
          this.props.role.ZUID,
          newRole,
          this.props.siteZUID
        )
      )
      .then(data => {
        this.setState({ submitted: false })
        this.props.dispatch(
          notify({
            message: `${this.props.firstName}'s role has been updated`,
            type: 'success'
          })
        )
      })
      .catch(err => {
        this.props.dispatch(
          notify({
            message: 'There was a problem updating the role',
            type: 'error'
          })
        )
      })
  }
}
