import React from 'react'
import cx from 'classnames'
import { Switch, Route } from 'react-router-dom'

import styles from './ColumnList.less'

import PropertyOverview from '../../../PropertyOverview'
import ColumnListRow from './components/ColumnListRow'

export default function ColumnList(props) {
  return (
    <section className={styles.ColumnList}>
      <nav className={styles.List}>
        {props.sitesInvited.length ? (
          <React.Fragment>
            <h2 className={styles.SectionTitle}>
              <i className="fa fa-envelope-o" aria-hidden="true" />
              &nbsp;Invites
            </h2>
            {props.sitesInvited.map(site => {
              return (
                <span key={site.ZUID} className={cx(styles.row, styles.invite)}>
                  <AppLink
                    className={styles.row}
                    to={`/instances/${site.ZUID}`}
                  >
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
          </React.Fragment>
        ) : null}

        {props.sitesFavorite.length ? (
          <React.Fragment>
            <h2 className={styles.SectionTitle}>
              <i className="fa fa-star-o" aria-hidden="true" />
              &nbsp;Favorites
            </h2>
            {props.sitesFavorite.map(site => (
              <ColumnListRow key={site.ZUID} site={site} />
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
              <ColumnListRow key={site.ZUID} site={site} />
            ))}
          </React.Fragment>
        ) : null}
      </nav>
      <main className={styles.Overview}>
        <Switch>
          <Route path="/instances/:siteZUID" component={PropertyOverview} />
          <Route
            exact
            path="/instances/"
            render={() => {
              return <h1>Select Instance</h1>
            }}
          />
        </Switch>
      </main>
    </section>
  )
}
