import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Permissions.less";

import { getRole, updateRole } from "../../../store/sitesRoles";

class EditRole extends Component {

  handleClick = evt => {
    evt.preventDefault();
    const PermissionValues = Object.keys(document.forms.permissionsForm).map(
      (point, i) => {
        console.log(document.forms.permissionsForm[i].value);
      }
    );
  };

  render() {
    let { siteZUID, roleZUID } = this.props.props;
    return siteZUID && roleZUID && this.props.sitesRoles[siteZUID][roleZUID].ZUID ? (
      <div className={styles.modalWrapper}>
        <h3>
          Edit Granular Role Permissions for:{" "}
          {this.props.sitesRoles[siteZUID][roleZUID].name}
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
            <h3>super</h3>
          </header>
          <main>
            <form name="permissionsForm">
              {this.props.sitesCollections[siteZUID] instanceof Object && // COLLECTIONS endpoint
                Object.keys(this.props.sitesCollections[siteZUID]).map(
                  (collectionZUID, i) => {
                    return (
                      <article key={i}>
                        <span>
                          {
                            this.props.sitesCollections[siteZUID][
                              collectionZUID
                            ].label
                          }
                        </span>
                        <span>
                          <input
                            type="checkbox"
                            name={`create-${
                              this.props.sitesCollections[siteZUID][
                                collectionZUID
                              ].name
                            }`}
                            checked={
                              this.props.sitesRoles[siteZUID][roleZUID].create
                                ? this.props.sitesRoles[siteZUID][roleZUID]
                                    .create
                                : this.props.sitesRoles[siteZUID][roleZUID]
                                    .systemRole &&
                                  this.props.sitesRoles[siteZUID][roleZUID]
                                    .systemRole.create
                            }
                            value={`create-${
                              this.props.sitesCollections[siteZUID][
                                collectionZUID
                              ].zuid
                            }`}
                          />
                        </span>
                        <span>
                          <input
                            type="checkbox"
                            name={`read-${
                              this.props.sitesCollections[siteZUID][
                                collectionZUID
                              ].name
                            }`}
                            checked={
                              this.props.sitesRoles[siteZUID][roleZUID].read
                                ? this.props.sitesRoles[siteZUID][roleZUID].read
                                : this.props.sitesRoles[siteZUID][roleZUID]
                                    .systemRole &&
                                  this.props.sitesRoles[siteZUID][roleZUID]
                                    .systemRole.read
                            }
                            value={`read-${
                              this.props.sitesCollections[siteZUID][
                                collectionZUID
                              ].zuid
                            }`}
                          />
                        </span>
                        <span>
                          <input
                            type="checkbox"
                            name={`update-${
                              this.props.sitesCollections[siteZUID][
                                collectionZUID
                              ].name
                            }`}
                            checked={
                              this.props.sitesRoles[siteZUID][roleZUID].update
                                ? this.props.sitesRoles[siteZUID][roleZUID]
                                    .update
                                : this.props.sitesRoles[siteZUID][roleZUID]
                                    .systemRole &&
                                  this.props.sitesRoles[siteZUID][roleZUID]
                                    .systemRole.update
                            }
                            value={`update-${
                              this.props.sitesCollections[siteZUID][
                                collectionZUID
                              ].zuid
                            }`}
                          />
                        </span>
                        <span>
                          <input
                            type="checkbox"
                            name={`delete-${
                              this.props.sitesCollections[siteZUID][
                                collectionZUID
                              ].name
                            }`}
                            checked={
                              this.props.sitesRoles[siteZUID][roleZUID].delete
                                ? this.props.sitesRoles[siteZUID][roleZUID]
                                    .delete
                                : this.props.sitesRoles[siteZUID][roleZUID]
                                    .systemRole &&
                                  this.props.sitesRoles[siteZUID][roleZUID]
                                    .systemRole.delete
                            }
                            value={`delete-${
                              this.props.sitesCollections[siteZUID][
                                collectionZUID
                              ].zuid
                            }`}
                          />
                        </span>
                        <span>
                          <input
                            type="checkbox"
                            name={`publish-${
                              this.props.sitesCollections[siteZUID][
                                collectionZUID
                              ].name
                            }`}
                            checked={
                              this.props.sitesRoles[siteZUID][roleZUID].publish
                                ? this.props.sitesRoles[siteZUID][roleZUID]
                                    .publish
                                : this.props.sitesRoles[siteZUID][roleZUID]
                                    .systemRole &&
                                  this.props.sitesRoles[siteZUID][roleZUID]
                                    .systemRole.publish
                            }
                            value={`publish-${
                              this.props.sitesCollections[siteZUID][
                                collectionZUID
                              ].zuid
                            }`}
                          />
                        </span>
                        <span>
                          <input
                            type="checkbox"
                            name={`grant-${
                              this.props.sitesCollections[siteZUID][
                                collectionZUID
                              ].name
                            }`}
                            checked={
                              this.props.sitesRoles[siteZUID][roleZUID].grant
                                ? this.props.sitesRoles[siteZUID][roleZUID]
                                    .grant
                                : this.props.sitesRoles[siteZUID][roleZUID]
                                    .systemRole &&
                                  this.props.sitesRoles[siteZUID][roleZUID]
                                    .systemRole.grant
                            }
                            value={`grant-${
                              this.props.sitesCollections[siteZUID][
                                collectionZUID
                              ].name
                            }`}
                          />
                        </span>
                        <span>
                          <input
                            type="checkbox"
                            name={`super-${
                              this.props.sitesCollections[siteZUID][
                                collectionZUID
                              ].name
                            }`}
                            checked={
                              this.props.sitesRoles[siteZUID][roleZUID].super
                                ? this.props.sitesRoles[siteZUID][roleZUID]
                                    .super
                                : this.props.sitesRoles[siteZUID][roleZUID]
                                    .systemRole &&
                                  this.props.sitesRoles[siteZUID][roleZUID]
                                    .systemRole.super
                            }
                            value={`super-${
                              this.props.sitesCollections[siteZUID][
                                collectionZUID
                              ].zuid
                            }`}
                          />
                        </span>
                      </article>
                    );
                  }
                )}
              <Button onClick={this.handleClick}>Apply</Button>
            </form>
          </main>
        </div>
      </div>
    ) : (
      <LOADER />
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
