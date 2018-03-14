import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Bar} from 'react-chartjs-2'

class Stats extends Component {
  render() {
    const data = {
      labels: ['This Month', 'All Time'],
      datasets: [{
        label: 'Manager',
        data: [this.props.site.stats.thisMonth.manager, this.props.site.stats.allTime.manager],
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
          'rgba(153, 102, 255, 0.2)'
      ]
      },{
        label: 'Development',
        data: [this.props.site.stats.thisMonth.dev, this.props.site.stats.allTime.dev],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)'
      ]
      }]
    }
    return (
      <div>
        <h3>Requests</h3>
        <Bar data={data} />
              {/* <td>Development: {this.props.site.stats.thisMonth.dev}</td>
              <td>Development: {this.props.site.stats.allTime.dev}</td>
            </tr>
            <tr>
              <td>Manager: {this.props.site.stats.thisMonth.manager}</td>
              <td>Manager: {this.props.site.stats.allTime.manager}</td> */}
      </div>
    )
  }
}

export default connect(state => state)(Stats)