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
          {/* this button should submit the name of the new site and then redirect to the returned ZUID */}
          <Link to="/properties/create/blueprint">
            <Button onClick={this.handleClick}>
              <i className="fa fa-plus" aria-hidden="true" />
              Create New Property
            </Button>
            </Link>
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
  handleClick = evt => {
    this.props.dispatch(postNewSite(this.props.propertyName))
    //on success redirect to edit blueprint
  }
}

const mapStateToProps = (state) => {
  return {...state.createSite}
}

export default connect(mapStateToProps)(PropertyCreate)
