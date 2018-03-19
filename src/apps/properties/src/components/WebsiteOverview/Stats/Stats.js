import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2'

class Stats extends Component {
  render() {
    let consistentFakeStats = this.props.sites[this.props.site].ID.toString().split('')
    const data = {
      labels: ['This Month', 'All Time'],
      datasets: [
        {
          label: 'Manager',
          // data: [this.props.site.stats.thisMonth.manager, this.props.site.stats.allTime.manager],
          data: [consistentFakeStats[1], consistentFakeStats[3]],
          backgroundColor: [
            'rgba(153, 102, 255, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ]
        },
        {
          label: 'Development',
          // data: [this.props.site.stats.thisMonth.dev, this.props.site.stats.allTime.dev],
          data: [consistentFakeStats[0], consistentFakeStats[5]],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ]
        }
      ]
    }
    return <Bar data={data} />
  }
}

export default connect(state => state)(Stats)
