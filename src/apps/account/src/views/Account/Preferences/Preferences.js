import react, { Component } from "react";
import { connect } from "react-redux";

import styles from "./Preferences.less";

class Preferences extends Component {
  render() {
    let Stats, Permissions, UserAccess, CompanyAccess, Blueprint
    const fakeUserPrefs = [
      {
        title: "Monthly Useage",
        className: "fa fa-line-chart",
        Component: Stats
      },
      {
        title: "Permissions",
        className: "fa fa-lock",
        Component: Permissions
      },
      {
        title: "User Access",
        className: "fa fa-users",
        Component: UserAccess
      },
      {
        title: "Company Access",
        className: "fa fa-building",
        Component: CompanyAccess
      },
      {
        title: "Blueprint",
        className: "fa fa-file-code-o",
        Component: Blueprint
      }
    ];
    return (
      <article>
        <p>Here you can change the order in which Website Overview items are displayed</p>
        <ol className={styles.prefs}>
          {fakeUserPrefs.map((item, i) => {
            return <li key={i}>{item.title}</li>;
          })}
        </ol>
      </article>
    );
  }
}

export default connect(state => state)(Preferences);
