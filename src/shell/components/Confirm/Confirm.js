import React, { Component } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'

import styles from './Confirm.less'

import { REMOVE_CONFIRM } from '../../store/confirm'

import { ButtonGroup } from '@zesty-io/core/ButtonGroup'
import { Button } from '@zesty-io/core/Button'

const Confirm = props => {
  return (
    (props.isOpen && (
      <section className={styles.confirmWrapper}>
        <section className={cx(styles.Confirm, styles[props.kind])}>
          <h1>{props.prompt}</h1>
          <footer>
            <ButtonGroup
              className={`${styles.buttons} ${
                props.single ? styles.short : ''
              }`}>
              <Button
                id="confirmTrue"
                type={props.kind}
                onClick={() => {
                  props.callback(true)
                  props.dispatch({ type: REMOVE_CONFIRM })
                }}>
                {props.kind === 'warn' && (
                  <i
                    className="fa fa-exclamation-triangle"
                    aria-hidden="true"
                  />
                )}
                {props.confirmText || 'Yes'}
              </Button>
              <Button
                id="confirmFalse"
                onClick={() => {
                  props.callback(false)
                  props.dispatch({ type: REMOVE_CONFIRM })
                }}
                className={props.single ? styles.hide : ''}
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
