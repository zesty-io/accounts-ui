import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { fetchSites, acceptInvite, deleteInvite } from "../../store/sites";

import cx from "classnames";
import styles from "./WebsiteInvite.less";

import { Line } from "react-chartjs-2";

class WebsiteInvite extends Component {
  handleAccept = evt => {
    // post accepted invite data THEN route to the overview when the user has permissions
    this.props.dispatch(acceptInvite(this.props.site.inviteZUID)).then(data => {
      this.props.dispatch(fetchSites()).then(data => {
        this.props.history.push(`/properties/${this.props.site.ZUID}`);
      });
    });
  };
  handleDecline = evt => {
    this.props.dispatch(deleteInvite(this.props.site.inviteZUID)).then(data => {
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
