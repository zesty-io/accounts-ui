import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './PropertiesHeader.less'

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
    // if (!this.state.timeout) {
    //   clearTimeout(this.state.timeout)
    //   this.setState({
    //     timeout: setTimeout(() => {
    //
    //     }, 500)
    //   })
    // }

    console.log(evt)
    // this.props.dispatch(filterSites(evt.target.value))
  }
}

export default connect(state => state)(PropertiesHeader)
