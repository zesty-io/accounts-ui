import React, { Component } from "react";
import { connect } from "react-redux";

import CreateRole from './CreateRole'

import styles from "./Permissions.less";

const formatDate = date => {
  if (!date) {
    return "";
  }
  const newDate = new Date(date);
  return `${newDate.getMonth() +
    1}-${newDate.getDate()}-${newDate.getFullYear()}`;
};

class Permissions extends Component {
  componentWillUnmount() {
    this.props.dispatch({ type: "CLEAR_ROLES" });
    this.props.dispatch({ type: "CLEAR_COLLECTIONS" }); // when collections is available
  }
  handleCreate = evt => {
    evt.preventDefault();
    this.props.dispatch({ type: "NEW_MODAL", component: CreateRole})
  };
  handleEdit = evt => {
    evt.preventDefault();
  };
  handleRemove = evt => {
    evt.preventDefault();
  };
  render() {
    return (
      <div className={styles.permissionsWrapper}>
        <form className={styles.formGrid}>
          <span className={styles.label}>
            <label>Label</label>
            <Input type="text" />
          </span>
          <span className={styles.base}>
            <label>Base Role</label>
            <Select
              name="baseRole"
              selection={{
                value: "SEO",
                html: '<option value="31-71cfc74-s30">SEO</option>'
              }}
              options={[ // currently these base roles have to be hardcoded
                {
                  value: "SEO",
                  html: '<option value="31-71cfc74-s30">SEO</option>'
                },
                {
                  value: "Publisher",
                  html: '<option value="31-71cfc74-p0bl1shr">Publisher</option>'
                },
                {
                  value: "Developer",
                  html: '<option value="31-71cfc74-d3v3l0p3r">Developer</option>'
                },
                {
                  value: "Contributor",
                  html: '<option value="31-71cfc74-c0ntr1b0t0r">Contributor</option>'
                },
                {
                  value: "Admin",
                  html: '<option value="31-71cfc74-4dm13">Admin</option>'
                },
                {
                  value: "Owner",
                  html: '<option value="31-71cfc74-0wn3r">Owner</option>'
                }
              ]}
            />
          </span>
          <span className={styles.expires}>
            <label>Exipres</label>
            <Input type="date" name="expires"/>
          </span>
          {/* <span className={styles.collections}>
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
                {Array.isArray(this.props.sitesCollections) && // COLLECTIONS endpoint
                  this.props.sitesCollections.map(
                    (collection, i) => {
                      return (
                        <article key={i}>
                          <span>{collection.name}</span>
                          <span>
                            <input
                              type="checkbox"
                              name={`create-${collection.name}`}
                              value={`create-${collection.name}`}
                            />
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name={`read-${collection.name}`}
                              value={`read-${collection.name}`}
                            />
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name={`update-${collection.name}`}
                              value={`update-${collection.name}`}
                            />
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name={`delete-${collection.name}`}
                              value={`delete-${collection.name}`}
                            />
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name={`publish-${collection.name}`}
                              value={`publish-${collection.name}`}
                            />
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name={`grant-${collection.name}`}
                              value={`grant-${collection.name}`}
                            />
                          </span>
                          <span>
                            <input
                              type="checkbox"
                              name={`super-${collection.name}`}
                              value={`super-${collection.name}`}
                            />
                          </span>
                        </article>
                      );
                    }
                  )}
              </main>
            </div>
          </span> */}
          <Button className={styles.createButton} onClick={this.handleCreate}>
            Create Role
          </Button>
        </form>
        <div className={styles.currentRoles}>
          <header>
            <h3>Role</h3>
            <h3>Created</h3>
            <h3>Expires</h3>
          </header>
          <main>
            {Array.isArray(this.props.sitesRoles) &&
              this.props.sitesRoles.map((role, i) => {
                return (
                  <article key={i}>
                    <span>{role.name} </span>
                    <span>{formatDate(role.createdAt)} </span>
                    <span>{formatDate(role.Expiry)} </span>
                    <span>
                      <ButtonGroup>
                        <Button text="Edit" onClick={this.handleEdit} />
                        <Button text="Remove" onClick={this.handleRemove} />
                      </ButtonGroup>
                    </span>
                  </article>
                );
              })}
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // likely need to fetch site specific permissions
  return state;
};

export default connect(mapStateToProps)(Permissions);
