import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Roles.less'

import {
  getRole,
  updateGranularRole,
  createGranularRole
} from '../../../../store/sitesRoles'
import { notify } from '../../../../../../../shell/store/notifications'

class EditRole extends Component {
  constructor(props) {
    super()
    let { siteZUID, roleZUID } = props.props
    this.state = {
      collections: { ...props.sitesCollections[siteZUID] },
      role: { ...props.sitesRoles[siteZUID][roleZUID] },
      granularRoles: {},
      siteZUID,
      roleZUID
    }
  }

  componentDidMount() {
    this.props.dispatch(getRole(this.state.role.ZUID, this.state.siteZUID))
    let granularRoles = {}
    // create granular roles object from granular roles OR the system role
    Object.keys(this.state.collections).map(collectionZUID => {
      this.state.role.granularRoles &&
      this.state.role.granularRoles[collectionZUID]
        ? (granularRoles[collectionZUID] = {
            create:
              this.state.role.granularRoles[collectionZUID].create || false,
            read: this.state.role.granularRoles[collectionZUID].read || false,
            update:
              this.state.role.granularRoles[collectionZUID].update || false,
            delete:
              this.state.role.granularRoles[collectionZUID].delete || false,
            publish:
              this.state.role.granularRoles[collectionZUID].publish || false,
            grant: this.state.role.granularRoles[collectionZUID].grant || false
          })
        : (granularRoles[collectionZUID] = {
            create: this.state.role.systemRole.create,
            read: this.state.role.systemRole.read,
            update: this.state.role.systemRole.update,
            delete: this.state.role.systemRole.delete,
            publish: this.state.role.systemRole.publish,
            grant: this.state.role.systemRole.grant
          })
    })
    this.setState({ granularRoles })
  }

  handleClick = evt => {
    let action = evt.target.value.split(',')[0]
    let entity = evt.target.value.split(',')[1]
    let alteredAction = this.state.granularRoles[entity]
    alteredAction[action] = !alteredAction[action]
    return this.setState(state => {
      return {
        ...state,
        granularRoles: { ...this.state.granularRoles, [entity]: alteredAction }
      }
    })
  }

  diffGrains = collection => {
    //returns true if the collection permissions have changed
    if (
      this.state.role.granularRoles &&
      this.state.role.granularRoles[collection]
    ) {
      return !(
        this.state.role.granularRoles[collection]['create'] ===
          this.state.granularRoles[collection]['create'] &&
        this.state.role.granularRoles[collection]['read'] ===
          this.state.granularRoles[collection]['read'] &&
        this.state.role.granularRoles[collection]['update'] ===
          this.state.granularRoles[collection]['update'] &&
        this.state.role.granularRoles[collection]['delete'] ===
          this.state.granularRoles[collection]['delete'] &&
        this.state.role.granularRoles[collection]['publish'] ===
          this.state.granularRoles[collection]['publish'] &&
        this.state.role.granularRoles[collection]['grant'] ===
          this.state.granularRoles[collection]['grant']
      )
    }
    return !(
      this.state.role.systemRole['create'] ===
        this.state.granularRoles[collection]['create'] &&
      this.state.role.systemRole['read'] ===
        this.state.granularRoles[collection]['read'] &&
      this.state.role.systemRole['update'] ===
        this.state.granularRoles[collection]['update'] &&
      this.state.role.systemRole['delete'] ===
        this.state.granularRoles[collection]['delete'] &&
      this.state.role.systemRole['publish'] ===
        this.state.granularRoles[collection]['publish'] &&
      this.state.role.systemRole['grant'] ===
        this.state.granularRoles[collection]['grant']
    )
  }

  doesExist = collection => {
    // retruns true if the granular role exists on the user
    if (this.state.role.granularRoles === null) {
      return false
    }
    return this.state.role.granularRoles.hasOwnProperty(collection)
  }

  handleSubmit = evt => {
    evt.preventDefault()
    // check value of granular roles against role.granularRoles
    // if !== && granularRole isnt on the role CREATE ROLE WITH CURRENT GRAINS
    // queue creation first(with values), THEN update calls
    console.log('state;', this.state)
    Object.keys(this.state.granularRoles).map(collectionZUID => {
      if (this.diffGrains(collectionZUID)) {
        if (this.doesExist(collectionZUID)) {
          this.props
            .dispatch(
              updateGranularRole(
                collectionZUID,
                this.state.granularRoles[collectionZUID],
                this.state.roleZUID
              )
            )
            .then(data => {
              this.props.dispatch(
                notify({
                  message: 'Role Successfully Updated',
                  type: 'success'
                })
              )
            })
        } else {
          this.props
            .dispatch(
              createGranularRole(
                collectionZUID,
                this.state.granularRoles[collectionZUID],
                this.state.roleZUID
              )
            )
            .then(data => {
              this.props.dispatch(
                notify({
                  message: 'Granular Role Successfully Created',
                  type: 'success'
                })
              )
            })
        }
      }
    })
  }

  handleCancel = evt => {
    evt.preventDefault()
    //todo: check for changes and confirm lost changes
    this.props.dispatch({ type: 'REMOVE_MODAL' })
  }

  render() {
    let { siteZUID, roleZUID, role, granularRoles, collections } = this.state
    return (
      <div className={styles.modalWrapper}>
        <h3>
          Edit Granular Role Permissions for: {this.state.role.name} system
          base-({this.state.role.systemRole.name})
        </h3>
        <div className={styles.selectCollection}>
          <header>
            <h3>Collection</h3>
            <h3>create</h3>
            <h3>read</h3>
            <h3>update</h3>
            <h3>delete</h3>
            <h3>publish</h3>
            <h3>grant</h3>
          </header>
          <main>
            <form name="permissionsForm">
              {Object.keys(collections).map((collectionZUID, i) => {
                return granularRoles[collectionZUID] ? (
                  <article key={i}>
                    <span>{collections[collectionZUID].label}</span>
                    <span>
                      <input
                        type="checkbox"
                        onChange={this.handleClick}
                        disabled={role.systemRole.create}
                        checked={granularRoles[collectionZUID].create}
                        value={`create,${collections[collectionZUID].zuid}`}
                      />
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        onChange={this.handleClick}
                        disabled={role.systemRole.read}
                        checked={granularRoles[collectionZUID].read}
                        value={`read,${collections[collectionZUID].zuid}`}
                      />
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        onChange={this.handleClick}
                        disabled={role.systemRole.update}
                        checked={granularRoles[collectionZUID].update}
                        value={`update,${collections[collectionZUID].zuid}`}
                      />
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        onChange={this.handleClick}
                        disabled={role.systemRole.delete}
                        checked={granularRoles[collectionZUID].delete}
                        value={`delete,${collections[collectionZUID].zuid}`}
                      />
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        onChange={this.handleClick}
                        disabled={role.systemRole.publish}
                        checked={granularRoles[collectionZUID].publish}
                        value={`publish,${collections[collectionZUID].zuid}`}
                      />
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        onChange={this.handleClick}
                        disabled={role.systemRole.grant}
                        checked={granularRoles[collectionZUID].grant}
                        value={`grant,${collections[collectionZUID].zuid}`}
                      />
                    </span>
                  </article>
                ) : (
                  <Loader key={i} />
                )
              })}
              <div className={styles.buttons}>
                <Button onClick={this.handleSubmit}>Apply</Button>
                <Button onClick={this.handleCancel}>Close</Button>
              </div>
            </form>
          </main>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    sitesCollections: state.sitesCollections,
    sitesRoles: state.sitesRoles
  }
}

export default connect(mapStateToProps)(EditRole)
