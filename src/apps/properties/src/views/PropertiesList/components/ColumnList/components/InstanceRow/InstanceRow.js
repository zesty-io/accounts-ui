import React from 'react'
import cx from 'classnames'
import styles from './InstanceRow.less'

import InstanceFavorite from '../../../../../../components/InstanceFavorite'

import { AppLink } from '@zesty-io/core/AppLink'
import { Url } from '@zesty-io/core/Url'

export default function InstanceRow(props) {
  const { site } = props

  return (
    <span className={styles.row}>
      <InstanceFavorite
        title="Add instance to favorites"
        className={styles.action}
        favorite={site.favorite}
        ZUID={site.ZUID}
      />
      <AppLink
        className={cx(styles.action, styles.overview)}
        to={`/instances/${site.ZUID}`}>
        {site.name}
      </AppLink>

      <Url
        className={styles.action}
        target="_blank"
        title={`Open instance preview: ${site.name}`}
        href={`${CONFIG.PREVIEW_URL_PROTOCOL}${site.randomHashID}${CONFIG.PREVIEW_URL}`}>
        <i className={'fas fa-eye'} aria-hidden="true" />
      </Url>
      {site.blueprintID !== null ? (
        <Url
          className={styles.action}
          target="_blank"
          href={`${CONFIG.MANAGER_URL_PROTOCOL}${site.randomHashID}${CONFIG.NEW_MANAGER_URL}`}>
          <i className="fas fa-edit" aria-hidden="true" />
        </Url>
      ) : (
        <AppLink
          className={styles.action}
          to={`/instances/${site.ZUID}/blueprint`}>
          <i className="fas fa-file-code" aria-hidden="true" />
        </AppLink>
      )}
    </span>
  )
}
