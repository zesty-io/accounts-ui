import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './Websites.less'

import { fetchSites } from '../../store/sites'

import PropertiesList from '../PropertiesList'
import PropertyCreate from '../PropertyCreate'
import PropertyCreateFirst from '../PropertyCreateFirst'
// import PropertyAcceptInvite from "../PropertyAcceptInvite";
import PropertyBlueprint from '../PropertyBlueprint'

class Properties extends Component {
  componentDidMount() {
    // **
    // For now this is not how we want to address invite acceptance
    //**
    // if (this.props.user && this.props.user.invited) {
    //   //for invited users they are prompted to accept their invite
    //   this.props.dispatch({
    //     type: "NEW_MODAL",
    //     component: PropertyAcceptInvite
    //   });
    // }
    this.props.dispatch(fetchSites()).then(data => {
      if (!data.data.length) {
        if (this.props.user && this.props.user.lastLogin === null) {
          //for first time users without invites they are prompted to create a site
          this.props.dispatch({
            type: 'NEW_MODAL',
            component: PropertyCreateFirst
          })
        }
      }
    })
  }
  render() {
    return (
      <section className={styles.Websites}>
        <Switch>
          <Route
            exact
            path="/properties/:zuid/blueprint"
            component={PropertyBlueprint}
          />
          <Route exact path="/properties/create" component={PropertyCreate} />
          <Route path="/properties" component={PropertiesList} />
        </Switch>
      </section>
    )
  }
}
export default connect(state => state)(Properties)
