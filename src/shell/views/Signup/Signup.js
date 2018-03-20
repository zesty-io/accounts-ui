import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./Signup.less";
import { request } from "../../../util/request";
import config from "../../../shell/config";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }
  render() {
    return (
      <section className={styles.Signup}>
        <form name="signup" className={styles.SignupForm}>
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
              type="text"
              placeholder="e.g. hello@zesty.io"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              name="email"
            />
          </label>
          <label>
            <p>First Name</p>
            <Input
              className={styles.input}
              type="text"
              placeholder="Zesty"
              name="firstName"
            />
          </label>
          <label>
            <p>Last Name</p>
            <Input
              className={styles.input}
              type="text"
              placeholder=""
              name="lastName"
            />
          </label>
          <label>
            <p>Password</p>
            <h5>Minimum 8 characters with at least</h5>
            <h5> one number, uppercase and lowercase letter.</h5>
            <Input
              className={styles.input}
              type="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
              name="pass"
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
            <Input type="checkbox" className={styles.checkbox} name="eula" />
          </label>
          <Button onClick={this.handleSignup}>Create An Account</Button>
          <AppLink to="/login">Already have an account?</AppLink>
        </form>
      </section>
    );
  }
  handleSignup = evt => {
    evt.preventDefault();
    // handle some form validation
    if (
      !document.forms.signup.email.value.match(
        document.forms.signup.email.pattern
      )
    ) {
      return this.setState({ message: "Please use a valid email address" });
    }
    if (document.forms.signup.firstName.value.length < 1) {
      return this.setState({ message: "You must enter a first name." });
    }
    if (document.forms.signup.lastName.value.length < 1) {
      return this.setState({ message: "You must enter a last name." });
    }
    if (
      !document.forms.signup.pass.value.match(
        document.forms.signup.pass.pattern
      )
    ) {
      return this.setState({
        message: "Password does not meet our minimum specification."
      });
    }
    if (document.forms.signup.eula.checked === false) {
      return this.setState({
        message: "You must agree to our license terms to continue."
      });
    }

    request(`http://${config.API_ACCOUNTS}/users`, {
      method: "POST",
      json: true,
      body: {
        email: document.forms.signup.email.value,
        firstName: document.forms.signup.firstName.value,
        lastName: document.forms.signup.lastName.value,
        password: document.forms.signup.pass.value
      }
    })
      .then(json => {
        console.log("USER: ", json);
        if (json.code === 201) {
          // Log user in after signing up
          request(`http://${config.API_AUTH}/login`, {
            body: {
              email: document.forms.signup.email.value,
              password: document.forms.signup.pass.value
            }
          })
            .then(json => {
              if (json.code === 200) {
                this.props.dispatch({
                  type: "FETCH_AUTH_SUCCESS",
                  zuid: json.meta.userZuid,
                  auth: true
                });
              } else {
                // if the user was created but login failed
                // send them to the login view
                window.location = "/login";
              }
            })
            .catch(err => {
              console.table(err);
            });
        } else {
          this.setState({
            message: json.data.error
          });
        }
      })
      .catch(err => {
        console.table(err);
      });
  };
}

export default connect(state => state)(Signup);
