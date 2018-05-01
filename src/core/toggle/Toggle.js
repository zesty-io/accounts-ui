import React, { Component } from "react";

import styles from "./Toggle.less";

const Toggle = props => {
  return (
    <label className={styles.switch}>
      <input {...props} type="checkbox" />
      <span className={styles.slider} />
    </label>
  );
};

export default Toggle;
