import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import styles from './GridList.less'

import PropertyOverview from '../../../PropertyOverview'
import WebsiteCard from '../../../../components/WebsiteCard'
import WebsiteCreate from '../../../../components/WebsiteCreate'
import WebsiteInvite from '../../../../components/WebsiteInvite'

export default class GridList extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    document.addEventListener('click', this.close)
    document.addEventListener('keydown', this.close)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.close)
    document.removeEventListener('keydown', this.close)
  }
  render() {
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
                    id="closeOverviewButton"
                    onClick={this.close}
                  >
                    <i className="fa fa-times-circle-o" aria-hidden="true" />
                  </Button>
                  <PropertyOverview {...props} />
                </div>
              </section>
            )
          }}
        />

        {this.props.sitesInvited.length ? (
          <React.Fragment>
            <h2 className={styles.SectionTitle}>
              <i className="fa fa-envelope-o" aria-hidden="true" />
              &nbsp;Invites
            </h2>
            <main className={styles.siteList}>
              {this.props.sitesInvited.map(site => {
                return <WebsiteInvite key={site.ZUID} site={site} />
              })}
            </main>
          </React.Fragment>
        ) : null}

        {this.props.sitesFavorite.length ? (
          <React.Fragment>
            <h2 className={styles.SectionTitle}>
              <i className="fa fa-star-o" aria-hidden="true" />
              &nbsp;Favorites
            </h2>
            <main className={cx(styles.siteList, styles.Favorites)}>
              {this.props.sitesFavorite.map(site => {
                return (
                  <WebsiteCard
                    key={site.ZUID}
                    favorite={site.favorite}
                    site={site}
                    dispatch={this.props.dispatch}
                  />
                )
              })}
            </main>
          </React.Fragment>
        ) : null}

        <React.Fragment>
          <h2 className={styles.SectionTitle}>
            <i className="fa fa-th" aria-hidden="true" />
            &nbsp;All Instances
          </h2>

          <main className={styles.siteList}>
            {!this.props.searchString && (
              <WebsiteCreate first={this.props.sites.length === 0} />
            )}

            {this.props.sitesFiltered.length ? (
              this.props.sitesFiltered.map(site => {
                return (
                  <WebsiteCard
                    key={site.ZUID}
                    site={site}
                    favorite={site.favorite}
                    dispatch={this.props.dispatch}
                  />
                )
              })
            ) : this.props.searchString ? (
              <h2>No results</h2>
            ) : null}
          </main>
        </React.Fragment>
      </div>
    )
  }
  close = evt => {
    if (evt.key === 'Escape') {
      this.props.history.push('/instances')
    }
    if (evt.type === 'click') {
      if (
        evt.target.parentElement &&
        (evt.target.parentElement.id === 'siteListWrapper' ||
          evt.target.parentElement.id === 'closeOverviewButton')
      ) {
        this.props.history.push('/instances')
      }
    }
  }
}
