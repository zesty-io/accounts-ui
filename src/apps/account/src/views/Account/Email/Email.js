import React, { Component } from "react";
import { connect } from "react-redux";

import { notify } from "../../../../../../shell/store/notifications";
import { updateSetting, addEmail, getSettings } from "../../../store/userProfile";

import styles from "./email.less";

class Email extends Component {
  handleChange = evt => {
    if (evt.target.value.match(evt.target.pattern)) {
      return this.props.dispatch(
        updateSetting({ [evt.target.name]: evt.target.value })
      );
    } else {
      return null;
    }
  };
  handleClick = e => {
    if (this.props.newEmail.length) {
      this.props.dispatch(addEmail())
    } else {
      this.props.dispatch(
        notify({
          message: "Please submit a valid email",
          type: "error"
        })
      );
    }
  };
  render() {
    console.log("Props in email", this.props);
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
                placeholder="email@work.com"
                name="newEmail"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                className={styles.field}
                required
                onChange={this.handleChange}
              />
              <Button
                text="Add Email"
                onClick={this.handleClick}
                className={styles.button}
                disabled={this.props.userProfile.submittedEmail}
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
                        {
                          this.props.email === email ?
                          <span>Verified (Primary)</span>
                          :
                          <span>Verified</span>
                        }
                        
                      </article>
                    );
                  })
                : null}
              {this.props.unverifiedEmails
                ? this.props.unverifiedEmails.map((email, i) => {
                    return (
                      <article key={i}>
                        <span>{email}</span>
                        {
                          this.props.email === email ?
                          <span>Unverified (Primary)</span>
                          :
                          <span>Unverified</span>
                        }
                        
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
    email: state.userProfile.email,
    unverifiedEmails: state.userProfile.unverifiedEmails
      ? state.userProfile.unverifiedEmails.split(",")
      : null,
    verifiedEmails: state.userProfile.verifiedEmails
      ? state.userProfile.verifiedEmails.split(",")
      : null,
    newEmail: state.userProfile.newEmail,
    ...state
  };
};

export default connect(mapStateToProps)(Email);
