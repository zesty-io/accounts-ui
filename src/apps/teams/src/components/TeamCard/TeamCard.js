import React, {Component} from 'react'


class TeamCard extends Component {
  render() {
    return (
      <div>
        <p>{JSON.stringify(this.props.team)}</p>
        </div>
    )
  }
}

export default TeamCard