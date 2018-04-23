import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Confirm.less'

const Confirm = props => {
  return (
    (props.isOpen && (
      <section className={styles.confirmWrapper}>
        <section className={styles.Confirm}>
          <h1>{props.prompt}</h1>
        <footer>
          <ButtonGroup className={styles.buttons}>
            <Button
              onClick={() => props.dispatch({ type: 'REMOVE_CONFIRM_TRUE' })}
              text="Continue"
            />
            <Button
              onClick={() => props.dispatch({ type: 'REMOVE_CONFIRM_FALSE' })}
              text="Cancel"
            />
          </ButtonGroup>
        </footer>
        </section>
      </section>
    )) ||
    null
  )
}

export default connect(state => state.confirm)(Confirm)
