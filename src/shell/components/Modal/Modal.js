import React, { Component } from 'react'
// import { connect } from "react-redux";

import styles from './Modal.less'

const Modal = props => {
  const ModalComponent = props.component
  return (
    props.isOpen && (
      <section className={styles.Modal}>
        <Button
          onClick={props.close}
          text="Close"
          className={styles.close}
        />
        <div>{props.children}</div>
      </section>
    )
  )
}

export default Modal
