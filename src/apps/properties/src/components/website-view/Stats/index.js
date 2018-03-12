import React, { Component } from 'react'
import { connect } from 'react-redux'

class Stats extends Component {
  render() {
    return (
      <div>
        <h3>Requests</h3>
        <table>
          <tbody>
            <tr>
              <th>This Month</th><th>All Time</th>
            </tr>
            <tr>
              <td>Development: {this.props.site.stats.thisMonth.dev}</td>
              <td>Development: {this.props.site.stats.allTime.dev}</td>
            </tr>
            <tr>
              <td>Manager: {this.props.site.stats.thisMonth.manager}</td>
              <td>Manager: {this.props.site.stats.allTime.manager}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(state => state)(Stats)