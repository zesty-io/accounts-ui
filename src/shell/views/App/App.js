import { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import Login from "../Login";
import TwoFactor from "../TwoFactor";
import Signup from "../Signup";
import ResetPasswordStart from "../ResetPasswordStart";
import ResetPasswordEnd from "../ResetPasswordEnd";
import VerifyEmail from "../VerifyEmail";

import NotFound from "../../../shell/components/NotFound";

import AppHeader from "../../components/AppHeader";
import AppError from "../../components/AppError";
import Notify from "../../components/Notify";
import Modal from "../../components/Modal";

import styles from "./App.less";
import { fetchUser } from "../../store/user";
import { verifyAuth } from "../../store/auth";

class Shell extends Component {
  componentDidMount() {
    if (!this.props.user.email && this.props.user.ZUID) {
      // in the case of a hard refresh restores user data
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
            <Switch>
              <Route path="/login" component={Login} />
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
              <Route component={NotFound} />{" "}
              {/* This can be used for our 404 */}
              <Redirect from="/" to="/login" />
            </Switch>
          </React.Fragment>
        </Switch>
      </div>
    );
  }
}
export default withRouter(connect(state => state)(App));
