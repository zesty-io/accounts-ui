import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import styles from './PropertyCreate.less'

class PropertyCreate extends Component {
  constructor(props) {
    super()
    this.state = {
      name: ''
    }
  }
  render() {
    return (
      <section className={styles.PropertyCreate}>
        <div className={styles.nameNew}>
          <h1>Name your new web property</h1>
          <Input
            type="text"
            value={this.state.name}
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
    this.setState({
      name: evt.target.value
    })
  }
  handleSubmit = evt => {
    // TODO make api request to create site
    // TODO user returned zuid
    window.location = '/properties/8-45a294a-1zg0cg/blueprint'
  }
}
export default connect(state => state)(PropertyCreate)
