import React from "react";

import Password from "./Password";
import TwoFactorOptions from "./TwoFactorOptions";

import styles from "./Security.less";

const Security = () => {
  return (
    <div className={styles.Security}>
      <h1 className={styles.title}>Security</h1>
      <Password />
      <h1 className={styles.title}>Two-Factor Authentication</h1>
      <TwoFactorOptions />
    </div>
  );
};

export default Security;
