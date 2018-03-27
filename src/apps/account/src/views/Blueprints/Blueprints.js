import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchAccountBlueprints } from "../../store";

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
        <h2>Blueprints</h2>
        <a className="button green fr">
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
        </a>
        <div className={styles.bptable}>
          <main className={styles.Blueprints}>
            {this.props.profile.blueprints &&
              Object.keys(this.props.profile.blueprints)
                .filter(i => {
                  if (
                    !this.props.profile.blueprints[i].Trashed &&
                    this.props.profile.blueprints[i].CreatedByUserZUID ===
                      this.props.user.zuid
                  ) {
                    return i;
                  }
                })
                .map(i => {
                  let blueprint = this.props.profile.blueprints[i];
                  return (
                    <article className={styles.Blueprint} key={i}>
                      <header>
                        <h1 className={styles.name}>{blueprint.Name}</h1>
                      </header>
                      <main>
                        <img src={blueprint.CoverImage} alt="bp img" />
                        <p>{blueprint.Description}</p>
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
