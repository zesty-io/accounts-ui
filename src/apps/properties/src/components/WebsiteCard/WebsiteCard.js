import React, { Component } from 'react'
import {connect} from 'react-redux'
import cx from 'classnames'
import styles from './WebsiteCard.less'

class WebsiteCard extends Component {
  render () {
    // console.log('site: ', this.props)
    return (
      <article className={styles.WebsiteCard}>
        <header>
          <h1 className={styles.name}>
            {/*<i className="fa fa-pencil" aria-hidden="true"></i>*/}
            {this.props.site.name}
          </h1>

          {/*<h2 className={styles.domain}>
            {this.props.site.domain
              ? <a href={this.props.site.domain} target='_blank'>{this.props.site.domain}</a>
              : <Button className={styles.setup}><i className={cx(styles.icon, 'fa fa-cog')} aria-hidden='true' />Setup Domain</Button>}
            </h2>*/}

          {/*
          <ButtonGroup>
            <Button>
              Site Manager
            </Button>
            <Link>
              <i className="fa fa-external-link" aria-hidden="true"></i>View Stage
            </Link>
            <Link>
              <i className="fa fa-external-link" aria-hidden="true"></i>View Live
            </Link>
          </ButtonGroup>
          */}
        </header>
        <main className={styles.WebsiteManage}>
          {this.props.site.domain ?
          <Link href="http://alphauniverse.com">
            <i className="fa fa-globe" aria-hidden="true"></i>&nbsp;{this.props.site.domain}
          </Link>
          :
            null
          }

          <p>
            30 Day Requests: 1,300,000
          </p>

        </main>
        <footer>
          <ButtonGroup className={styles.controls}>
            <Button className={styles.manager}>
              <i className="fa fa-external-link" aria-hidden="true"></i>Site Manager
            </Button>
            <Button>
              <i className="fa fa-globe" aria-hidden="true"></i>Preview
            </Button>

            <i className={cx(styles.settings, "fa fa-cog")} aria-hidden="true"></i>
          </ButtonGroup>
        </footer>
      </article>
    )
  }
}

export default connect(state => state)(WebsiteCard)
