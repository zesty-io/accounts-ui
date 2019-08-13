import React from 'react'
import cx from 'classnames'
import { Switch, Route } from 'react-router-dom'

import styles from './ColumnList.less'

import PropertyOverview from '../../../PropertyOverview'
import WebsiteCreate from '../../../../components/WebsiteCreate'
import InstanceRow from './components/InstanceRow'
import InviteRow from './components/InviteRow'

import { AppLink } from '@zesty-io/core/AppLink'
import { Button } from '@zesty-io/core/Button'

export default function ColumnList(props) {
  return (
    <section className={styles.ColumnList}>
      <nav className={styles.List}>
        <AppLink to="/instances/create">
          <Button className={styles.Create} kind="save">
            <i className="fa fa-plus" />
            Create New Instance
          </Button>
        </AppLink>

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
              return <h1 className={styles.Zesty}>Zesty.io</h1>
            }}
          />
        </Switch>
      </main>
    </section>
  )
}
