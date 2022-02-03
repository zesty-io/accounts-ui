import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import styles from './GridList.less'

import PropertyOverview from '../../../PropertyOverview'
import WebsiteCard from '../../../../components/WebsiteCard'
import WebsiteCreate from '../../../../components/WebsiteCreate'
import WebsiteInvite from '../../../../components/WebsiteInvite'

import { favoriteSite } from '../../../../../../../shell/store/user'

import { Button } from '@zesty-io/core/Button'

export default connect(state => state)(props => {
  useEffect(() => {
    document.addEventListener('click', close)
    document.addEventListener('keydown', close)

    return () => {
      document.removeEventListener('click', close)
      document.removeEventListener('keydown', close)
    }
  }, [])

  const close = evt => {
    if (evt.key === 'Escape') {
      props.history.push('/instances')
    }
    if (evt.type === 'click') {
      if (
        evt.target.parentElement &&
        (evt.target.parentElement.id === 'siteListWrapper' ||
          evt.target.parentElement.id === 'closeOverviewButton')
      ) {
        props.history.push('/instances')
      }
    }
  }

  // Fix for pending invites not shown if user has favorited the instance before. ticket #173
  const invites = Object.keys(props.sites).filter(
    zuid => props.sites[zuid].inviteZUID
  )

  props.sitesFavorite.forEach(favorite => {
    invites.forEach(invite => {
      if (favorite.ZUID === invite) {
        props.dispatch(favoriteSite(invite, 'REMOVE'))
      }
    })
  })

  return (
    <div className={styles.GridList} id="siteListWrapper">
      <Route
        path="/instances/:siteZUID"
        render={props => {
          return (
            <section className={styles.PropertyOverviewModal}>
              <div className={styles.PropertyOverviewWrap}>
                <Button
                  className={styles.CloseOverview}
                  id="closeOverviewButton">
                  <i className="fa fa-times" aria-hidden="true" />
                </Button>
                <PropertyOverview {...props} />
              </div>
            </section>
          )
        }}
      />

      {props.sitesInvited.length && (
        <React.Fragment>
          <h2 className={cx(styles.subheadline, styles.SectionTitle)}>
            <i className="fas fa-envelope" aria-hidden="true" />
            &nbsp;Invites
          </h2>
          <main className={styles.siteList}>
            {props.sitesInvited.map(site => {
              return <WebsiteInvite key={site.ZUID} site={site} />
            })}
          </main>
        </React.Fragment>
      )}

      {props.sitesFavorite.length ? (
        <React.Fragment>
          <h2 className={cx(styles.subheadline, styles.SectionTitle)}>
            <i className="fa fa-star" aria-hidden="true" />
            &nbsp;Favorites
          </h2>
          <main className={cx(styles.siteList, styles.Favorites)}>
            {props.sitesFavorite.map(site => {
              return (
                <WebsiteCard
                  key={site.ZUID}
                  site={site}
                  dispatch={props.dispatch}
                />
              )
            })}
          </main>
        </React.Fragment>
      ) : null}

      <React.Fragment>
        <h2 className={cx(styles.subheadline, styles.SectionTitle)}>
          <i className="fa fa-th" aria-hidden="true" />
          &nbsp;All Instances
        </h2>

        <main className={styles.siteList}>
          {props.sites.length === 0 && <WebsiteCreate />}

          {props.sitesFiltered.length ? (
            props.sitesFiltered.map(site => {
              return (
                <WebsiteCard
                  key={site.ZUID}
                  site={site}
                  dispatch={props.dispatch}
                />
              )
            })
          ) : props.searchString ? (
            <h2>No results</h2>
          ) : null}
        </main>
      </React.Fragment>
    </div>
  )
})
