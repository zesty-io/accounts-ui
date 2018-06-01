import React from 'react'
import { Route } from 'react-router-dom'

import styles from './ColumnList.less'

import PropertyOverview from '../../../PropertyOverview'

export default function ColumnList(props) {
  return (
    <section className={styles.ColumnList}>
      <nav className={styles.List}>
        {props.sitesFiltered.map(site => {
          return (
            <AppLink
              key={site.ZUID}
              className={styles.row}
              to={`/instances/${site.ZUID}`}
            >
              {site.name}
            </AppLink>
          )
        })}
      </nav>
      <main className={styles.Overview}>
        <Route path="/instances/:siteZUID" component={PropertyOverview} />
      </main>
    </section>
  )
}
