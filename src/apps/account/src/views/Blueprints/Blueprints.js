import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAccountBlueprints } from "../../store";

import styles from "./Blueprint.less";

class Blueprints extends Component {
  componentDidMount() {
    this.props.dispatch(fetchAccountBlueprints());
  }

  handleClick() {}
  render() {
    return (
      <div className={styles.blueprints}>
        <h2>Blueprints</h2>
        <a className="button green fr">
          <Button onClick={this.handleSelect}>
            <i className="fa fa-columns" aria-hidden="true" />
            Add Blueprint
          </Button>
          <h5>
            In this area you can manage your own custom Blueprints. Learn how
            to create and maintain your own Blueprints using GitHub through
            this. You may share Blueprints by passing your GitHub repo url to a
            co-worker or friend. You may use other public Blueprints by forking
            their repositories, and copying the Github repository url.
          </h5>
        </a>
        <div className={styles.bptable}>
          <main className={styles.Blueprints}>
            {Object.keys(this.props.blueprints)
              .filter(i => {
                if (!this.props.blueprints[i].Trashed
                  && this.props.blueprints[i].CreatedByUserZUID === this.props.user.zuid) {
                  return i;
                }
              })
              .map(i => {
                let blueprint = this.props.blueprints[i];
                return (
                  <article className={styles.Blueprint} key={i}>
                    <header>
                      <h1 className={styles.name}>{blueprint.Name}</h1>
                    </header>
                    <main>
                      <img src={blueprint.CoverImage} alt="bp img" />
                      <p>{blueprint.Description}</p>
                    </main>
                    <Button onClick={this.handleSelect}>
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

export default connect(state => state)(Blueprints);
