import React from 'react'
import styles from './SelectBlueprint.less'

const SelectBlueprint = props => {
  return (
    <ul className={styles.List}>
      <li
        style={
          props.selection === 'create'
            ? { color: '#fff', textShadow: '2px 2px 2px black' }
            : null
        }
        onClick={() => props.handleSelect('create')}>
        Create New
      </li>
      {props.blueprints.map(bp => {
        console.log(props, bp)
        return (
          <li
            key={bp.ZUID}
            style={
              props.selection && props.selection.ID === bp.ID
                ? { color: '#fff', fontSize: '1.02rem', textShadow: '2px 2px 2px black' }
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
