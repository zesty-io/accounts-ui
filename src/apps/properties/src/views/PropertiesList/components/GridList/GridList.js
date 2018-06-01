import React from 'react'
import { Route } from 'react-router-dom'

import styles from '../../PropertiesList.less'

import PropertyOverview from '../../../PropertyOverview'
import WebsiteCard from '../../../../components/WebsiteCard'
import WebsiteInvite from '../../../../components/WebsiteInvite'

export default function GridList(props) {
  return (
    <React.Fragment>
      <Route path="/instances/:siteZUID" component={PropertyOverview} />

      {props.sitesInvited.length ? (
        <React.Fragment>
          <h2 className={styles.SectionTitle}>
            <i className="fa fa-envelope-o" aria-hidden="true" />
            &nbsp;Invites
          </h2>
          <main className={styles.siteList}>
            {props.sitesInvited.map(site => {
              return <WebsiteInvite key={site.ZUID} site={site} />
            })}
          </main>
        </React.Fragment>
      ) : null}

      {!props.settings.filter && props.sitesFavorite.length ? (
        <React.Fragment>
          <h2 className={styles.SectionTitle}>
            <i className="fa fa-star-o" aria-hidden="true" />
            &nbsp;Favorites
          </h2>
          <main className={cx(styles.siteList, styles.Favorites)}>
            {props.sitesFavorite.map(site => {
              return (
                <WebsiteCard
                  key={site.ZUID}
                  site={site}
                  favorite={site.favorite}
                  dispatch={props.dispatch}
                />
              )
            })}
          </main>
        </React.Fragment>
      ) : null}

      {props.sitesFiltered.length ? (
        <React.Fragment>
          <h2 className={styles.SectionTitle}>
            <i className="fa fa-th" aria-hidden="true" />
            &nbsp;All Instances
          </h2>
          <main className={styles.siteList}>
            {props.sitesFiltered.map(site => {
              return (
                <WebsiteCard
                  key={site.ZUID}
                  site={site}
                  favorite={site.favorite}
                  dispatch={props.dispatch}
                />
              )
            })}
          </main>
        </React.Fragment>
      ) : (
        <main className={styles.siteList}>
          <h2>No results</h2>
        </main>
      )}
    </React.Fragment>
  )
}
