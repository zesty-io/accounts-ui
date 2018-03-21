import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./EditBlueprint.less";

class EditBlueprint extends Component {
  render() {
    return (
      <div className={styles.blueprints}>
        <p>{JSON.stringify(this.props.blueprint)}</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    blueprint: Object.keys(state.blueprints).map(i => {
      if(state.blueprints[i].ID == ownProps.match.params.id){
        return state.blueprints[i]
      }
    }).filter(i => i !== undefined)[0]
  }
}

export default withRouter(connect(mapStateToProps)(EditBlueprint));
