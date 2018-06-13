import React, {Component} from 'react'
import {connect} from 'react-redux'

class CreateTeam extends Component {
  render() {
    return (
      <div> Create Team </div>
    )
  }
}

export default connect(state => state)(CreateTeam)