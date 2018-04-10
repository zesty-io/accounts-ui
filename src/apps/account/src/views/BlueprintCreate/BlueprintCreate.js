import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { updateSetting, postNewBlueprint } from "../../store/userBlueprints";

import styles from "./BlueprintCreate.less";

class BlueprintCreate extends Component {
  constructor(props){
    super()
    this.state = {
      submitted: false
    }
  }
  render() {
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
            <Button
              onClick={this.handleClick}
              disabled={this.state.submitted}
            >
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
    this.props.dispatch(updateSetting({ [evt.target.name]: evt.target.value }));
  };
  handleClick = () => {
    this.setState({submitted: !this.state.submitted})
    this.props
      .dispatch(postNewBlueprint(this.props.userBlueprints.createBlueprintName))
      .then(bp => {
        this.setState({submitted: !this.state.submitted})
        return this.props.history.push(`../blueprints/${bp.ID}`);
      })
  };
}

export default withRouter(connect(state => state)(BlueprintCreate));
