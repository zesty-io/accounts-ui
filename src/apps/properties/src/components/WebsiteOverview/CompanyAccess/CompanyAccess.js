import React, { Component } from 'react'
import { connect } from 'react-redux'

class CompanyAccess extends Component {
  render() {
    return (
      <div>
        <table className="users">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
            
                <tr>
                  <td>A Company</td>
                  <td>contactInfo</td>
                  <td>role/permissions</td>
                </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(state => state)(CompanyAccess)