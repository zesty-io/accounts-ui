import React, {Component} from 'react'
import {connect} from 'react-redux'

class TeamList extends Component {
  render() {
    return (
      <div> Create a Team </div>
    )
  }
}

export default connect(state => {
  return state.userTeams
})(TeamList)