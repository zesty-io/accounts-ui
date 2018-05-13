import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Collection } from 'react-virtualized'
import styles from './PropertiesList.less'

import PropertiesHeader from '../../components/PropertiesHeader'
import WebsiteCard from '../../components/WebsiteCard'
import WebsiteInvite from '../../components/WebsiteInvite'
import WebsiteCreate from '../../components/WebsiteCreate'

import PropertyOverview from '../PropertyOverview'

const GUTTER_SIZE = 20
const CELL_WIDTH = 400

const _columnYMap = []

class Properties extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sites: Object.keys(props.sitesFiltered).reduce((acc, ZUID, i) => {
        acc[i] = props.sitesFiltered[ZUID]
        return acc
      }, []),
      columnCount: 3
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)

    this.setState({
      sites: Object.keys(nextProps.sitesFiltered).reduce((acc, ZUID, i) => {
        acc[i] = nextProps.sitesFiltered[ZUID]
        return acc
      }, [])
    })
  }
  _cellRenderer = ({ index, isScolling, key, style }) => {
    const site = this.state.sites[index]
    return <WebsiteCard key={key} style={style} site={site} />
  }
  _cellSizeAndPositionGetter = ({ index }) => {
    const height = 250
    const columnPosition = index % (this.state.columnCount || 1)
    const x = columnPosition * (GUTTER_SIZE + CELL_WIDTH)
    const y = _columnYMap[columnPosition] || 0

    _columnYMap[columnPosition] = y + height + GUTTER_SIZE

    return {
      height: height,
      width: CELL_WIDTH,
      x: x,
      y: y
    }
  }
  render() {
    return (
      <section className={styles.Websites}>
        <PropertiesHeader />
        <main className={styles.siteListWrap}>
          <Collection
            width={1200}
            height={600}
            cellCount={Object.keys(this.state.sites).length}
            cellRenderer={this._cellRenderer}
            cellSizeAndPositionGetter={this._cellSizeAndPositionGetter}
          />

          {/* {Object.keys(this.props.sitesFiltered).length ? (
            <div className={styles.siteList}>
              {Object.keys(this.props.sites)
                .filter(
                  zuid =>
                    this.props.sites[zuid] && this.props.sites[zuid].inviteZUID
                )
                .map(zuid => {
                  return (
                    <WebsiteInvite key={zuid} site={this.props.sites[zuid]} />
                  )
                })}

              {Object.keys(this.props.sitesFiltered)
                .filter(
                  zuid =>
                    this.props.sitesFiltered[zuid] &&
                    !this.props.sitesFiltered[zuid].inviteZUID
                )
                .map(zuid => {
                  return (
                    <WebsiteCard
                      key={zuid}
                      site={this.props.sitesFiltered[zuid]}
                    />
                  )
                })}
              <Route path="/properties/:hash" component={PropertyOverview} />
              <Route
                path="/properties/invite/:hash"
                component={PropertyOverview}
              />
            </div>
          ) : this.props.sites === null ? (
            <div className={styles.siteList}>
              <WebsiteCreate />
            </div>
          ) : (
            <div className={styles.LoadingSites}>
              <h2>Loading Sites</h2>
              <Loader />
            </div>
          )} */}
        </main>
      </section>
    )
  }
}
export default connect(state => state)(Properties)
