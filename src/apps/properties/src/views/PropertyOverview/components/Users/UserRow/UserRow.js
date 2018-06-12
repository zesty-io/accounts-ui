import { Component } from 'react'
import styles from './UserRow.less'

import { updateRole, removeUser } from '../../../../../store/sitesUsers'

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

        <span className={styles.action}>
          {this.state.submitted ? (
            <Loader />
          ) : this.props.isAdmin ? (
            this.props.role.name === 'Owner' ? (
              <React.Fragment>
                <i className="fa fa-fort-awesome" />
                <span className={styles.Owner}>Owner</span>
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
              </React.Fragment>
            ) : (
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
                    this.removeUserFromInstance(
                      this.props.ZUID,
                      this.props.role.ZUID
                    )
                  }
                />
              </span>
            )
          ) : this.props.role.name === 'Owner' ? (
            <React.Fragment>
              <i className="fa fa-fort-awesome" />&nbsp;{this.props.role.name}
            </React.Fragment>
          ) : (
            this.props.role.name
          )}
        </span>
      </article>
    )
  }
  removeUserFromInstance = (userZUID, roleZUID) => {
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to remove this user?',
        callback: result => {
          if (result) {
            this.props
              .dispatch(removeUser(this.props.siteZUID, userZUID, roleZUID))
              .then(() => {
                this.props.dispatch(
                  notify({
                    message: 'User Removed',
                    type: 'success'
                  })
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
      })
    )
  }

  handleSelectRole = evt => {
    this.setState({
      submitted: true
    })
    this.props
      .dispatch(
        updateRole(
          this.props.siteZUID,
          this.props.ZUID,
          evt.target.dataset.value
        )
      )
      .then(data => {
        this.setState({
          submitted: false
        })
        this.props.dispatch(
          notify({
            message: `${this.props.firstName}'s role has been updated`,
            type: 'success'
          })
        )
      })
      .catch(err => {
        console.error(err)
        this.props.dispatch(
          notify({
            message: 'There was a problem updating the role',
            type: 'error'
          })
        )
      })
  }
}
