import React from "react";

import Password from "./Password";
import TwoFactor from "./TwoFactor";

import styles from "./Security.less";

const Security = () => {
  return (
    <div className={styles.Security}>
      <h1>Security</h1>
      <Password />
      <h1>Two-factor authentication</h1>
      <TwoFactor />
    </div>
  );
};

export default Security;
