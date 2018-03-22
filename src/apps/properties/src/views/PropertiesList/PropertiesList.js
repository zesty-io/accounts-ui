import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import styles from "./PropertiesList.less";

import PropertiesHeader from "../../components/PropertiesHeader";
import WebsiteOverview from "../../components/WebsiteOverview";
import WebsiteCard from "../../components/WebsiteCard";
import WebsiteInvite from "../../components/WebsiteInvite";
import WebsiteCreate from "../../components/WebsiteCreate";

import { fetchSites } from "../../store/sites";

class Properties extends Component {
  componentDidMount() {
    this.props.dispatch(fetchSites());
  }
  render() {
    return (
      <section className={styles.Websites}>
        <PropertiesHeader />
        <main className={styles.siteListWrap}>
          {Object.keys(this.props.sitesFiltered).length ? (
            <div className={styles.siteList}>
              {/* Only show if no site has been created */}
              {Object.keys(this.props.sites).length ? <WebsiteCreate /> : null}

              {/* render invites */}
              {Object.keys(this.props.sites)
                .filter(
                  zuid =>
                    this.props.sites[zuid] && this.props.sites[zuid].invite
                )
                .map(zuid => {
                  return (
                    <WebsiteInvite key={zuid} site={this.props.sites[zuid]} />
                  );
                })}

              {/* render sites user has access */}
              {Object.keys(this.props.sitesFiltered)
                .filter(
                  zuid =>
                    this.props.sitesFiltered[zuid] &&
                    !this.props.sitesFiltered[zuid].invite
                )
                .map(zuid => {
                  return (
                    <WebsiteCard
                      windowSize={window.innerWidth}
                      key={zuid}
                      site={this.props.sitesFiltered[zuid]}
                    />
                  );
                })}

              <Route path="/properties/:hash" component={WebsiteOverview} />
              <Route
                path="/properties/invite/:hash"
                component={WebsiteOverview}
              />
            </div>
          ) : (
            <div className={styles.LoadingSites}>
              <h2>Loading Sites</h2>
              <Loader />
            </div>
          )}
        </main>
      </section>
    );
  }
}
export default connect(state => state)(Properties);
