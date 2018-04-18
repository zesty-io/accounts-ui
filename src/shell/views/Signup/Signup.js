import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import styles from "./Signup.less";
import { request } from "../../../util/request";
import { notify } from "../../store/notifications";
import { parseUrl } from "../../../util/parseUrl";
import config from "../../../shell/config";

class Signup extends Component {
  constructor(props) {
    super();
    this.state = {
      message: "",
      submitted: false,
      email: "",
      firstName: "",
      lastName: "",
      pass: "",
      eula: false
    };
  }
  componentDidMount() {
    const invite = parseUrl(window.location.href);
    if (invite.email) {
      this.setState({ email: invite.email });
    }
    if (invite) {
      this.props.dispatch({
        type: "USER_INVITED",
        invite
      });
    }
  }
  handleChange = evt => {
    return this.setState({ [evt.target.name]: evt.target.value });
  };
  render() {
    return (
      <section className={styles.Signup}>
        <form
          name="signup"
          className={styles.SignupForm}
          onSubmit={this.handleSignup}
        >
          <img src="/zesty-io-logo.svg" />
          {this.state.message ? (
            <p className={styles.error}>
              <i className="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;{
                this.state.message
              }
            </p>
          ) : null}
          <label>
            <p>Email Address</p>
            <Input
              className={styles.input}
              type="email"
              placeholder="e.g. hello@zesty.io"
              required
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <p>First Name</p>
            <Input
              className={styles.input}
              type="text"
              placeholder="Zesty"
              required
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <p>Last Name</p>
            <Input
              className={styles.input}
              type="text"
              placeholder=""
              required
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <p>Password</p>
            <h5>Minimum 8 characters with at least</h5>
            <h5> one number, uppercase and lowercase letter.</h5>
            <Input
              className={styles.input}
              type="password"
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[?=.*[a-zA-Z0-9!@#$%^&()<>.,:;[\]{}\-_.+,/]{8,}$"
              name="pass"
              value={this.state.pass}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <h5>I have read and agree to the</h5>
            <a
              href="https://www.zesty.io/en-us/about/end-user-license-agreement/"
              target="_blank"
            >
              End User License Agreement
            </a>
            <Input
              type="checkbox"
              required
              className={styles.checkbox}
              name="eula"
              checked={this.state.eula}
              onChange={this.handleChange}
            />
          </label>
          <Button type="submit" disabled={this.state.submitted}>
            Create An Account
          </Button>
          <AppLink to="/login">Already have an account?</AppLink>
        </form>
      </section>
    );
  }
  handleSignup = evt => {
    evt.preventDefault();
    this.setState({ submitted: true });
    request(`${config.API_ACCOUNTS}/users`, {
      method: "POST",
      json: true,
      body: {
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.pass
      }
    })
      .then(json => {
        if (!json.error) {
          //this is in place of a code === 201, server only returns an error, no code
          // Log user in after signing up
          this.props.dispatch({
            type: "FETCH_USER_SUCCESS",
            user: json.data
          });
          request(`${config.API_AUTH}/login`, {
            body: {
              email: this.state.email,
              password: this.state.pass
            }
          })
            .then(json => {
              if (!json.error) {
                // in place of 200 code
                this.props.dispatch({
                  type: "FETCH_AUTH_SUCCESS",
                  zuid: json.meta.userZuid,
                  auth: true
                });
              } else {
                // if the user was created but login failed
                // send them to the login view
                notify({
                  message: "There was a problem loggin in",
                  type: "error"
                });
                this.props.history.push("/login");
              }
            })
            .catch(err => {
              notify({
                message: "There was a problem loggin in",
                type: "error"
              });
              console.table(err);
            });
        } else {
          this.setState({
            message: json.data.error
          });
        }
      })
      .catch(err => {
        this.props.dispatch(
          notify({
            message: "There was a problem creating your account",
            type: "error"
          })
        );
        console.table(err);
      });
  };
}

export default withRouter(connect(state => state)(Signup));
