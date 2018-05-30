import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import { updateProfile } from '../../../../../shell/store/user'

import styles from './PropertiesList.less'

import PropertiesHeader from '../../components/PropertiesHeader'
import WebsiteCard from '../../components/WebsiteCard'
import WebsiteInvite from '../../components/WebsiteInvite'
import WebsiteCreate from '../../components/WebsiteCreate'

import PropertyOverview from '../PropertyOverview'

class Properties extends Component {
  render() {
    return (
      <section className={styles.Websites}>
        <PropertiesHeader />
        <main className={styles.siteListWrap}>
          {this.props.sites.length ? (
            <div className={styles.siteList} id="siteListWrapper">
              {this.props.sitesInvited.map(site => {
                return <WebsiteInvite key={site.ZUID} site={site} />
              })}

              {this.props.sitesStarred.map(site => {
                return <WebsiteCard key={site.ZUID} site={site} starred={true} />
              })}

              {this.props.sitesFiltered.map(site => {
                return <WebsiteCard key={site.ZUID} site={site}  starSite={this.starSite}/>
              })}
              <Route path="/instances/:siteZUID" component={PropertyOverview} />
            </div>
          ) : (
            // No sites so create a new one
            <div className={styles.siteList}>
              <WebsiteCreate />
            </div>
          )}
        </main>
      </section>
    )
  }
  starSite = site => {
    console.log(site)
    // update the user prefs object to contain the 'favorite'

  }
}
export default connect(state => {
  const userStarred = state.user.prefs.starred || []
  const sites = Object.keys(state.sitesFiltered).reduce((acc, ZUID) => {
    acc.push(state.sitesFiltered[ZUID])
    return acc
  }, [])

  return {
    user,
    sites,
    sitesFiltered: sites.filter(site => !site.inviteZUID),
    sitesInvited: sites.filter(site => site.inviteZUID),
    // filter sites by starred status
    sitesStarred: userStarred.map(siteZUID => {
      siteZUID === sites[siteZUID]
    })
  }
})(Properties)
