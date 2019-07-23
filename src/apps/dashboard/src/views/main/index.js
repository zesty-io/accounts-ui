import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ErrorBoundary } from './err'

class Dashboard extends Component {
  render() {
    return (
      <ErrorBoundary>
        <section id="dashboard">
          <h2>Dashboard</h2>
          <h3>**INSERT FANCY GRAPHS**</h3>
        </section>
      </ErrorBoundary>
    )
  }
}

export default connect(state => state)(Dashboard)
