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
            <Select onSelect={this.filterByEco}>
              <Option key="default" value="" text="Select Ecosystem" />
              <Option key="test1" value="" text="Ecosystem" />
              <Option key="test2" value="" text="Ecosystem2" />
            </Select>
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
    // TODO: fetch ecosystems, build into filteredSites
    console.log('filter by ecosystem')
  }
}

export default withRouter(connect(state => state)(PropertiesHeader))
