import React from 'react'
import styles from './InviteRow.less'

export default function InviteRow(props) {
  const { site } = props
  return (
    <span className={styles.Invite}>
      <AppLink className={styles.action} to={`/instances/${site.ZUID}`}>
        {site.name}
      </AppLink>
      <Button type="save" className={styles.action}>
        <i className="fa fa-check" aria-hidden="true" />
      </Button>
      <Button type="cancel" className={styles.action}>
        <i className="fa fa-ban" aria-hidden="true" />
      </Button>
    </span>
  )
}
