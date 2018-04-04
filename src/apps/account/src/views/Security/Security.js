import React from "react";

import Password from "./Password";
import TwoFactor from "./TwoFactor";

import styles from "./Security.less";

const Security = () => {
  return (
    <div className={styles.Security}>
      <h1 className={styles.title}>Security</h1>
      <Password />
      <h1 className={styles.title}>Two-factor authentication</h1>
      <TwoFactor />
    </div>
  );
};

export default Security;
