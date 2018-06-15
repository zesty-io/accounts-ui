import React from 'react'
import styles from './SelectBlueprint.less'

const selectedStyle = { color: '#fff' }
const SelectBlueprint = props => {
  return (
    <ul className={styles.List}>
      <h1>Custom Blueprints</h1>
      {props.blueprints.map(bp => {
        return (
          <li
            key={bp.ZUID}
            style={
              props.selection && props.selection.ID === bp.ID
                ? selectedStyle
                : null
            }
            onClick={() => props.handleSelect(bp.ID)}
          >
            <p>{bp.name}</p>
            <i
              className={`${styles.trash} fa fa-trash-o`}
              onClick={() => props.handleDelete(bp.ID)}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default SelectBlueprint
