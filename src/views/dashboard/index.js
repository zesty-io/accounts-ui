import React, { Component } from 'react'
import {connect} from 'react-redux'

class Dashboard extends Component {
  render() {
    return (
      <section id="dashboard">
        <h2>Dashboard</h2>
      </section>
    )
  }
}

export default connect(state => state)(Dashboard)
