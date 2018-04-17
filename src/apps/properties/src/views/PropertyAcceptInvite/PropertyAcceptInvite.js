import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";

import { acceptInvite } from "../../store/sites";
import { notify } from "../../../../../shell/store/notifications";

import styles from "./PropertyAccept.less";

class PropertyAcceptInvite extends Component {
  constructor(props) {
    super();
    this.state = {
      submitted: false,
    };
  }
  componentDidMount() {
    //fetch site from invite
    console.log(this.props.invited)
  }
  render() {
    return (
      <section className={styles.PropertyAccept}>
          <h2>Welcome to Zesty.io</h2>
        <div className={styles.nameNew}>
          <h1>Accept the invite to get started</h1>
          <h1>SOME INFORMATION HERE ABOUT THE SITE</h1>
          <div className={styles.controls}>
            <Button onClick={this.handleClick} disabled={this.state.submitted}>
              <i className="fa fa-plus" aria-hidden="true" />
              Accept Invite
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
      .dispatch(acceptInvite(this.state.name))
      .then(data => {
        this.setState({ submitted: !this.state.submitted });
        this.props.dispatch({
          type: "REMOVE_MODAL"
        })
        this.props.history.push(`/properties/${data.data.ZUID}/`);
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
  return state.user
};

export default withRouter(connect(mapStateToProps)(PropertyAcceptInvite));

