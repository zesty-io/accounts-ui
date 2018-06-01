import React from 'react'
import styles from './SelectBlueprint.less'

const selectedStyle = { color: '#fff', textShadow: '2px 2px 2px black' }
const SelectBlueprint = props => {
  return (
    <ul className={styles.List}>
      <li
        style={
          props.selection === 'create'
            ? selectedStyle
            : null
        }
        onClick={() => props.handleSelect('create')}>
        Create New
      </li>
      {props.blueprints.map(bp => {
        return (
          <li
            key={bp.ZUID}
            style={
              props.selection && props.selection.ID === bp.ID
                ? selectedStyle
                : null
            }
            onClick={() => props.handleSelect(bp.ID)}>
            {bp.name}
          </li>
        )
      })}
    </ul>
  )
}

export default SelectBlueprint
