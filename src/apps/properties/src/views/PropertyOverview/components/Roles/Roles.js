import { Component } from 'react'
// import { connect } from 'react-redux's

import { notify } from '../../../../../../../shell/store/notifications'
import { zConfirm } from '../../../../../../../shell/store/confirm'
import {
  fetchSiteRoles,
  // createRole,
  removeRole,
  getRole
} from '../../../../store/sitesRoles'

import Modal from '../../../../../../../shell/components/Modal'
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

class Roles extends Component {
  state = {
    modalIsOpen: false,
    roleZUID: ''
  }
  render() {
    return (
      <div className={styles.Roles}>
        <Modal close={this.toggleModal} isOpen={this.state.modalIsOpen}>
          <EditRole props={{ ...this.props, roleZUID: this.state.roleZUID }} />
        </Modal>
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
            {this.props.siteRoles.map(role => {
              return (
                <article key={role.ZUID}>
                  <span>{role.name}</span>
                  <span>{formatDate(role.createdAt)}</span>
                  <span>{formatDate(role.expiry)}</span>
                  <span>
                    <ButtonGroup>
                      <Button
                        text="Edit"
                        onClick={() =>
                          this.handleEdit(role.ZUID, this.props.siteZUID)
                        }
                      />
                      <Button
                        text="Remove"
                        onClick={() => this.handleRemove(role.ZUID)}
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
    this.setState({ roleZUID })
    this.toggleModal()
    // this.props.dispatch(getRole(roleZUID, siteZUID)).then(data => {
    //   this.props.dispatch({
    //     type: 'NEW_MODAL',
    //     component: EditRole,
    //     props: {
    //       siteZUID,
    //       roleZUID
    //     }
    //   })
    // })
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
  toggleModal = evt => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen })
  }
}

export default Roles
