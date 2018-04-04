import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import cx from 'classnames'
import styles from './WebsiteInvite.less'

import { Line } from 'react-chartjs-2'

class WebsiteInvite extends Component {
  handleClick = evt => {
    // post accepted invite data THEN route to the overview when the user has permissions
    this.props.history.push(`/properties/${this.props.site.ZUID}`)
  }
  render() {
    // let data = {
    //   labels: ['sun', 'mon', 'tues', 'wed', 'thur', 'fri', 'sat'],
    //   datasets: [
    //     {
    //       label: 'requests',
    //       data: [2, 4, 0, 6, 2, 4, 9]
    //     },
    //     {
    //       label: 'media',
    //       data: [3, 6, 11, 7, 3, 6, 11]
    //     }
    //   ]
    // }

    // let options = {
    //   elements: {
    //     line: {
    //       tension: 0 // disables bezier curves
    //     }
    //   }
    // }
    return (
      <article className={styles.WebsiteInvite}>
        <header>
          <h1 className={styles.name}>{this.props.site.Name}</h1>
        </header>
        <main className={styles.WebsiteManage}>
          {/*<Line data={data} options={options} />*/}
          <i className={cx(styles.globe, "fa fa-globe")} aria-hidden="true"></i>
        </main>
        <footer>
          {/* {this.props.site.Domain ? (
            <Url target="_blank" href={`http://${this.props.site.Domain}`}>
              <i className="fa fa-globe" aria-hidden="true" />&nbsp;{
                this.props.site.Domain
              }
            </Url>
          ) : null} */}
          <Button className={styles.invite} onClick={this.handleClick}>
            <i className="fa fa-check-circle-o" aria-hidden="true" />
            Accept Invite
          </Button>
        </footer>
      </article>
    )
  }
}

export default withRouter(connect(state => state)(WebsiteInvite))
