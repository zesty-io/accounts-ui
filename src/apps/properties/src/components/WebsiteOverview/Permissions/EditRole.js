import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Permissions.less";

import { getRole, updateRole } from "../../../store/sitesPermissions";

class EditRole extends Component {
  componentDidMount() {
    this.props.dispatch(getRole(this.props.currentRole.ZUID));
  }

  handleClick = evt => {
    evt.preventDefault();
  };

  render() {
    return (
      <div className={styles.modalWrapper}>
        <h3>
          Edit Granular Role Permissions for {this.props.currentRole.name}
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
              {Array.isArray(this.props.sitesCollections) && // COLLECTIONS endpoint
                this.props.sitesCollections.map((collection, i) => {
                  return (
                    <article key={i}>
                      <span>{collection.label}</span>
                      <span>
                        <input
                          type="checkbox"
                          name={`create-${collection.name}`}
                          checked={
                            this.props.currentRole.create
                              ? this.props.currentRole.create
                              : this.props.currentRole.systemRole &&
                                this.props.currentRole.systemRole.create
                          }
                          value={`create-${collection.zuid}`}
                        />
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name={`read-${collection.name}`}
                          checked={
                            this.props.currentRole.read
                              ? this.props.currentRole.read
                              : this.props.currentRole.systemRole &&
                                this.props.currentRole.systemRole.read
                          }
                          value={`read-${collection.zuid}`}
                        />
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name={`update-${collection.name}`}
                          checked={
                            this.props.currentRole.update
                              ? this.props.currentRole.update
                              : this.props.currentRole.systemRole &&
                                this.props.currentRole.systemRole.update
                          }
                          value={`update-${collection.zuid}`}
                        />
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name={`delete-${collection.name}`}
                          checked={
                            this.props.currentRole.delete
                              ? this.props.currentRole.delete
                              : this.props.currentRole.systemRole &&
                                this.props.currentRole.systemRole.delete
                          }
                          value={`delete-${collection.zuid}`}
                        />
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name={`publish-${collection.name}`}
                          checked={
                            this.props.currentRole.publish
                              ? this.props.currentRole.publish
                              : this.props.currentRole.systemRole &&
                                this.props.currentRole.systemRole.publish
                          }
                          value={`publish-${collection.zuid}`}
                        />
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name={`grant-${collection.name}`}
                          checked={
                            this.props.currentRole.grant
                              ? this.props.currentRole.grant
                              : this.props.currentRole.systemRole &&
                                this.props.currentRole.systemRole.grant
                          }
                          value={`grant-${collection.name}`}
                        />
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name={`super-${collection.name}`}
                          checked={
                            this.props.currentRole.super
                              ? this.props.currentRole.super
                              : this.props.currentRole.systemRole &&
                                this.props.currentRole.systemRole.super
                          }
                          value={`super-${collection.zuid}`}
                        />
                      </span>
                    </article>
                  );
                })}
              <Button onClick={this.handleClick}>Apply</Button>
            </form>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentRole: state.sitesPermissions.currentRole,
    sitesCollections: state.sitesCollections
  };
};

export default connect(mapStateToProps)(EditRole);
