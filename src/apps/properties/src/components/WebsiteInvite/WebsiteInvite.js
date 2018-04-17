import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import cx from "classnames";
import styles from "./WebsiteInvite.less";

import { Line } from "react-chartjs-2";

class WebsiteInvite extends Component {
  handleAccept = evt => {
    // post accepted invite data THEN route to the overview when the user has permissions
    // this.props.history.push(`/properties/${this.props.site.ZUID}`)
    console.log(this.props);
  };
  handleDecline = evt => {
    // post decline and re-fetch sites
    console.log(this.props);
  };
  render() {
    return (
      <article className={styles.WebsiteInvite}>
        <header>
          <h1 className={styles.name}>{this.props.site.Name}</h1>
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
          <Button className={styles.invite} onClick={this.handleAccept}>
            <i className="fa fa-check-circle-o" aria-hidden="true" />
            Accept Invite
          </Button>
          <Button className={styles.invite} onClick={this.handleDecline}>
            <i className="fa fa-times-circle-o" aria-hidden="true" />
            Decline Invite
          </Button>
        </footer>
      </article>
    );
  }
}

export default withRouter(connect(state => state)(WebsiteInvite));
