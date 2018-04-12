import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Permissions.less";

import { getRole, updateRole } from "../../../store/sitesRoles";
import { notify } from "../../../../../../shell/store/notifications";

class EditRole extends Component {
  constructor(props) {
    super();
    let { siteZUID, roleZUID } = props.props;
    this.state = {
      collections: { ...props.sitesCollections[siteZUID] },
      role: { ...props.sitesRoles[siteZUID][roleZUID] },
      granularRoles: {},
      siteZUID,
      roleZUID
    };
  }

  componentDidMount() {
    let granularRoles = {};
    // create granular roles object from granular roles OR the system role
    Object.keys(this.state.collections).forEach(collectionZUID => {
      this.state.role.granularRoles
        ? (granularRoles[collectionZUID] = {
            create:
              this.state.role.granularRoles[collectionZUID].create ||
              this.state.role.systemRole.create,
            read:
              this.state.role.granularRoles[collectionZUID].read ||
              this.state.role.systemRole.read,
            update:
              this.state.role.granularRoles[collectionZUID].update ||
              this.state.role.systemRole.update,
            delete:
              this.state.role.granularRoles[collectionZUID].delete ||
              this.state.role.systemRole.delete,
            publish:
              this.state.role.granularRoles[collectionZUID].publish ||
              this.state.role.systemRole.publish,
            grant:
              this.state.role.granularRoles[collectionZUID].grant ||
              this.state.role.systemRole.grant,
            super:
              this.state.role.granularRoles[collectionZUID].super ||
              this.state.role.systemRole.super
          })
        : (granularRoles[collectionZUID] = {
            create: this.state.role.systemRole.create,
            read: this.state.role.systemRole.read,
            update: this.state.role.systemRole.update,
            delete: this.state.role.systemRole.delete,
            publish: this.state.role.systemRole.publish,
            grant: this.state.role.systemRole.grant,
            super: this.state.role.systemRole.super
          });
    });
    this.setState({ granularRoles });
  }

  handleClick = evt => {
    let action = evt.target.value.split(",")[0];
    let entity = evt.target.value.split(",")[1];
    let alteredAction = this.state.granularRoles[entity];
    alteredAction[action] = !alteredAction[action];
    return this.setState(state => {
      return {
        ...state,
        granularRoles: { ...this.state.granularRoles, [entity]: alteredAction }
      };
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    return this.props
      .dispatch(
        updateRole({
          roleZUID: this.state.role.ZUID,
          granularRoles: this.state.granularRoles
        })
      )
      .then(data => {
        this.props.dispatch(
          notify({
            message: "Role successfully updated",
            type: "success"
          })
        );
      })
      .catch(err => {
        this.props.dispatch(
          notify({
            message: `Error while updating role- ${err}`,
            type: "error"
          })
        );
      });
  };

  handleCancel = evt => {
    evt.preventDefault();
    this.props.dispatch({ type: "REMOVE_MODAL" });
  };

  render() {
    let { siteZUID, roleZUID } = this.state;
    return (
      <div className={styles.modalWrapper}>
        <h3>Edit Granular Role Permissions for: {this.state.role.name}</h3>
        <div className={styles.selectCollection}>
          <header>
            <h3>Collection</h3>
            <h3>create</h3>
            <h3>read</h3>
            <h3>update</h3>
            <h3>delete</h3>
            <h3>publish</h3>
            <h3>grant</h3>
            <h3>super</h3>
          </header>
          <main>
            <form name="permissionsForm">
              {Object.keys(this.state.collections).map((collectionZUID, i) => {
                return this.state.granularRoles[collectionZUID] ? (
                  <article key={i}>
                    <span>{this.state.collections[collectionZUID].label}</span>
                    <span>
                      <input
                        type="checkbox"
                        onChange={this.handleClick}
                        checked={
                          this.state.granularRoles[collectionZUID].create
                        }
                        value={`create,${
                          this.state.collections[collectionZUID].zuid
                        }`}
                      />
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        onChange={this.handleClick}
                        checked={this.state.granularRoles[collectionZUID].read}
                        value={`read,${
                          this.state.collections[collectionZUID].zuid
                        }`}
                      />
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        onChange={this.handleClick}
                        checked={
                          this.state.granularRoles[collectionZUID].update
                        }
                        value={`update,${
                          this.state.collections[collectionZUID].zuid
                        }`}
                      />
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        onChange={this.handleClick}
                        checked={
                          this.state.granularRoles[collectionZUID].delete
                        }
                        value={`delete,${
                          this.state.collections[collectionZUID].zuid
                        }`}
                      />
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        onChange={this.handleClick}
                        checked={
                          this.state.granularRoles[collectionZUID].publish
                        }
                        value={`publish,${
                          this.state.collections[collectionZUID].zuid
                        }`}
                      />
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        onChange={this.handleClick}
                        checked={this.state.granularRoles[collectionZUID].grant}
                        value={`grant,${
                          this.state.collections[collectionZUID].zuid
                        }`}
                      />
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        onChange={this.handleClick}
                        checked={this.state.granularRoles[collectionZUID].super}
                        value={`super,${
                          this.state.collections[collectionZUID].zuid
                        }`}
                      />
                    </span>
                  </article>
                ) : (
                  <Loader key={i}/>
                );
              })}
              <div className={styles.buttons}>
              <Button onClick={this.handleSubmit}>Apply</Button>
              <Button onClick={this.handleCancel}>Cancel</Button>
              </div>
            </form>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sitesCollections: state.sitesCollections,
    sitesRoles: state.sitesRoles
  };
};

export default connect(mapStateToProps)(EditRole);
