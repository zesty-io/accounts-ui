import React, { Component } from 'react'

class TeamCard extends Component {
  render() {
    const { team } = this.props
    return (
      <div>
        <p>{JSON.stringify(team)}</p>
      </div>
    )
  }
}

export default TeamCard
