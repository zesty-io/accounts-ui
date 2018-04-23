import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./Confirm.less";

const Confirm = props => {
  const ConfirmComponent = props.component;
  return (
    props.isOpen && (
      <section className={styles.Confirm}>
        <Button
          onClick={() => props.dispatch({ type: "REMOVE_MODAL" })}
          text="Close"
          className={styles.close}
        />
      </section>
    )
  );
};

export default connect(state => state.modal)(Confirm);
