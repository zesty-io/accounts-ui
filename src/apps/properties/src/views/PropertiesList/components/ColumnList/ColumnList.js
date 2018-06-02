import React from 'react'
import cx from 'classnames'
import { Route } from 'react-router-dom'

import styles from './ColumnList.less'

import PropertyOverview from '../../../PropertyOverview'

export default function ColumnList(props) {
  return (
    <section className={styles.ColumnList}>
      <nav className={styles.List}>
        {props.sitesInvited.map(site => {
          return (
            <span key={site.ZUID} className={cx(styles.row, styles.invite)}>
              <AppLink className={styles.row} to={`/instances/${site.ZUID}`}>
                {site.name}
              </AppLink>
              <Button>
                <i className="fa fa-check" aria-hidden="true" />
              </Button>
              <Button type="cancel">
                <i className="fa fa-ban" aria-hidden="true" />
              </Button>
            </span>
          )
        })}
        <Divider />
        {props.sitesFiltered.map(site => {
          return (
            <span key={site.ZUID} className={styles.row}>
              <AppLink to={`/instances/${site.ZUID}`}>{site.name}</AppLink>
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
        })}
      </nav>
      <main className={styles.Overview}>
        <Route path="/instances/:siteZUID" component={PropertyOverview} />
      </main>
    </section>
  )
}
