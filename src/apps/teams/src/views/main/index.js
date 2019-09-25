import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchTeams } from '../../store/teams'
import { fetchTeamInvites } from '../../store/teamInvites'
import TeamsGrid from '../../components/TeamsGrid'

import styles from './teams.less'
import { notify } from '../../../../../shell/store/notifications'

import { WithLoader } from '@zesty-io/core/WithLoader'

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
      Promise.all([
        this.props.dispatch(fetchTeamInvites()),
        this.props.dispatch(fetchTeams())
      ])
        .then(() => {
          this.setState({
            loading: false
          })
        })
        .catch(err => {
          console.log('final catch')
          this.props.dispatch(
            notify({ message: 'Error fetching team data', type: 'error' })
          )
          this.setState({
            loading: false
          })
        })
    }
    render() {
      document.title = 'Accounts: Teams'
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
