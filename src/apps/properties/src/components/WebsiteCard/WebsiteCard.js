import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './WebsiteCard.less'

import {Line} from 'react-chartjs-2'

class WebsiteCard extends Component {
  render() {

    let data = {
        labels: ['sun', 'mon', 'tues', 'wed', 'thur', 'fri', 'sat'],
        datasets: [{
          label: 'requests',
          data: [2, 4, 0, 6, 2, 4, 9]
        }, {
          label: 'media',
          data: [3, 6, 11, 7, 3, 6, 11]
        }]
    };

    let options = {
      elements: {
        line: {
          tension: 0, // disables bezier curves
        }
      }
    }

    return (
      <article className={styles.WebsiteCard}>
        <header>
          <h1 className={styles.name}>{this.props.site.AccountName}</h1>
        </header>
        <main className={styles.WebsiteManage}>
          {this.props.site.Domain ? (
            <Url target="_blank" href="http://alphauniverse.com">
              <i className="fa fa-globe" aria-hidden="true" />&nbsp;{
                this.props.site.Domain
              }
            </Url>
          ) : null}
          {/* <p>30 Day Requests: 1,300,000 TODO line graph</p> */}

          <Line data={data} options={options} />
        </main>
        <footer>
          <ButtonGroup className={styles.controls}>
            <Url
              target="_blank"
              href={`https://${this.props.site.ZUID}.manage.zesty.io`}
            >
              <i className="fa fa-external-link" aria-hidden="true" />Site
              Manager
            </Url>
            <Url
              target="_blank"
              href={`https://${this.props.site.ZUID}.preview.zesty.io`}
            >
              <i className="fa fa-globe" aria-hidden="true" />Preview
            </Url>
            <Link to={`/properties/${this.props.site.ZUID}`}>
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
