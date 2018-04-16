import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";

import { postNewSite } from "../../store/sites";
import { notify } from "../../../../../shell/store/notifications";

import styles from "./PropertyCreate.less";

class PropertyCreateFirst extends Component {
  constructor(props) {
    super();
    this.state = {
      submitted: false,
      name: ""
    };
  }
  render() {
    return (
      <section className={styles.PropertyCreate}>

          <h1>Welcome to Zesty.io</h1>
        <div className={styles.nameNew}>
        <h2>In order to get started, you need to create your first web property</h2>
          <h3>Name your new web property</h3>
          <Input
            type="text"
            name="propertyName"
            placeholder="e.g. My Blog or Company Marketing Website"
            onChange={this.handleChange}
          />
          <div className={styles.controls}>
            <Button onClick={this.handleClick} disabled={this.state.submitted}>
              <i className="fa fa-plus" aria-hidden="true" />
              {this.state.submitted
                ? "Creating Your Property"
                : "Create New Property"}
            </Button>
            <Button onClick={() => this.props.dispatch({ type: "REMOVE_MODAL"})}>
              <i className="fa fa-ban" aria-hidden="true" />
              &nbsp;Cancel
            </Button>
          </div>
        </div>
      </section>
    );
  }
  handleChange = evt => {
    this.setState({ name: evt.target.value });
  };
  handleClick = () => {
    this.setState({ submitted: !this.state.submitted });
    this.props
      .dispatch(postNewSite(this.state.name))
      .then(data => {
        this.setState({ submitted: !this.state.submitted });
        this.props.dispatch({
          type: "REMOVE_MODAL"
        })
        this.props.history.push(`/properties/${data.data.ZUID}/blueprint`);
      })
      .catch(err => {
        this.setState({ submitted: !this.state.submitted });
        this.props.dispatch(
          notify({
            message: `Problem creating site: ${err}`,
            type: "error"
          })
        );
      });
  };
}

const mapStateToProps = state => {
  return { ...state.createSite };
};

export default withRouter(connect(mapStateToProps)(PropertyCreateFirst));
