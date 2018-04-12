import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Permissions.less";

import { getRole, updateRole } from "../../../store/sitesRoles";

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
    // create granular roles object from granular roles or the system role
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
    evt.preventDefault();
    let action = evt.target.value.split(",")[0];
    let entity = evt.target.value.split(",")[1];
    console.log(this.state);
  };

  handleSubmit = () => {
    console.log("sumbit!");
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
                return (
                  <article key={i}>
                    <span>{this.state.collections[collectionZUID].label}</span>
                    <span>
                      <input
                        type="checkbox"
                        onClick={this.handleClick}
                        name={`create,${
                          this.state.collections[collectionZUID].name
                        }`}
                        checked={
                          this.state.granularRoles[collectionZUID] && this.state.granularRoles[collectionZUID].create
                            ? this.state.granularRoles[collectionZUID].create
                            : this.state.role.systemRole &&
                              this.state.role.systemRole.create
                        }
                        value={`create,${
                          this.state.collections[collectionZUID].zuid
                        }`}
                      />
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        onClick={this.handleClick}
                        name={`read,${
                          this.state.collections[collectionZUID].name
                        }`}
                        checked={
                          this.state.granularRoles[collectionZUID] && this.state.granularRoles[collectionZUID].read
                            ? this.state.granularRoles[collectionZUID].read
                            : this.state.role.systemRole &&
                              this.state.role.systemRole.read
                        }
                        value={`read,${
                          this.state.collections[collectionZUID].zuid
                        }`}
                      />
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        onClick={this.handleClick}
                        name={`update,${
                          this.state.collections[collectionZUID].name
                        }`}
                        checked={
                          this.state.granularRoles[collectionZUID] && this.state.granularRoles[collectionZUID].update
                            ? this.state.granularRoles[collectionZUID].update
                            : this.state.role.systemRole &&
                              this.state.role.systemRole.update
                        }
                        value={`update,${
                          this.state.collections[collectionZUID].zuid
                        }`}
                      />
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        onClick={this.handleClick}
                        name={`delete,${
                          this.state.collections[collectionZUID].name
                        }`}
                        checked={
                          this.state.granularRoles[collectionZUID] && this.state.granularRoles[collectionZUID].delete
                            ? this.state.granularRoles[collectionZUID].delete
                            : this.state.role.systemRole &&
                              this.state.role.systemRole.delete
                        }
                        value={`delete,${
                          this.state.collections[collectionZUID].zuid
                        }`}
                      />
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        onClick={this.handleClick}
                        name={`publish,${
                          this.state.collections[collectionZUID].name
                        }`}
                        checked={
                          this.state.granularRoles[collectionZUID] && this.state.granularRoles[collectionZUID].publish
                            ? this.state.granularRoles[collectionZUID].publish
                            : this.state.role.systemRole &&
                              this.state.role.systemRole.publish
                        }
                        value={`publish,${
                          this.state.collections[collectionZUID].zuid
                        }`}
                      />
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        onClick={this.handleClick}
                        name={`grant,${
                          this.state.collections[collectionZUID].name
                        }`}
                        checked={
                          this.state.granularRoles[collectionZUID] && this.state.granularRoles[collectionZUID].grant
                            ? this.state.granularRoles[collectionZUID].grant
                            : this.state.role.systemRole &&
                              this.state.role.systemRole.grant
                        }
                        value={`grant,${
                          this.state.collections[collectionZUID].name
                        }`}
                      />
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        onClick={this.handleClick}
                        name={`super,${
                          this.state.collections[collectionZUID].name
                        }`}
                        checked={
                          this.state.granularRoles[collectionZUID] && this.state.granularRoles[collectionZUID].super
                            ? this.state.granularRoles[collectionZUID].super
                            : this.state.role.systemRole &&
                              this.state.role.systemRole.super
                        }
                        value={`super-${
                          this.state.collections[collectionZUID].zuid
                        }`}
                      />
                    </span>
                  </article>
                );
              })}
              <Button onClick={this.handleSubmit}>Apply</Button>
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
