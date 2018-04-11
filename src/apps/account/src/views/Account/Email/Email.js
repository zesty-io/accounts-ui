import React, { Component } from "react";
import { connect } from "react-redux";

import { notify } from "../../../../../../shell/store/notifications";
import {
  updateProfile,
  addEmail,
  fetchUser
} from "../../../../../../shell/store/user";

import styles from "./email.less";

class Email extends Component {
  constructor(props) {
    super();
    this.state = {
      submitted: false
    };
  }
  handleChange = evt => {
    if (evt.target.value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/g)) { // this does not allow caps
      return this.props.dispatch(
        updateProfile({ [evt.target.name]: evt.target.value })
      );
    } else {
      return null;
    }
  }

  handleClick = e => {
    if (this.props.newEmail.length) {
      this.setState({ submitted: !this.state.submitted });
      this.props.dispatch(addEmail()).then(data => {
        this.setState({ submitted: !this.state.submitted });
      });
    } else {
      this.props.dispatch(
        notify({
          message: "Please submit a valid email",
          type: "error"
        })
      );
    }
  }

  render() {
    return (
      <section className={styles.profileEmail}>
        <div>
          <div className="info">
            <p>
              <strong>Tip: Why set up multiple emails?</strong>
            </p>
            <p>
              Setting up multiple emails lets you accept all of your account
              invitations in one place.
            </p>
          </div>
          <div className={styles.emailTable}>
            <footer>
              <Input
                type="text"
                placeholder="email@domain.com"
                name="newEmail"
                className={styles.field}
                required
                onChange={this.handleChange}
              />
              <Button
                text="Add Email"
                onClick={this.handleClick}
                className={styles.button}
                disabled={this.state.submitted}
              />
            </footer>
            <header>
              <h3>Email</h3>
              <h3>Options</h3>
            </header>
            <main>
              {this.props.verifiedEmails
                ? this.props.verifiedEmails.map((email, i) => {
                    return (
                      <article key={i}>
                        <span>{email}</span>
                        {this.props.email === email ? (
                          <span>Verified (Primary)</span>
                        ) : (
                          <span>Verified</span>
                        )}
                      </article>
                    );
                  })
                : null}
              {this.props.unverifiedEmails
                ? this.props.unverifiedEmails.map((email, i) => {
                    return (
                      <article key={i}>
                        <span>{email}</span>
                        {this.props.email === email ? (
                          <span>Unverified (Primary)</span>
                        ) : (
                          <span>Unverified</span>
                        )}
                      </article>
                    );
                  })
                : null}
            </main>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.user.email,
    unverifiedEmails: state.user.unverifiedEmails
      ? state.user.unverifiedEmails.split(",")
      : null,
    verifiedEmails: state.user.verifiedEmails
      ? state.user.verifiedEmails.split(",")
      : null,
    newEmail: state.user.newEmail || "",
    ...state
  };
};

export default connect(mapStateToProps)(Email);
