import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchTeams } from '../../store/teams'
import TeamsGrid from '../../components/TeamsGrid'

import styles from './teams.less'

export default connect(state => {
  return {
    teams: state.teams,
    teamInvites: state.teamInvites,
    teamInstances: state.teamInstances,
    teamMembers: state.teamMembers,
    user: state.user
  }
})(
  class Teams extends Component {
    state = {
      loading: true
    }
    componentDidMount() {
      this.props
        .dispatch(fetchTeams())
        .then(() => {
          this.setState({
            loading: false
          })
        })
        .catch(err => {
          console.error(err)
          this.setState({
            loading: false
          })
        })
    }
    render() {
      return (
        <WithLoader
          className={styles.Loading}
          condition={!this.state.loading}
          message="Loading Your Teams">
          <TeamsGrid {...this.props} />
        </WithLoader>
      )
    }
  }
)
