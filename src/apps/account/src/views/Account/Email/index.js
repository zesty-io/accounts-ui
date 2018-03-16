import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateSetting, addEmail } from '../../../store'
import styles from './email.less'

class Email extends Component {
  handleChange = e => {
    this.props.dispatch(updateSetting({ [e.target.name]: e.target.value }))
  }
  handleClick = e => {
    this.props.dispatch(addEmail())
  }
  render() {
    return (
      <section className={styles.profileEmail}>
        <h2>Emails</h2>
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
                placeholder="Email"
                name="newEmail"
                value={this.props.newEmail}
                onChange={this.handleChange}
              />
              <Button text="Add Email" onClick={this.handleClick} />
          </footer>
              <header>
                <h3>Email</h3>
                <h3>Options</h3>
              </header>
              <main>
              {this.props.emails.map((email, i) => (
                <article key={i}>
                  <span>{email.email} </span>
                  <span>{email.options}</span>
                </article>
              ))}
              </main>

          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return { emails: state.profile.emails }
}

export default connect(mapStateToProps)(Email)
