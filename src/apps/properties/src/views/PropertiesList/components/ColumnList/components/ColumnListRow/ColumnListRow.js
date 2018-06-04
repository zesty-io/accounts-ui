import React from 'react'
import styles from './ColumnListRow.less'

export default function ColumnListRow(props) {
  const { site } = props
  return (
    <span className={styles.row}>
      <AppLink to={`/instances/${site.ZUID}`}>{site.name}</AppLink>
      <i className={'fa fa-star-o'} aria-hidden="true" />
      <Url
        target="_blank"
        title={`Open instance preview: ${site.name}`}
        href={`${CONFIG.PREVIEW_URL_PROTOCOL}${site.randomHashID}${
          CONFIG.PREVIEW_URL
        }`}
      >
        <i className={'fa fa-eye'} aria-hidden="true" />
      </Url>
      <Url
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
