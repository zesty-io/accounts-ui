import React, { Component } from 'react'
// import { connect } from "react-redux";

import styles from './Modal.less'

export default function Modal(props) {
  // const ModalComponent = props.component
  return (
    <section className={styles.Modal}>
      <Button onClick={() => props.history.goBack()} className={styles.close}>
        <i className="fa fa-times-circle-o" aria-hidden="true" /> Close
      </Button>
      <div>{props.children}</div>
    </section>
  )
}
