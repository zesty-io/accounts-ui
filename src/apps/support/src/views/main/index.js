import React, { Component } from 'react'
import { connect } from 'react-redux'

class Support extends Component {
  render() {
    return <div>Hi!</div>
  }
}

export default connect(state => state)(Support)
