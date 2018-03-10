import React, { Component } from 'react'
import {connect} from 'react-redux'

class Blueprints extends Component {
  render () {
    return (
      <section id='settings'>
        <div className="inner">
        <h2>Blueprints</h2>
        <a className="button green fr">
            <span className="icon-plus">+</span>
            Add New Blueprint
            <Infotip>In this area you can manager your own custom Blueprints. Learn how to create and maintain your own Blueprints using GitHub through this. You may share Blueprints by passing your GitHub repo url to a co-worker or friend. You may use other public Blueprints by forking their repositories, and copying the Github repository url.</Infotip>
        </a>
        <div className="z-row">
            <table>
                <tbody><tr>
                    <th>Blueprint Name</th><th>Github URL</th><th>Date Added</th>
                    </tr>
                    {
                      this.props.profile.blueprints.map((bp, i) => <tr key={i}>
                        <td>{bp.name}</td>
                        <td>{bp.url}</td>
                        <td>{bp.date}</td>
                      </tr>)
                    }
                </tbody></table>
        </div>
    </div>
      </section>
    )
  }
}

export default connect(state => state)(Blueprints)
