import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './PropertiesHeader.less'

import { filter } from '../../store/sitesFiltered'

class PropertiesHeader extends Component {
  render() {
    return (
      <header className={styles.PropertiesHeader}>
        <div className={styles.actions}>
          <Search
            className={styles.filter}
            placeholder="Search by web property name or domain"
            onClick={this.onSearch}
            onKeyUp={this.onSearch}
          />
          <Button className={styles.save} onClick={this.onCreateSite}>
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
}

export default withRouter(connect(state => state)(PropertiesHeader))
