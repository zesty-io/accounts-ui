import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./Modal.less";

const Modal = props => {
  const ModalComponent = props.component;
  return (
    props.isOpen && (
      <section className={styles.Modal}>
        <Button
          onClick={() => props.dispatch({ type: "REMOVE_MODAL" })}
          text="Close"
          className={styles.close}
        />
        <ModalComponent props={props.props} />
      </section>
    )
  );
};

export default connect(state => state.modal)(Modal);
