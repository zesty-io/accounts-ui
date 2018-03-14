import React, {Component} from 'react'
import {connect} from 'react-redux'

class Overview extends Component {
  render() {
    return (
      <div>
        <h3>Overview</h3>
        <p>Plan: {this.props.site.metadata.plan}</p>
        <p>Contributors: {this.props.site.metadata.contributors}</p>
        <p>Created On: {this.props.site.metadata.createdOn}</p>
        <p>Created By: {this.props.site.metadata.createdBy}</p>
        <p>Status: {this.props.site.metadata.status}</p>
      </div>
    )
  }
}

export default connect(state => state)(Overview)