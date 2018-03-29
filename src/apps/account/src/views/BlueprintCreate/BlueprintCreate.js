import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";

import { updateSetting, postNewBlueprint } from "../../store";

import styles from "./BlueprintCreate.less";

class BlueprintCreate extends Component {
  render() {
    console.log
    return (
      <section className={styles.BlueprintCreate}>
        <div className={styles.nameNew}>
          <h1>Name your new blueprint</h1>
          <Input
            type="text"
            name="createBlueprintName"
            placeholder="e.g. My New Blueprint"
            onChange={this.handleChange}
          />
          <div className={styles.controls}>
            <Button onClick={this.handleClick} disabled={this.props.profile.submitted}>
              <i className="fa fa-plus" aria-hidden="true" />
              Create New Blueprint
            </Button>
            <Link to="/settings/blueprints">
              <i className="fa fa-ban" aria-hidden="true" />
              &nbsp;Cancel
            </Link>
          </div>
        </div>
      </section>
    );
  }
  handleChange = evt => {
    this.props.dispatch(
      updateSetting({ [evt.target.name]: evt.target.value })
    );
  };
  handleClick = () => {
    this.props
      .dispatch(postNewBlueprint(this.props.profile.createBlueprintName))
      .then(data => {
        this.props.dispatch({
          type: "CREATE_BLUEPRINT_SUCCESS",
          blueprint: data.data
        });
        return data.data
      })
      .then(bp => {
        return this.props.history.push(`../blueprints/${bp.ID}`);
      })
      .catch(error => {
        console.log(error);
        return this.props.dispatch({
          type: "CREATE_BLUEPRINT_ERROR",
          error
        });
      });
  };
}

export default withRouter(connect(state => state)(BlueprintCreate));
