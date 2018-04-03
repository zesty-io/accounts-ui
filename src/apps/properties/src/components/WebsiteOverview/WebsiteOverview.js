import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import cx from "classnames";
import styles from "./WebsiteOverview.less";

import UserAccess from "./UserAccess";
import CompanyAccess from "./CompanyAccess";
import Actions from "./Actions";
import Domain from "./Domain";
import Stats from "./Stats";
import Blueprint from "./Blueprint";
import Permissions from "./Permissions";

import { fetchSiteUsers } from "../../store/sitesUsers";
import { fetchSiteCompanies } from "../../store/sitesCompanies";
import { fetchBlueprint } from "../../store/blueprints";
import { inviteData } from "../../store/invite";
import { fetchSiteRoles } from "../../store/sitesRoles";

class WebsiteOverview extends Component {
  componentDidMount() {
    this.props.dispatch(fetchSiteUsers(this.props.userZuid, this.props.ZUID));
    this.props.dispatch(
      fetchSiteCompanies(this.props.userZuid, this.props.ZUID)
    );
    this.props.dispatch(fetchBlueprint(this.props.blueprintID));
    this.props.dispatch(inviteData({ siteZUID: this.props.ZUID }));
    this.props.dispatch(fetchSiteRoles(this.props.userZuid, this.props.ZUID));
  }
  render() {
    // when this lives on the user object, it will be useful
    const fakeUserPrefs = [
      {
        title: "Monthly Useage",
        className: 'fa fa-line-chart',
        Component: Stats
      },{
        title: "Permissions",
        className: 'fa fa-lock',
        Component: Permissions
      },{
        title: "User Access",
        className: 'fa fa-users',
        Component: UserAccess
      },{
        title: "Company Access",
        className: 'fa fa-building',
        Component: CompanyAccess
      },{
        title: "Blueprint",
        className: 'fa fa-file-code-o',
        Component: Blueprint
      },
    ]
    return (
      <section className={styles.WebsiteOverviewWrap}>
        {this.props.name ? (
          <article className={styles.WebsiteOverview}>
            <header className={styles.WebsiteOverviewHeader}>
              <Link className={styles.close} to="/properties/">
                <i className="fa fa-times-circle-o" aria-hidden="true" />Close
              </Link>
              <h1 className={styles.name}>
                {this.props.name}&nbsp;
                <i className="fa fa-pencil" aria-hidden="true" />
              </h1>
              <h2 className={styles.domain}>
                {this.props.domain ? (
                  <span>
                    {this.props.domain}&nbsp;
                    <i className="fa fa-pencil" aria-hidden="true" />
                  </span>
                ) : (
                  <Domain siteZUID={this.props.ZUID} site={this.props}/>
                  // <Button>
                  //   <i className={cx("fa fa-cog")} aria-hidden="true" />Setup
                  //   Domain
                  // </Button>
                )}
              </h2>
            </header>
            <main>
              {fakeUserPrefs.map((Item, i) => {
                const DynComponent = Item.Component
                const site = this.props.site
                return (
                  <article className={styles.card} key={i}>
                    <h2>
                      <i className={Item.className} aria-hidden="true" />&nbsp;
                      {Item.title}
                    </h2>
                    {<DynComponent siteZUID={this.props.ZUID} site={this.props} />}
                  </article>
                );
              })}
            </main>
          </article>
        ) : (
          <section className={styles.Loading}>
            <h3>Loading Site</h3>
            <Loader />
          </section>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.sites[ownProps.match.params.hash],
    userZuid: state.user.zuid
  };
};
export default withRouter(connect(mapStateToProps)(WebsiteOverview));
