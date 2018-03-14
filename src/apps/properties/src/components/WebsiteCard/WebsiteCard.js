import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './WebsiteCard.less'

import {Line} from 'react-chartjs-2'

class WebsiteCard extends Component {
  render() {

    let data = {
        labels: ['jan', 'feb', 'march'],
        datasets: [{
          label: 'requests',
          data: [1,3,4]
        }]
    };

    return (
      <article className={styles.WebsiteCard}>
        <header>
          <h1 className={styles.name}>{this.props.site.name}</h1>
        </header>
        <main className={styles.WebsiteManage}>
          {this.props.site.domain ? (
            <Url target="_blank" href="http://alphauniverse.com">
              <i className="fa fa-globe" aria-hidden="true" />&nbsp;{
                this.props.site.domain
              }
            </Url>
          ) : null}
          {/* <p>30 Day Requests: 1,300,000 TODO line graph</p> */}

          <Line data={data} />
        </main>
        <footer>
          <ButtonGroup className={styles.controls}>
            <Url
              target="_blank"
              href={`https://${this.props.site.zuid}.manage.zesty.io`}
            >
              <i className="fa fa-external-link" aria-hidden="true" />Site
              Manager
            </Url>
            <Url
              target="_blank"
              href={`https://${this.props.site.zuid}.preview.zesty.io`}
            >
              <i className="fa fa-globe" aria-hidden="true" />Preview
            </Url>
            <Link to={`/properties/${this.props.site.zuid}`}>
              <i
                className={cx(styles.settings, 'fa fa-cog')}
                aria-hidden="true"
              />
            </Link>
          </ButtonGroup>
        </footer>
      </article>
    )
  }
}

export default connect(state => state)(WebsiteCard)
