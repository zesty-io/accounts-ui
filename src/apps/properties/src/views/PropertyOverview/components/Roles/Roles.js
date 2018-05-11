import { Component } from 'react'
// import { connect } from 'react-redux'

import { notify } from '../../../../../../../shell/store/notifications'
import { zConfirm } from '../../../../../../../shell/store/confirm'
import {
  fetchSiteRoles,
  // createRole,
  removeRole,
  getRole
} from '../../../../store/sitesRoles'

import EditRole from './EditRole'
import { RoleCreate } from './components/RoleCreate'

import styles from './Roles.less'

const formatDate = date => {
  if (!date) {
    return ''
  }
  const newDate = new Date(date)
  return `${newDate.getMonth() +
    1}-${newDate.getDate()}-${newDate.getFullYear()}`
}

export default class Roles extends Component {
  render() {
    return (
      <div className={styles.Roles}>
        <p>
          By creating custom roles you can provide fine grained controls of what
          content specific users can access and what actions the can take.
        </p>
        <RoleCreate systemRoles={this.props.systemRoles} />
        <Divider />
        <div className={styles.currentRoles}>
          <header>
            <h3>Role</h3>
            <h3>Created</h3>
            <h3>Expires</h3>
          </header>
          <main>
            {Object.keys(this.props.siteRoles).map(ZUID => {
              const role = this.props.siteRoles[ZUID]
              return (
                <article key={ZUID}>
                  <span>{role.name}</span>
                  <span>{formatDate(role.createdAt)}</span>
                  <span>{formatDate(role.expiry)}</span>
                  <span>
                    <ButtonGroup>
                      <Button
                        text="Edit"
                        onClick={() =>
                          this.handleEdit(ZUID, this.props.siteZUID)
                        }
                      />
                      <Button
                        text="Remove"
                        onClick={() => this.handleRemove(ZUID)}
                      />
                    </ButtonGroup>
                  </span>
                </article>
              )
            })}
          </main>
        </div>
      </div>
    )
  }
  handleEdit = (roleZUID, siteZUID) => {
    this.props.dispatch(getRole(roleZUID, siteZUID)).then(data => {
      this.props.dispatch({
        type: 'NEW_MODAL',
        component: EditRole,
        props: {
          siteZUID,
          roleZUID
        }
      })
    })
  }
  handleRemove = ZUID => {
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you certain you want to delete this role?',
        callback: result => {
          // remove role if user confirms
          if (result) {
            return this.props.dispatch(removeRole(ZUID)).then(data => {
              this.props.dispatch(
                notify({
                  message: 'Role successfully removed',
                  type: 'success'
                })
              )
              return this.props.dispatch(
                fetchSiteRoles(this.props.user.ZUID, this.props.siteZUID)
              )
            })
          }
        }
      })
    )
  }
}
