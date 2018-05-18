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
          <Search
            className={styles.Search}
            placeholder="Search by web property name or domain"
            onClick={this.onSearch}
            onKeyUp={this.onSearch}
          />
          {this.props.user.staff ? (
            <Select onSelect={this.filterByEco}>
              <Option key="default" value="" text="Select Ecosystem" />
              <Option key="petDesk" value="24291" text="Pet Desk" />
              <Option key="alphaUniverse" value="154" text="Alpha Universe" />
              <Option key="Hofhaus" value="24290" text="Hofbrauhaus" />
            </Select>
          ) : null}
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
    this.props.dispatch(filter(evt.target.dataset.value))
  }
}

export default withRouter(connect(state => state)(PropertiesHeader))
