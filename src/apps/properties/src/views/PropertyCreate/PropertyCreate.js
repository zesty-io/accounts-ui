import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './PropertyCreate.less'

class PropertyCreate extends Component {
  constructor(props) {
    super()
    this.state = {
      name: '',
      blueprint: '',
      bpStep: false
    }
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
          ? <div>
              <h3>Name your new web property</h3>
              <Input type='text' name='newPropertName' value={this.state.name} onChange={this.handleChange}/>
              <Button name='submitNewPropertyName' text='Submit' onClick={() => this.setState({ bpStep: true })} />
              <Link to='/properties'> <Button name='cancel' text='cancel' /> </Link>
            </div>
          : <div>
              {
                this.props.blueprints.map(blueprint => {
                  return (<div>
                    <h2>{blueprint.name}</h2>
                    <p>{blueprint.description}</p>
                    <img src={blueprint.url} alt='bp img' /></div>
                  )
                })
              }
            </div>
        }

      </section>
    )
  }
}

//mapStateToProps for blueprints

export default connect(state => state)(PropertyCreate)
