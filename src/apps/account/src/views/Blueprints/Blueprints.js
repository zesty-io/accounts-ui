import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchAccountBlueprints } from "../../store/userBlueprints";

import styles from "./Blueprint.less";

class Blueprints extends Component {
  componentDidMount() {
    this.props.dispatch(fetchAccountBlueprints());
  }

  handleClick(path) {
    this.props.history.push(path);
  }
  render() {
    return (
      <div className={styles.blueprints}>
        <h1 className={styles.title}>Blueprints</h1>
        <div className={styles.message}>
          <Button onClick={() => this.handleClick("blueprints/create")}>
            <i className="fa fa-columns" aria-hidden="true" />
            Add Blueprint
          </Button>
          <h5>
            In this area you can manage your own custom Blueprints. Learn how to
            create and maintain your own Blueprints using GitHub through this.
            You may share Blueprints by passing your GitHub repo url to a
            co-worker or friend. You may use other public Blueprints by forking
            their repositories, and copying the Github repository url.
          </h5>
        </div>
        <div className={styles.BlueprintView}>
          <main className={styles.Blueprints}>
            {this.props.userBlueprints &&
              Object.keys(this.props.userBlueprints)
                .filter(i => {
                  if (
                    !this.props.userBlueprints[i].trashed &&
                    this.props.userBlueprints[i].createdByUserZUID ===
                      this.props.user.ZUID
                  ) {
                    return i;
                  }
                })
                .map(i => {
                  let blueprint = this.props.userBlueprints[i];
                  return (
                    <article className={styles.Blueprint} key={i}>
                      <header>
                        <h1 className={styles.name}>{blueprint.name}</h1>
                      </header>
                      <main>
                        <img src={blueprint.coverImage} alt="bp img" />
                        <p>{blueprint.description}</p>
                      </main>
                      <Button
                        onClick={() => this.handleClick(`/settings/blueprints/${blueprint.ID}`)}
                      >
                        <i className="fa fa-columns" aria-hidden="true" />
                        Edit
                      </Button>
                      <footer />
                    </article>
                  );
                })}
          </main>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(state => state)(Blueprints));
