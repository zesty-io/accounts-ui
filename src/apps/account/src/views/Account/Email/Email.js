import React, { Component } from "react";
import { connect } from "react-redux";

import { notify } from "../../../../../../shell/store/notifications";
import { updateSetting, addEmail } from "../../../store/userProfile";

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
    if(this.props.newEmail.length){
      this.props
      .dispatch(addEmail())
      .then(data => {
        this.props.dispatch(
          notify({
            message: "Email added",
            type: "success"
          })
        );
        return this.props.dispatch({ type: "ADD_EMAIL_SUCCESS"})        
      })
      .catch(data => {
        this.props.dispatch(
          notify({
            message: "Problem adding email",
            type: "error"
          })
        );
        return this.props.dispatch({ type: "ADD_EMAIL_FAILURE"})
      });
    }else{
      this.props.dispatch(
        notify({
          message: "Please submit valid email",
          type: "error"
        })
      );
      return this.props.dispatch({ type: "ADD_EMAIL_FAILURE"})
    }

  };
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
              <article>
                <span>{this.props.email} </span>
                <span>
                  {this.props.email === this.props.EmailsVerified
                    ? "Verified"
                    : "Unverified"}
                </span>
              </article>
              {this.props.EmailsUnverified ? (
                <article>
                  <span>{this.props.EmailsUnverified}</span>
                  <span>Unverified</span>
                </article>
              ) : null}
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
    EmailsVerified: state.userProfile.EmailsVerified,
    EmailsUnverified: state.userProfile.EmailsUnverified,
    newEmail: state.userProfile.newEmail,
    ...state
  };
};

export default connect(mapStateToProps)(Email);
