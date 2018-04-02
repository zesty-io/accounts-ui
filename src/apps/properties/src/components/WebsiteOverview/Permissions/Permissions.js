import React, { Component } from "react";
import { connect } from "react-redux";

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
  }
  handleEdit = evt => {
    evt.preventDefault();
  }
  handleRemove = evt => {
    evt.preventDefault();
  }
  render() {
    return (
      <div className={styles.permissionsWrapper}>
        <form className={styles.formGrid}>
          <span className={styles.label}>
            <label>Label</label>
            <Input type="text" />
          </span>
          <span className={styles.base}>
            <label>Base</label>
            <Select
              name="baseRole"
              selection={{
                value: "User",
                html: '<option value="User">User</option>'
              }}
              options={[
                {
                  value: "User",
                  html: '<option value="User">User</option>'
                },
                {
                  value: "Contributor",
                  html: '<option value="Contributor">Contributor</option>'
                },
                {
                  value: "Editor",
                  html: '<option value="Editor">Editor</option>'
                },
                {
                  value: "Admin",
                  html: '<option value="Admin">Admin</option>'
                }
              ]}
            />
          </span>
          <span className={styles.expires}>
            <label>Exires</label>
            <Input type="date" />
          </span>
          <span className={styles.collections}>
            <div className={styles.selectCollection}>
              <header>
                <h3>Collection</h3>
                <h3>view</h3>
                <h3>edit</h3>
                <h3>publish</h3>
                <h3>delete</h3>
              </header>
              <main>
                {Array.isArray(this.props.sitesUsers) && // COLLECTIONS endpoint
                  this.props.sitesUsers.map((user, i) => {
                    return (
                      <article key={i}>
                        <span>{user.lastName} </span>
                        <span>{user.staff ? "X" : ""} </span>
                        <span>{user.WebsiteCreator ? "X" : ""}</span>
                        <span>{user.staff ? "X" : ""}</span>
                        <span>{user.WebsiteCreator ? "X" : ""}</span>
                      </article>
                    );
                  })}
              </main>
            </div>
          </span>
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
  // likely need to get site specific permissions
  return state;
};

export default connect(mapStateToProps)(Permissions);
