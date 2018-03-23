import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, withRouter } from 'react-router-dom'

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
            <Button onClick={this.handleClick}>
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
  handleClick = () => {
    this.props.dispatch(postNewSite(this.props.propertyName))
      .then(data => {
        this.props.history.push(`/properties/${data.data.ZUID}/blueprint`)
        return this.props.dispatch({
          type: "CREATE_SITE_SUCCESS"
        })
      })
      .catch(error => {
        console.log(error)
        return this.props.dispatch({
          type: "CREATE_SITE_ERROR",
          error
        })
      })
  }
}

const mapStateToProps = (state) => {
  return {...state.createSite}
}

export default withRouter(connect(mapStateToProps)(PropertyCreate))
