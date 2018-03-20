import React, { Component } from 'react'
import { connect } from 'react-redux'

class Actions extends Component {
  render() {
    return (
      <div>
        <table className="users">
          <tbody>
            <tr>
              <th>Admin Name</th>
              <th>Object</th>
              <th>Action</th>
              <th>Date</th>
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

export default connect(state => state)(Actions)