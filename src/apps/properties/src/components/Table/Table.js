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
  const columns = headers.length + (props.actions ? 1 : 0)

  const getTemplateColumns = () => {
    let value = ''

    for (let i = 0; i < columns; i++) {
      value += '1fr '
    }

    return value
  }

  const templateColumns = getTemplateColumns()

  const validateExpiry = date => {
    const arr = date.split('-')
    const sort = [arr[2], arr[0], arr[1]]
    const stringDate = sort.join('-')
    const parseDate = new Date(stringDate)
    const today = new Date()

    return parseDate.getTime() === today.getTime()
  }

  const parseExpires = date => {
    if (!date) return 0

    const arr = date.split('-')
    const sort = [arr[2], arr[0], arr[1]]
    const stringDate = sort.join('-')
    const parseDate = new Date(stringDate)

    return parseDate.getTime()
  }

  const expireSoon = expires => {
    const today = new Date()
    if (expires) {
      return today.getTime() - parseExpires(expires) === 1296000000
    }
  }

  return (
    <article className={styles.Table}>
      <header
        className={styles.TableHeader}
        style={{ gridTemplateColumns: templateColumns }}>
        {headers.map(header => {
          return (
            <div className={styles.HeaderItem} key={header}>
              <span>{header}</span>
            </div>
          )
        })}
      </header>
      <div className={styles.TableContent}>
        {props.data
          .sort((a, b) => {
            const today = new Date()
            if (today.getTime() - parseExpires(a.expires) === 1296000000) {
              return -1
            } else {
              return 1
            }
          })
          .map((row, rowIndex) => {
            return (
              <article
                key={row.domain}
                className={cx(
                  expireSoon(row.expires)
                    ? styles.BorderExpired
                    : styles.TableRow,
                  row.expires && validateExpiry(row.expires)
                    ? styles.OpacityExpired
                    : styles.TableRow
                )}
                style={{ gridTemplateColumns: templateColumns }}>
                {Object.keys(props.data[0]).map(header => {
                  return (
                    <p className={styles.Cell} key={row[header]}>
                      <span>{row[header]}</span>
                    </p>
                  )
                })}
                {props.actions && (
                  <p className={styles.RowActions}>{props.actions(rowIndex)}</p>
                )}
              </article>
            )
          })}
      </div>
    </article>
  )
})
