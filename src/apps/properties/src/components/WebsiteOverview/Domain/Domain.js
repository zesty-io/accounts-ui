import React, { Component } from "react";
import { connect } from "react-redux";

import { updateDomain } from "../../../store/domain"
import { notify } from "../../../../../../shell/store/notifications";

import styles from "./Domain.less";

class Domain extends Component {
  onChange = e => {
    return console.log(e.target.id)
    // use updateDomain function to handle vanity zesty or custom domains
    this.props.dispatch({
      type: "CHANGE_DOMAIN",
      type: e.target.type,
      zuid: this.props.site.zuid
    });
  };

  render() {
    return (
      <div className={styles.Domain}>
          <label>Custom Domain</label>
          <Input
            type="radio"
            name="domain"
            id="custom"
            onChange={this.onChange}
            checked={this.props.site.domainSelect === "custom" ? "checked" : ""}
          />
          <label>Vanity Domain</label>
          <Input
            type="radio"
            name="domain"
            id="vanity"
            checked={this.props.site.domainSelect === "vanity" ? "checked" : ""}
            onChange={this.onChange}
          />
          <label>No Domain</label>
          <Input
            type="radio"
            name="domain"
            id="no"
            onChange={this.onChange}
            checked={this.props.site.domain === null ? "checked" : ""}
          />
      </div>
    );
  }
}

export default connect(state => state)(Domain);
