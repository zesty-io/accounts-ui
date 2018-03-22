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
        <form name="signup" className={styles.SignupForm} onSubmit={this.handleSignup}>
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
            <Input type="checkbox" required className={styles.checkbox} name="eula" />
          </label>
          <Button type="submit">Create An Account</Button>
          <AppLink to="/login">Already have an account?</AppLink>
        </form>
      </section>
    );
  }
  handleSignup = evt => {
    evt.preventDefault();

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
        if (!json.error) {//this is in place of a code === 201, server only returns an error, no code
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
