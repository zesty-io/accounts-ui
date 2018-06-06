import React from 'react'
import styles from './SelectBlueprint.less'

const selectedStyle = { color: '#fff' }
const SelectBlueprint = props => {
  return (
    <ul className={styles.List}>
      <li style={props.selection === 'create' ? selectedStyle : null}>
        <Button className={styles.Create} onClick={() => props.handleSelect('create')}>
          {' '}
          <i className="fa fa-plus" /> Create Blueprint
        </Button>
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
