import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './TeamList.less'

class TeamList extends Component {
  render() {
    console.log(this.props)
    return (
      <section className={styles.TeamList}>
        <h1>Teams</h1>
        <ul>
          {this.props.teams &&
            Object.keys(this.props.teams).map((team, i) => {
              return (
                <li>
                  {this.props.teams[team].name}
                  <ul>
                    {this.props.teams[team].members.map(member => {
                      return<li>{member.name}</li>
                    })}
                  </ul>
                </li>
              )
            })}
        </ul>
      </section>
    )
  }
}

export default connect(state => state)(TeamList)
