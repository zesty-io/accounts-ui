import React, { Component } from "react";

import styles from "./Toggle.less";

class Toggle extends Component {
  render() {
    return (
      <label className={styles.switch}>
        <input type="checkbox" />
        <span className={styles.slider} />
      </label>
    );
  }
}

export default Toggle;
