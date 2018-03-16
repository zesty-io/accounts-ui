import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserAccess extends Component {
  render() {
    return (
      <div>
        <Input name='newUser' type='text' />
        <Button name='newUserSubmit'>Send Invite</Button>
        <header>
                <h3>First Name</h3>
                <h3>Last Name</h3>
                <h3>Email</h3>
                <h3>Staff</h3>
              </header>
              <main>
              {Array.isArray(this.props.siteUsers)
              ? this.props.siteUsers.map((user, i) => {
                  return (<article key={i}>
                    <span>{user.firstName} </span>
                    <span>{user.lastName} </span>
                    <span>{user.email} </span>
                    <span>{user.staff}</span>
                  </article>)
              })
              : null
            }
              </main>
      </div>
    )
  }
}

export default connect(state => state)(UserAccess)