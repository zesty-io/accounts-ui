import React from 'react'
import styles from './ColumnListRow.less'

import InstanceFavorite from '../../../../../../components/InstanceFavorite'

export default function ColumnListRow(props) {
  const { site } = props
  return (
    <span className={styles.row}>
      <AppLink className={styles.action} to={`/instances/${site.ZUID}`}>
        {site.name}
      </AppLink>
      <InstanceFavorite
        title="Add instance to favorites"
        className={styles.action}
        favorite={site.favorite}
        ZUID={site.ZUID}
      />
      <Url
        className={styles.action}
        target="_blank"
        title={`Open instance preview: ${site.name}`}
        href={`${CONFIG.PREVIEW_URL_PROTOCOL}${site.randomHashID}${
          CONFIG.PREVIEW_URL
        }`}
      >
        <i className={'fa fa-eye'} aria-hidden="true" />
      </Url>
      <Url
        className={styles.action}
        target="_blank"
        title="Open instance manager"
        href={`${CONFIG.MANAGER_URL_PROTOCOL}${site.randomHashID}${
          CONFIG.MANAGER_URL
        }`}
      >
        <i className="fa fa-external-link-square" aria-hidden="true" />
      </Url>
    </span>
  )
}
