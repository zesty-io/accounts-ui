import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import config from "../../../../../shell/config";
import { fetchSites, acceptInvite, deleteInvite } from "../../store/sites";
import { notify } from "../../../../../shell/store/notifications";

import cx from "classnames";
import styles from "./WebsiteInvite.less";

import { Line } from "react-chartjs-2";

class WebsiteInvite extends Component {
  handleAccept = evt => {
    // post accepted invite data THEN route to the overview when the user has permissions
    this.props.dispatch(acceptInvite(this.props.site.inviteZUID)).then(data => {
      this.props.dispatch(fetchSites())
      .then(data => {
        // if a user has accepted their last invite open the property overview
        const invitedSites = Object.keys(data.data).filter(siteZUID => {
          if(data.data[siteZUID].hasOwnProperty('inviteZUID')){
            return siteZUID
          }
        })
        if(invitedSites.length < 1){
          return this.props.history.push(`/properties/${this.props.site.ZUID}`);
        }
      });
      this.props.dispatch(
        /*
        **
        ** NOTE: formatting with prettier will break the link in the string literal below
        **
        */
        notify({
          HTML: `<div>
            <p>You have accepted an invite to ${this.props.site.name}</p>
            <a href="${`${config.MANAGER_URL_PROTOCOL}${this.props.site.randomHashID}${config.MANAGER_URL}`}" target="_blank">
            click here to go to Manager App
            </a>
            </div>`,
          type: "success",
          timeout: 6000
        })
      );
    });
  };
  handleDecline = evt => {
    this.props.dispatch(deleteInvite(this.props.site.inviteZUID)).then(data => {
      this.props.dispatch(
        notify({
          message: `You have declined an invite to ${this.props.site.name}`,
          type: "info"
        })
      );
      this.props.dispatch(fetchSites());
    });

    console.log(this.props);
  };
  render() {
    return (
      <article className={styles.WebsiteInvite}>
        <header>
          <h1 className={styles.name}>{this.props.site.name}</h1>
          {this.props.site.domain ? (
            <Url target="_blank" href={`http://${this.props.site.domain}`}>
              <i className="fa fa-globe" aria-hidden="true" />&nbsp;{
                this.props.site.domain
              }
            </Url>
          ) : null}
        </header>
        <main className={styles.WebsiteManage}>
          <Url
            className={styles.preview}
            target="_blank"
            title={`Preview  ${this.props.site.name}`}
            href={`https://${this.props.site.RandomHashID}.preview.zesty.io`}
          >
            <i className={cx(styles.icon, "fa fa-globe")} aria-hidden="true" />
          </Url>
        </main>
        <footer>
          <ButtonGroup>
            <Button className={styles.invite} onClick={this.handleAccept}>
              <i className="fa fa-check-circle-o" aria-hidden="true" />
              Accept Invite
            </Button>
            <Button type="cancel" onClick={this.handleDecline}>
              <i className="fa fa-ban" aria-hidden="true" />
              Decline
            </Button>
          </ButtonGroup>
        </footer>
      </article>
    );
  }
}

export default withRouter(connect(state => state)(WebsiteInvite));
