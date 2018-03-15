import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './PropertiesHeader.less'

import { filterProperties } from '../../store'

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
          <Button className={styles.save}>
            <Link to="/properties/create">
              <i className="fa fa-plus" aria-hidden="true" />Create Web Property
            </Link>
          </Button>
        </div>
      </header>
    )
  }
  onSearch = evt => {
    this.props.dispatch(filterProperties(evt.target.value))
  }
}

export default connect(state => state)(PropertiesHeader)
