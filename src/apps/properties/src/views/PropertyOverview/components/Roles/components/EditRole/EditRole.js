import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './EditRole.less'
import { Input } from '@zesty-io/core/Input'
import { WithLoader } from '@zesty-io/core/WithLoader'
import { Button } from '@zesty-io/core/Button'

import { fetchSiteCollections } from '../../../../../../store/sitesCollections'

import {
  getRole,
  updateGranularRole,
  createGranularRole
} from '../../../../../../store/sitesRoles'

import { notify } from '../../../../../../../../../shell/store/notifications'
import Modal from '../../../../../../../../../shell/components/Modal'

class EditRole extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchSiteCollections(this.props.match.params.siteZUID))
  }

  componentDidMount() {
    // TODO fetch collections
    // console.log('PROPS IN EDITROLS:', this.props)
    // this.props.dispatch(getRole(this.state.role.ZUID, this.state.siteZUID))
    // let granularRoles = {}
    // // create granular roles object from granular roles OR the system role
    // Object.keys(this.state.collections).map(collectionZUID => {
    //   this.state.role.granularRoles &&
    //   this.state.role.granularRoles[collectionZUID]
    //     ? (granularRoles[collectionZUID] = {
    //         create:
    //           this.state.role.granularRoles[collectionZUID].create || false,
    //         read: this.state.role.granularRoles[collectionZUID].read || false,
    //         update:
    //           this.state.role.granularRoles[collectionZUID].update || false,
    //         delete:
    //           this.state.role.granularRoles[collectionZUID].delete || false,
    //         publish:
    //           this.state.role.granularRoles[collectionZUID].publish || false,
    //         grant: this.state.role.granularRoles[collectionZUID].grant || false
    //       })
    //     : (granularRoles[collectionZUID] = {
    //         create: this.state.role.systemRole.create,
    //         read: this.state.role.systemRole.read,
    //         update: this.state.role.systemRole.update,
    //         delete: this.state.role.systemRole.delete,
    //         publish: this.state.role.systemRole.publish,
    //         grant: this.state.role.systemRole.grant
    //       })
    // })
    // console.log('gran roles object', granularRoles)
    // this.setState({ granularRoles }, () => {
    //   console.log('state in editroles', this.state)
    // })
  }

  render() {
    return (
      <Modal {...this.props}>
        <div className={styles.EditRole}>
          <h1 className={styles.RoleName}>Editing: {this.props.role.name}</h1>
          <header>
            <h3>Collection</h3>
            <h3>create</h3>
            <h3>read</h3>
            <h3>update</h3>
            <h3>publish</h3>
            <h3>delete</h3>
          </header>
          <main>
            <WithLoader condition={this.props.collections.length}>
              <form className={styles.Permissions} name="permissions">
                {this.props.collections.map(col => {
                  return (
                    <article key={col.ZUID}>
                      <span>{col.label}</span>
                      <Input type="checkbox" name="create" />
                      <Input type="checkbox" name="update" />
                      <Input type="checkbox" name="read" />
                      <Input type="checkbox" name="publish" />
                      <Input type="checkbox" name="delete" />
                    </article>
                  )
                })}

                {/* {Object.keys(collections).map((collectionZUID, i) => {
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
                })} */}
                <Button className={styles.Submit} onClick={this.handleSubmit}>
                  Apply Permissions
                </Button>
              </form>
            </WithLoader>
          </main>
        </div>
      </Modal>
    )
  }

  // handleClick = evt => {
  //   let action = evt.target.value.split(',')[0]
  //   let entity = evt.target.value.split(',')[1]
  //   let alteredAction = this.state.granularRoles[entity]
  //   alteredAction[action] = !alteredAction[action]
  //   return this.setState(state => {
  //     return {
  //       ...state,
  //       granularRoles: { ...this.state.granularRoles, [entity]: alteredAction }
  //     }
  //   })
  // }
  //
  // diffGrains = collection => {
  //   //returns true if the collection permissions have changed
  //   if (
  //     this.state.role.granularRoles &&
  //     this.state.role.granularRoles[collection]
  //   ) {
  //     return !(
  //       this.state.role.granularRoles[collection]['create'] ===
  //         this.state.granularRoles[collection]['create'] &&
  //       this.state.role.granularRoles[collection]['read'] ===
  //         this.state.granularRoles[collection]['read'] &&
  //       this.state.role.granularRoles[collection]['update'] ===
  //         this.state.granularRoles[collection]['update'] &&
  //       this.state.role.granularRoles[collection]['delete'] ===
  //         this.state.granularRoles[collection]['delete'] &&
  //       this.state.role.granularRoles[collection]['publish'] ===
  //         this.state.granularRoles[collection]['publish'] &&
  //       this.state.role.granularRoles[collection]['grant'] ===
  //         this.state.granularRoles[collection]['grant']
  //     )
  //   }
  //   return !(
  //     this.state.role.systemRole['create'] ===
  //       this.state.granularRoles[collection]['create'] &&
  //     this.state.role.systemRole['read'] ===
  //       this.state.granularRoles[collection]['read'] &&
  //     this.state.role.systemRole['update'] ===
  //       this.state.granularRoles[collection]['update'] &&
  //     this.state.role.systemRole['delete'] ===
  //       this.state.granularRoles[collection]['delete'] &&
  //     this.state.role.systemRole['publish'] ===
  //       this.state.granularRoles[collection]['publish'] &&
  //     this.state.role.systemRole['grant'] ===
  //       this.state.granularRoles[collection]['grant']
  //   )
  // }
  //
  // doesExist = collection => {
  //   // retruns true if the granular role exists on the user
  //   if (this.state.role.granularRoles === null) {
  //     return false
  //   }
  //   return this.state.role.granularRoles.hasOwnProperty(collection)
  // }
  //
  handleSubmit = evt => {
    evt.preventDefault()

    // check value of granular roles against role.granularRoles
    // if !== && granularRole isnt on the role CREATE ROLE WITH CURRENT GRAINS
    // queue creation first(with values), THEN update calls
    console.log('state; ', this.state)

    // Object.keys(this.state.granularRoles).map(collectionZUID => {
    //   if (this.diffGrains(collectionZUID)) {
    //     if (this.doesExist(collectionZUID)) {
    //       this.props
    //         .dispatch(
    //           updateGranularRole(
    //             collectionZUID,
    //             this.state.granularRoles[collectionZUID],
    //             this.state.roleZUID
    //           )
    //         )
    //         .then(data => {
    //           this.props.dispatch(
    //             notify({
    //               message: 'Role Successfully Updated',
    //               type: 'success'
    //             })
    //           )
    //         })
    //     } else {
    //       this.props
    //         .dispatch(
    //           createGranularRole(
    //             collectionZUID,
    //             this.state.granularRoles[collectionZUID],
    //             this.state.roleZUID
    //           )
    //         )
    //         .then(data => {
    //           this.props.dispatch(
    //             notify({
    //               message: 'Granular Role Successfully Created',
    //               type: 'success'
    //             })
    //           )
    //         })
    //     }
    //   }
    // })
  }

  // handleCancel = evt => {
  //   evt.preventDefault()
  //   //todo: check for changes and confirm lost changes
  //   this.props.dispatch({ type: 'REMOVE_MODAL' })
  // }
}

export default connect((state, props) => {
  const role =
    state.sitesRoles[props.match.params.siteZUID][props.match.params.roleZUID]
  const baseRole = state.systemRoles[role.systemRoleZUID]

  let collections = state.sitesCollections[props.match.params.siteZUID] || []
  collections = Object.keys(collections).reduce((acc, key) => {
    acc.push(collections[key])
    return acc
  }, [])

  console.log('EditRole Collection: ', collections)

  return {
    collections,
    baseRole,
    role
  }
})(EditRole)
