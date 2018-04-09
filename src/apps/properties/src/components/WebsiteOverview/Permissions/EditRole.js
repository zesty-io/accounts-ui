import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Permissions.less";

import { getRole, updateRole } from "../../../store/sitesPermissions";

class EditRole extends Component {
  componentDidMount() {
    this.props.dispatch(getRole(this.props.currentRole.ZUID))
  }

  handleClick = evt => {
    evt.preventDefault()
  }

  render() {
    console.log(this.props)
    return (
      <div className={styles.modalWrapper}>
        <h3>Edit Granular Role Permissions for {this.props.currentRole.name}</h3>
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
                          value={`create-${collection.zuid}`}
                        />
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name={`read-${collection.name}`}
                          value={`read-${collection.zuid}`}
                        />
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name={`update-${collection.name}`}
                          value={`update-${collection.zuid}`}
                        />
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name={`delete-${collection.name}`}
                          value={`delete-${collection.zuid}`}
                        />
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          name={`publish-${collection.name}`}
                          value={`publish-${collection.zuid}`}
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
  console.log(state)
  return {currentRole: state.sitesPermissions.currentRole, sitesCollections: state.sitesCollections}
}

export default connect(mapStateToProps)(EditRole);
