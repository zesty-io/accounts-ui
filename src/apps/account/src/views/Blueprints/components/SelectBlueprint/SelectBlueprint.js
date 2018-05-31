import React from 'react'
import styles from './SelectBlueprint.less'

const SelectBlueprint = props => {

  return <ul>
    {props.blueprints.map(bp => {
      return <li>{bp.name}</li>
})}
  </ul>
}

export default SelectBlueprint
