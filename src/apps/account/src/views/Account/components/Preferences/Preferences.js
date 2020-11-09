import React, { Component } from 'react'
import { connect } from 'react-redux'

import { saveProfile } from '../../../../../../../shell/store/user'
import { notify } from '../../../../../../../shell/store/notifications'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { Toggle } from '@zesty-io/core/Toggle'

import styles from './Preferences.less'
export default connect(state => state)(
  class Preferences extends Component {
    render() {
      return (
        <Card className={styles.Preferences}>
          <CardHeader className={styles.CardHeader}>
            <h1>Preferences</h1>
          </CardHeader>
          <CardContent className={styles.CardContent}>
            <p>
              Account views can be customized by selecting from the options
              below
            </p>
            {/* <article className={styles.PrefItem}>
              Manage Blueprints
              <Toggle
                name="blueprints"
                id="blueprintsToggle"
                onChange={this.handleChange}
                checked={this.props.user.prefs.devOptions}
              />
            </article> */}
            <article className={styles.PrefItem}>
              Manage Teams
              <Toggle
                name="teams"
                id="teamsToggle"
                onChange={this.handleChange}
                checked={this.props.user.prefs.teamOptions}
              />
            </article>
            <article className={styles.PrefItem}>
              Instance Grid View
              <Toggle
                name="instances"
                onChange={this.handleChange}
                checked={this.props.user.prefs.instance_layout === 'grid'}
              />
            </article>
          </CardContent>
          {/* <CardFooter /> */}
        </Card>
      )
    }
    handleChange = evt => {
      if (evt.target.name === 'blueprints') {
        this.props.dispatch({
          type: 'DEV_PREFS',
          payload: evt.target.checked ? 1 : 0
        })
      }
      if (evt.target.name === 'teams') {
        this.props.dispatch({
          type: 'TEAM_PREFS',
          payload: evt.target.checked ? 1 : 0
        })
      }
      if (evt.target.name === 'instances') {
        this.props.user.prefs.instance_layout === 'grid'
          ? this.props.dispatch({
              type: 'INSTANCE_LAYOUT',
              layout: 'list'
            })
          : this.props.dispatch({
              type: 'INSTANCE_LAYOUT',
              layout: 'grid'
            })
      }
      this.props
        .dispatch(saveProfile())
        .then(() => {
          this.props.dispatch(
            notify({ message: 'Saved preference change', type: 'success' })
          )
        })
        .catch(err => {
          this.props.dispatch(
            notify({
              message: err.error || 'Error saving preference',
              type: 'error'
            })
          )
        })
    }
  }
)
