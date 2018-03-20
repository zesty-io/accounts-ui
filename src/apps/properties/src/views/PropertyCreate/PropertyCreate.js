import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import { addSiteInfo, postNewSite } from '../../store/createSite'

import styles from './PropertyCreate.less'

class PropertyCreate extends Component {
  render() {
    return (
      <section className={styles.PropertyCreate}>
        <div className={styles.nameNew}>
          <h1>Name your new web property</h1>
          <Input
            type="text"
            name="propertyName"
            placeholder="e.g. My Blog or Company Marketing Website"
            onChange={this.handleChange}
          />
          <div className={styles.controls}>
            <Button onClick={this.handleSubmit}>
              <i className="fa fa-plus" aria-hidden="true" />
              Create New Property
            </Button>
            <Link to="/properties">
              <i className="fa fa-ban" aria-hidden="true" />
              &nbsp;Cancel
            </Link>
          </div>
        </div>
      </section>
    )
  }
  handleChange = evt => {
    this.props.dispatch(addSiteInfo({[evt.target.name]: evt.target.value}))
  }
  handleSubmit = evt => {
    // TODO make api request to create site
    // TODO use returned zuid
    window.location = '/properties/8-45a294a-1zg0cg/blueprint'
  }
}
const mapStateToProps = (state) => {
  return {...state.createSite}
}

export default connect(mapStateToProps)(PropertyCreate)
