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
          <h2>Welcome to Zesty.io</h2>
        <div className={styles.nameNew}>
        <p>create your first web property to get started</p>
          <h1>Name your property</h1>
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
                : "Create Your First Property"}
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
