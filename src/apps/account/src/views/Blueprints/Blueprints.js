import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Blueprint.less'

class Blueprints extends Component {
  render() {
    return (
        <div className={styles.blueprints}>
          <h2>Blueprints</h2>
          <a className="button green fr">
            <span className="icon-plus">+</span>
            Add New Blueprint
            <Infotip>
              In this area you can manager your own custom Blueprints. Learn how
              to create and maintain your own Blueprints using GitHub through
              this. You may share Blueprints by passing your GitHub repo url to
              a co-worker or friend. You may use other public Blueprints by
              forking their repositories, and copying the Github repository url.
            </Infotip>
          </a>
          <div className={styles.bptable}>
              <main>
                <header>
                  <h3>Blueprint Name</h3>
                  <h3>Github URL</h3>
                  <h3>Date Added</h3>
                </header>
                {this.props.profile.blueprints.map((bp, i) => (
                  <article key={i}>
                    <span>{bp.name}</span>
                    <span>{bp.url}</span>
                    <span>{bp.date}</span>
                  </article>
                ))}
              </main>
          </div>
        </div>
    )
  }
}

export default connect(state => state)(Blueprints)
