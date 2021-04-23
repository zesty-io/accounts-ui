import React from 'react'
import { connect } from 'react-redux'

import { saveProfile } from '../../../../../../../shell/store/user'
import { notify } from '../../../../../../../shell/store/notifications'

import { Card, CardHeader, CardContent } from '@zesty-io/core/Card'
import { ToggleButton } from '@zesty-io/core/ToggleButton'

import styles from './Preferences.less'

export default connect(state => {
  return {
    user: state.user
  }
})(function Preferences(props) {
  const saveChanges = () => {
    props
      .dispatch(saveProfile())
      .then(() => {
        props.dispatch(
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
  const handleManageTeamsChange = () => {
    props.dispatch({
      type: 'TEAM_PREFS',
      payload: props.user.prefs.teamOptions ? 0 : 1
    })
    saveChanges()
  }

  const handleView = () => {
    if (props.user.prefs.instance_layout === 'grid') {
      props.dispatch({
        type: 'INSTANCE_LAYOUT',
        layout: 'list'
      })
    } else {
      props.dispatch({
        type: 'INSTANCE_LAYOUT',
        layout: 'grid'
      })
    }
    saveChanges()
  }

  return (
    <div>
      <Card className={styles.Preferences}>
        <CardHeader className={styles.CardHeader}>
          <h1>Preferences</h1>
        </CardHeader>
        <CardContent className={styles.CardContent}>
          <p>
            Account views can be customized by selecting from the options below
          </p>
          <article className={styles.PrefItem}>
            Manage Teams
            <ToggleButton
              name="teams"
              value={props.user.prefs.teamOptions}
              offValue="No"
              onValue="Yes"
              onChange={handleManageTeamsChange}
            />
          </article>
          <article className={styles.PrefItem}>
            Instance Grid View
            <ToggleButton
              name="instances"
              value={props.user.prefs.instance_layout === 'grid'}
              offValue="No"
              onValue="Yes"
              onChange={handleView}
            />
          </article>
        </CardContent>
      </Card>
    </div>
  )
})
