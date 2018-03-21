import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";

import styles from './Blueprint.less'
class Blueprint extends Component {
  render() {
    return this.props.blueprints[this.props.site.blueprintID] instanceof
      Object ? (
      <React.Fragment>
        <article className={styles.Blueprint}>
          <header>
            <h1 className={styles.name}>
              {this.props.blueprints[this.props.site.blueprintID].Name}
            </h1>
          </header>
          <main>
            <img
              src={
                this.props.blueprints[this.props.site.blueprintID].CoverImage
              }
              alt="bp img"
            />
            <p>
              {this.props.blueprints[this.props.site.blueprintID].Description}
            </p>
          </main>
          <Link to={`${this.props.site.ZUID}/blueprint`}>
          <Button onClick={this.handleSelect}>
            <i className="fa fa-columns" aria-hidden="true" />
            Change Blueprint
          </Button>
          </Link>
          <footer />
        </article>
      </React.Fragment>
    ) : (
      <p>loading</p>
    );
  }
}

export default connect(state => state)(Blueprint);
