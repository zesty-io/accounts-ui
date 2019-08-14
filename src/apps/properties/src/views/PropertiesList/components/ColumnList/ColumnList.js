import React from 'react'
import cx from 'classnames'
import { Switch, Route } from 'react-router-dom'

import styles from './ColumnList.less'

import PropertyOverview from '../../../PropertyOverview'
import WebsiteCreate from '../../../../components/WebsiteCreate'
import InstanceRow from './components/InstanceRow'
import InviteRow from './components/InviteRow'

export default function ColumnList(props) {
  return (
    <section className={styles.ColumnList}>
      <nav className={styles.List}>
        {props.sitesFiltered.length === 0 && <WebsiteCreate />}

        {props.sitesInvited.length ? (
          <React.Fragment>
            <h2 className={styles.SectionTitle}>
              <i className="fa fa-envelope" aria-hidden="true" />
              &nbsp;Invites
            </h2>
            {props.sitesInvited.map(site => {
              return <InviteRow key={site.ZUID} site={site} />
            })}
          </React.Fragment>
        ) : null}

        {props.sitesFavorite.length ? (
          <React.Fragment>
            <h2 className={styles.SectionTitle}>
              <i className="fa fa-star" aria-hidden="true" />
              &nbsp;Favorites
            </h2>
            {props.sitesFavorite.map(site => (
              <InstanceRow key={site.ZUID} site={site} />
            ))}
          </React.Fragment>
        ) : null}

        {props.sitesFiltered.length ? (
          <React.Fragment>
            <h2 className={styles.SectionTitle}>
              <i className="fa fa-th" aria-hidden="true" />
              &nbsp;All Instances
            </h2>
            {props.sitesFiltered.map(site => (
              <InstanceRow key={site.ZUID} site={site} />
            ))}
          </React.Fragment>
        ) : props.searchString ? (
          <h2 className={styles.NoResults}>No results</h2>
        ) : null}
      </nav>
      <main className={styles.Overview}>
        <Switch>
          <Route path="/instances/:siteZUID" component={PropertyOverview} />
          <Route
            exact
            path="/instances/"
            render={() => {
              return (
                <div className={styles.Zesty}>
                  <h1 className={styles.title}>Zesty.io</h1>
                  <h2 className={cx(styles.subtitle, styles.display)}>
                    Control Content Anywhere from One Platform
                  </h2>
                </div>
              )
            }}
          />
        </Switch>
      </main>
    </section>
  )
}
