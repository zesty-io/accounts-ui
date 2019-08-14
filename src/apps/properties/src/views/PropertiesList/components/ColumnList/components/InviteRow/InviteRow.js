import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { notify } from '../../../../../../../../../shell/store/notifications'

import {
  fetchSites,
  acceptInvite,
  declineInvite
} from '../../../../../../store/sites'

import { AppLink } from '@zesty-io/core/AppLink'
import { Button } from '@zesty-io/core/Button'

import styles from './InviteRow.less'
export default withRouter(
  connect()(function InviteRow(props) {
    const [loading, setLoading] = useState(false)

    const handleAccept = () => {
      setLoading(true)

      props
        .dispatch(acceptInvite(props.site.inviteZUID))
        .then(_ => {
          setLoading(false)
          props.dispatch(
            notify({
              message: `Invite accepted to ${props.site.name}`,
              type: 'success'
            })
          )
          props.history.push(`/instances/${props.site.ZUID}?invited=true`)
          props.dispatch(fetchSites())
        })
        .catch(err => {
          console.error(err)
          setLoading(false)
          props.dispatch(
            notify({
              type: 'error',
              message: 'Error accepting invite'
            })
          )
        })
    }

    const handleDecline = () => {
      setLoading(true)
      props
        .dispatch(declineInvite(props.site.inviteZUID))
        .then(_ => {
          setLoading(false)
          props.dispatch(
            notify({
              message: `You have declined your invite to ${props.site.name}`,
              type: 'info'
            })
          )
          props.history.push(`/instances`)
          props.dispatch(fetchSites())
        })
        .catch(err => {
          console.error(err)
          setLoading(false)
          props.dispatch(
            notify({
              message: `Error declining invite`,
              type: 'error'
            })
          )
        })
    }

    return (
      <span className={styles.Invite}>
        <AppLink className={styles.action} to={`/instances/${props.site.ZUID}`}>
          {props.site.name}
        </AppLink>
        <Button
          kind="save"
          className={styles.action}
          disabled={loading}
          onClick={handleAccept}>
          <i className="fa fa-check" aria-hidden="true" />
        </Button>
        <Button
          kind="cancel"
          className={styles.action}
          disabled={loading}
          onClick={handleDecline}>
          <i className="fa fa-ban" aria-hidden="true" />
        </Button>
      </span>
    )
  })
)
