import React, { Component } from 'react'

import styles from './TeamCard.less'
class TeamCard extends Component {
  render() {
    const { team } = this.props
    return (
      <article>
        <header>{team.name}</header>
        <main>
          {team.members.map(member => {
            return <p key={member.ZUID}>{`${member.name}, ${member.email}`}</p>
          })}
        </main>
        <footer />
      </article>
    )
  }
}

export default TeamCard
