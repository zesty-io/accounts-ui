import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { Card, CardHeader, CardContent } from '@zesty-io/core/Card'

import styles from './Table.less'
export const Table = React.memo(function Table(props) {
  const [headers, setHeaders] = useState([])
  const [rows, setRows] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    transformData()
  }, [])

  const transformData = () => {
    const headers = Object.keys(props.data[0]).map(header =>
      header.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) {
        return str.toUpperCase()
      })
    )
    setHeaders(headers)
  }
  const arrangement = props.arrangement.split(' ')
  const columns = arrangement.reduce((a, b) => {
    return Number(a) + Number(b)
  }, 0)

  const getWidth = index => `${(100 / columns) * arrangement[index]}%`

  return (
    <article className={styles.Table}>
      <header className={styles.TableHeader}>
        {headers.map((header, index) => (
          <div className={styles.HeaderItem} style={{ width: getWidth(index) }}>
            <span>{header}</span>
          </div>
        ))}
      </header>
      <div className={styles.TableContent}>
        {props.data.map((row, rowIndex) => (
          <article className={styles.TableRow}>
            {Object.keys(props.data[0]).map((header, index) => (
              <p className={styles.Cell} style={{ width: getWidth(index) }}>
                <span>{row[header]}</span>
              </p>
            ))}
            {props.actions && (
              <p
                className={styles.RowActions}
                style={{ width: getWidth(headers.length) }}>
                {props.actions(rowIndex)}
              </p>
            )}
          </article>
        ))}
      </div>
    </article>
  )
})
