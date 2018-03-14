import React, { Component } from 'react'
import { connect } from 'react-redux'

class Access extends Component {
  render() {
    return (
      <div>
        <h3>Users</h3>
        <table className="users">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
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

export default connect(state => state)(Access)