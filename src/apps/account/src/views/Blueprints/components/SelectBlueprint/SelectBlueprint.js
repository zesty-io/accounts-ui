import React from 'react'
import styles from './SelectBlueprint.less'

const SelectBlueprint = props => {
  return (
    <ul className={styles.List}>
      <li onClick={() => props.handleSelect('new')}>Create New</li>
      {props.blueprints.map(bp => {
        return (
          <li
            key={bp.ZUID}
            onClick={() => props.handleSelect(bp.ID)}>
            {bp.name}
          </li>
        )
      })}
    </ul>
  )
}

export default SelectBlueprint
