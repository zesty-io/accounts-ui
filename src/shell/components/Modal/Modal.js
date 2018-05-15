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
        {props.children}
      </section>
    )
  )
}

export default Modal
