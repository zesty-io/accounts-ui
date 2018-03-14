import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserAccess extends Component {
  render() {
    return (
      <div>
        <Input name='newUser' type='text' />
        <Button name='newUserSubmit'>Send Invite</Button>
        <table className="users">
          <tbody>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Active</th>
              <th>Boss</th>
            </tr>
            {this.props.site.users.map((user, i) => {
              return (
                <tr key={i}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(state => state)(UserAccess)