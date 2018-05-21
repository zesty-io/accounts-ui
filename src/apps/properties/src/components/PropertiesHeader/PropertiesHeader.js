import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './PropertiesHeader.less'

import { filter } from '../../store/sitesFiltered'

class PropertiesHeader extends Component {
  render() {
    return (
      <header className={styles.PropertiesHeader}>
        <div className={styles.Actions}>
          {this.props.user.staff ? (
            <span className={styles.Eco}>
              <Select onSelect={this.filterByEco}>
                <Option key="default" value="" text="Select Ecosystem" />
                <Option key="petDesk" value={24291} text="Pet Desk" />
                <Option key="alphaUniverse" value={154} text="Alpha Universe" />
                <Option key="Hofhaus" value={24290} text="Hofbrauhaus" />
                <Option key="Zesty" value={1} text="Zesty" />
              </Select>
            </span>
          ) : null}
          <Search
            className={styles.Search}
            placeholder="Search by web property name or domain"
            onClick={this.onSearch}
            onKeyUp={this.onSearch}
          />
          <Button className={styles.Create} onClick={this.onCreateSite}>
            <i className="fa fa-plus" /> Create Web Property
          </Button>
        </div>
      </header>
    )
  }
  onSearch = evt => {
    this.props.dispatch(filter(evt.target.value))
  }
  onCreateSite = evt => {
    this.props.history.push('/properties/create')
  }
  filterByEco = evt => {
    if (evt.target.dataset.value === '') {
      return this.props.dispatch(filter(''))
    }
    this.props.dispatch(filter(Number(evt.target.dataset.value)))
  }
}

export default withRouter(connect(state => state)(PropertiesHeader))
