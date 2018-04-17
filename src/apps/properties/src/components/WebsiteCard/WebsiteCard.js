import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './WebsiteCard.less'

import { Line } from 'react-chartjs-2'

class WebsiteCard extends Component {
  constructor(props) {
    super(props)
    // this.state ={
    //   shouldRedraw: false
    // }
  }
  // componentDidMount() {
  //   window.addEventListener('resize', this.setRedraw, false)
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.setRedraw, false)
  // }
  // setRedraw = () => {
  //   return this.setState({shouldRedraw: true})
  // }
  render() {
    // let data = {
    //   labels: ['sun', 'mon', 'tues', 'wed', 'thur', 'fri', 'sat'],
    //   datasets: [
    //     {
    //       label: 'requests',
    //       data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 7))
    //     },
    //     {
    //       label: 'media',
    //       data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 7))
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
      <article className={styles.WebsiteCard}>
        <header>
          <h1>{this.props.site.name}</h1>
          {this.props.site.domain ? (
            <Url target="_blank" href={`http://${this.props.site.domain}`}>
              <i className="fa fa-globe" aria-hidden="true" />&nbsp;{
                this.props.site.domain
              }
            </Url>
          ) : (
            <Link to={`/properties/${this.props.site.ZUID}`}>
              <i className="fa fa-plus" aria-hidden="true" />
              &nbsp;Set Domain
            </Link>
          )}
        </header>
        <main className={styles.WebsiteManage}>
          {/*<Line data={data} options={options} redraw={this.state.shouldRedraw} />*/}
          <Url
            className={styles.preview}
            target="_blank"
            title={`Preview  ${this.props.site.name}`}
            href={`https://${this.props.site.randomHashID}.preview.zesty.io`}
          >
            <i className={cx(styles.icon, 'fa fa-globe')} aria-hidden="true" />
          </Url>
        </main>
        <footer>
          <ButtonGroup className={styles.controls}>
            <Url
              className={styles.manager}
              target="_blank"
              href={`https://${this.props.site.randomHashID}.manage.zesty.io`}
            >
              <i className="fa fa-external-link" aria-hidden="true" /> Site
              Manager
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
