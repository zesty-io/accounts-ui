import React, { Component } from 'react'
import {connect} from 'react-redux'

class Blueprints extends Component {
  render () {
    return (
      <section id='settings'>
        <div className="inner">
        <h2>Blueprints</h2>
        <a className="button green fr" href="#!/account/my-plates/new/">
            <span className="icon-plus"></span> Add New Blueprint
        </a>
        <Infotip>In this area you can manager your own custom Blueprints. Learn how to create and maintain your own Blueprints using GitHub through this <a target="_blank" href="https://developer.zesty.io/docs/templating/building-a-template-with-github/">Zesty.io Blueprint tutorial</a>. You may share Blueprints by passing your GitHub repo url to a co-worker or friend. You may use other public Blueprints by forking their repositories, and copying the Github repository url.</Infotip>

        <div className="z-row">
            <table>
                <tbody><tr>
                    <th>Blueprint Name</th><th>Github URL</th><th>Date Added</th>
                    </tr>
                    {
                      this.props.settings.blueprints ?
                      this.props.settings.blueprints.map((bp, i) => <tr key={i}>
                        <td>{bp.name}</td>
                        <td>{bp.url}</td>
                        <td>{bp.date}</td>
                      </tr>)
                      :
                      <tr><td>loading</td></tr>
                    }
                </tbody></table>
        </div>
    </div>
      </section>
    )
  }
}

export default connect(state => state)(Blueprints)
