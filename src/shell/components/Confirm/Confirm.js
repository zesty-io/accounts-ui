import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Confirm.less'

import { REMOVE_CONFIRM } from '../../store/confirm'

const Confirm = props => {
  return (
    (props.isOpen && (
      <section className={styles.confirmWrapper}>
        <section className={styles.Confirm}>
          <h1>{props.prompt}</h1>
          <footer>
            <ButtonGroup className={styles.buttons}>
              <Button
                onClick={() => {
                  props.callback(true)
                  props.dispatch({ type: REMOVE_CONFIRM })
                }}
                text="Yes"
              />
              <Button
                onClick={() => {
                  props.callback(false)
                  props.dispatch({ type: REMOVE_CONFIRM })
                }}
                text="No"
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
