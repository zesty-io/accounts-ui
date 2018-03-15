import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { Link } from 'react-router-dom'
import styles from './PropertyCreate.less'

import{ getBlueprints, addProperty } from '../../store'

class PropertyCreate extends Component {
  constructor(props) {
    super()
    this.state = {
      name: '',
      blueprint: '',
      bpStep: false
    }
  }
  componentDidMount() {
    this.props.dispatch(getBlueprints())
  }
  handleSubmit = () => {
    evt.preventDefault()
    console.log(this.state)
  }
  handleChange = (evt) => {
    this.setState({ name: evt.target.value })
  }
  render() {
    return (
      <section className={styles.PropertyCreate}>
        {!this.state.bpStep
          ? <div className={styles.nameNew}>
              <h3>Name your new web property</h3>
              <Input type='text' name='newPropertName' value={this.state.name} onChange={this.handleChange}/>
              <Button name='submitNewPropertyName' text='Submit' onClick={() => this.setState({ bpStep: true })} />
              <Link to='/properties'> <Button name='cancel' text='cancel' /> </Link>
            </div>
          : <div>
              {
                this.props.sites.blueprints.map((blueprint, i) => {
                  return (<div key={i}>
                    <h2>{blueprint.name}</h2>
                    <p>{blueprint.description}</p>
                    <img src={blueprint.url} alt='bp img' />
                    <Button name={`selectBlueprint${i}`} text='select this blueprint' /></div>
                  )
                })
              }
            </div>
        }

      </section>
    )
  }
}
const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = state => {
  return bindActionCreators({getBlueprints, addProperty}, dispatch)
}

export default connect(mapStateToProps)(PropertyCreate)
