import { PureComponent } from 'react'
import styles from './UserPendingRow.less'

import { cancelInvite } from '../../../../../store/sites'
import {removeSiteUser } from '../../../../../store/sitesUsers'

import { zConfirm } from '../../../../../../../../shell/store/confirm'
import { notify } from '../../../../../../../../shell/store/notifications'

export default class UserPendingRow extends PureComponent {
  render() {
    return (
      <article className={styles.UserRow}>
        <span className={styles.name}>
          <em>Invited User</em>
        </span>
        <span className={styles.email}>{this.props.email}</span>
        {this.props.isAdmin ? (
          <span className={styles.action}>
            {this.props.pending ? (
              <Button onClick={() => this.confirm(this.props.inviteZUID)}>
                <i className="fa fa-trash-o" aria-hidden="true" />Revoke Invite
              </Button>
            ) : null}
          </span>
        ) : null}
      </article>
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
}
