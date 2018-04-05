import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Permissions.less";

import {createRole} from '../../../store/sitesPermissions'

class CreateRole extends Component {
  render() {
    return (
      <div className={styles.modalWrapper}>
      <h3>Edit Granular Role Permissions</h3>
      <h4>{JSON.stringify(this.props.sitesPermissions)}</h4>
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
            this.props.sitesCollections.map((collection, i) => {
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
            })}
        </main>
      </div>
      </div>
    );
  }
}

export default connect(state => state)(CreateRole);
