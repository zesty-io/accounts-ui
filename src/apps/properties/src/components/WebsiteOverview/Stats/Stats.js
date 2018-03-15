import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2'

class Stats extends Component {
  render() {
    const data = {
      labels: ['This Month', 'All Time'],
      datasets: [{
        label: 'Manager',
        // data: [this.props.site.stats.thisMonth.manager, this.props.site.stats.allTime.manager],
        data: [23, 43],
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ]
      }, {
        label: 'Development',
        // data: [this.props.site.stats.thisMonth.dev, this.props.site.stats.allTime.dev],
        data: [ 14, 36 ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ]
      }]
    }
    return (
      <Bar data={data} />
    )
  }
}

export default connect(state => state)(Stats)