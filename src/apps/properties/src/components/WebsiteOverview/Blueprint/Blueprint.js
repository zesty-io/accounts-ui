import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class Blueprint extends Component {
  render() {
    return this.props.blueprints[this.props.site.BlueprintID] instanceof
      Object ? (
      <React.Fragment>
        <img
          src={this.props.blueprints[this.props.site.BlueprintID].MainImage}
          style={{ maxHeight: "64px", maxWidth: "64px" }}
          alt="blueprint Image"
        /><br />
        current blueprint:
        {this.props.blueprints[this.props.site.BlueprintID].Name}<br />
        {this.props.blueprints[this.props.site.BlueprintID].Description}
        <a href={this.props.blueprints[this.props.site.BlueprintID].PreviewURL}>
          View Preview
        </a>
        <NavLink to="/account/blueprints">Change Blueprint</NavLink>
      </React.Fragment>
    ) : (
      <p>loading</p>
    );
  }
}

export default connect(state => state)(Blueprint);
