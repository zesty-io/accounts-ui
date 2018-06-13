import React from 'react'
import { connect } from 'react-redux'
import styles from './InviteRow.less'

import {
  fetchSites,
  acceptInvite,
  declineInvite
} from '../../../../../../store/sites'

export default connect()(function InviteRow(props) {
  const { site } = props
  return (
    <span className={styles.Invite}>
      <AppLink className={styles.action} to={`/instances/${site.ZUID}`}>
        {site.name}
      </AppLink>
      <Button
        type="save"
        className={styles.action}
        onClick={() => handleAccept(props)}
      >
        <i className="fa fa-check" aria-hidden="true" />
      </Button>
      <Button
        type="cancel"
        className={styles.action}
        onClick={() => handleDecline(props)}
      >
        <i className="fa fa-ban" aria-hidden="true" />
      </Button>
    </span>
  )
})

function handleAccept(props) {
  props.dispatch(acceptInvite(props.site.inviteZUID)).then(data => {
    console.log('accepted invite', data)
  })
}
function handleDecline(props) {
  props.dispatch(declineInvite(props.site.inviteZUID)).then(data => {
    console.log('declined invite', data)
  })
}
