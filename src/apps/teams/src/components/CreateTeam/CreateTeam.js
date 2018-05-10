import React, {Component} from 'react'
import {connect} from 'react-redux'

class CreateTeam extends Component {
  render() {
    return (
      <div> List Teams </div>
    )
  }
}

export default connect(state => state)(CreateTeam)