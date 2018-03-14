import React, { Component } from 'react'
import {connect} from 'react-redux'

class Actions extends Component {
  render() {
    return (
      <h3>ACTIONS</h3>
    )
  }
}

export default connect(state => state)(Actions) 