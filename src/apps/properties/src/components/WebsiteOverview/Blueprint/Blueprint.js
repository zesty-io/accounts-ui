import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import styles from "./Blueprint.less";
class Blueprint extends Component {
  handleSelect = evt => {
    evt.preventDefault();
    this.props.history.push(`${this.props.site.ZUID}/blueprint`);
  };
  render() {
    console.log(this.props, 'props in Blueprint')
    return this.props.blueprints[this.props.site.blueprintID] instanceof
      Object ? (
      <React.Fragment>
        <article className={styles.Blueprint}>
          <header>
            <h1 className={styles.name}>
              {this.props.blueprints[this.props.site.blueprintID].name}
            </h1>
          </header>
          <main>
            <img
              src={
                this.props.blueprints[this.props.site.blueprintID].coverImage
              }
              alt="bp img"
            />
            <p>
              {this.props.blueprints[this.props.site.blueprintID].description}
            </p>
          </main>
          <Button onClick={this.handleSelect}>
            <i className="fa fa-columns" aria-hidden="true" />
            Change Blueprint
          </Button>
          <footer />
        </article>
      </React.Fragment>
    ) : (
      <section className={styles.Loading}>
        <h3>Loading Blueprint</h3>
        <Loader />
      </section>
    );
  }
}

export default withRouter(connect(state => state)(Blueprint));
