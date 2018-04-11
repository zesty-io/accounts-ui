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
      siteZUID,
      roleZUID
    };
  }

  handleClick = evt => {
    evt.preventDefault();
    let action = evt.target.value.split(',')[0];
    let entity = evt.target.value.split(',')[1];
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
                          this.state.role.read
                            ? this.state.role.read
                            : this.state.role.systemRole &&
                              this.state.role.systemRole.read
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
                          this.state.role.read
                            ? this.state.role.read
                            : this.state.role
                                .systemRole &&
                              this.state.role
                                .systemRole.read
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
                          this.state.role.update
                            ? this.state.role.update
                            : this.state.role
                                .systemRole &&
                              this.state.role
                                .systemRole.update
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
                          this.state.role.delete
                            ? this.state.role.delete
                            : this.state.role
                                .systemRole &&
                              this.state.role
                                .systemRole.delete
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
                          this.state.role.publish
                            ? this.state.role.publish
                            : this.state.role
                                .systemRole &&
                              this.state.role
                                .systemRole.publish
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
                          this.state.role.grant
                            ? this.state.role.grant
                            : this.state.role
                                .systemRole &&
                              this.state.role
                                .systemRole.grant
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
                          this.state.role.super
                            ? this.state.role.super
                            : this.state.role
                                .systemRole &&
                              this.state.role
                                .systemRole.super
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
