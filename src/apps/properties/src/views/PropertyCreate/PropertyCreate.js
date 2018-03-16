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
          <h3>Name your new web property</h3>
          <Input
            type="text"
            name="newPropertName"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Button
            name="submitNewPropertyName"
            text="Submit"
            onClick={this.handleSubmit}
          />
          <Link to="/properties">
            {' '}
            <Button name="cancel" text="cancel" />{' '}
          </Link>
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
