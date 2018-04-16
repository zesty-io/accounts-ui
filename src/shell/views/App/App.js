import { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import Login from "../Login";
import TwoFactor from "../TwoFactor";
import Signup from "../Signup";
import ResetPasswordStart from "../ResetPasswordStart";
import ResetPasswordEnd from "../ResetPasswordEnd";
import VerifyEmail from "../VerifyEmail";

import AppHeader from "../../components/AppHeader";
import AppError from "../../components/AppError";
import Notify from "../../components/Notify";
import Modal from "../../components/Modal";

import styles from "./App.less";
import { fetchUser } from "../../store/user";
import { verifyAuth } from "../../store/auth";

class Shell extends Component {
  componentDidMount() {
    //user fetch moved into login call
    if (!this.props.user.ZUID) {
      if (localStorage.getItem("ZUID")) {
        this.props.dispatch(fetchUser(localStorage.getItem("ZUID")));
      } else {
        //do something to let the user know we've lost their ZUID or redirect to login
      }
    } else {
      this.props.dispatch(fetchUser(this.props.user.ZUID));
    }
    setInterval(() => {
      this.props.dispatch(verifyAuth());
    }, 60000);
  }
  render() {
    return (
      <section className={styles.AppShell}>
        <AppHeader user={this.props.user} dispatch={this.props.dispatch} />
        <AppError>
          <Notify />
          <Modal />
          <section className={styles.AppMain}>
            {this.props.user.email ? (
              <Switch>
                {/* <Route path="/dashboard" component={Dashboard} /> */}
                <Route path="/properties" component={Properties} />
                <Route path="/settings" component={Settings} />
                {/* <Route path="/messages" component={Messages} /> */}
                <Redirect from="/" to="/properties" />
                {/* TODO: handle no match */}
              </Switch>
            ) : (
              <div className={styles.loaderWrap}>
                <h2>Loading all your Hopes and Dreams</h2>
                <Loader />
              </div>
            )}
          </section>
        </AppError>
      </section>
    );
  }
}
let AppShell = connect(state => state)(Shell);

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          {this.props.auth.valid ? (
            <Route path="/" component={AppShell} />
          ) : null}
          <React.Fragment>
            <Notify />
            <Route exact path="/login" component={Login} />
            <Route path="/login/2fa" component={TwoFactor} />
            <Route path="/login/:invited" component={Login} />
            <Route path="/signup/:invited" component={Signup} />
            <Route path="/signup" component={Signup} />
            <Route
              exact
              path="/reset-password"
              component={ResetPasswordStart}
            />
            <Route
              path="/reset-password-confirm"
              component={ResetPasswordEnd}
            />
            <Route path="/verify-email" component={VerifyEmail} />
            <Redirect to="/login" />
          </React.Fragment>
        </Switch>
      </div>
    );
  }
}
export default connect(state => state)(App);
