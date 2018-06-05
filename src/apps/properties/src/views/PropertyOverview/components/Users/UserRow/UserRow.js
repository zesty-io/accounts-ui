import { Component } from 'react'
import styles from './UserRow.less'

import {
  updateSiteUserRole,
  removeSiteUser
} from '../../../../../store/sitesUsers'
import { removeUser } from '../../../../../store/sites'

import { zConfirm } from '../../../../../../../../shell/store/confirm'
import { notify } from '../../../../../../../../shell/store/notifications'

export default class UserRow extends Component {
  state = {
    submitted: false
  }
  render() {
    return (
      <article className={styles.UserRow}>
        <span className={styles.name}>
          {this.props.firstName} {this.props.lastName}
        </span>
        <span className={styles.email}>{this.props.email}</span>
        {this.props.isAdmin ? (
          <span className={styles.action}>
            {!this.state.submitted ? (
              this.props.role.name !== 'Owner' ? (
                <span className={styles.select}>
                  <Select
                    onSelect={this.handleSelectRole}
                    selection={
                      this.props.siteRoles
                        .filter(role => role.ZUID === this.props.role.ZUID)
                        .map(item => {
                          return { value: item.ZUID, text: item.name }
                        })[0]
                    }>
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
                      this.removeUserFromInstance(
                        this.props.ZUID,
                        this.props.role.ZUID
                      )
                    }
                  />
                </span>
              ) : (
                <p>
                 <i className="fa fa-fort-awesome" /> Owner
                </p>
              )
            ) : (
              <Loader />
            )}
          </span>
        ) : (
          <span className={styles.action}>{this.props.role.name}</span>
        )}
      </article>
    )
  }
  removeUserFromInstance = (userZUID, roleZUID) => {
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
