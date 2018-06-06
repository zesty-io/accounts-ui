import React, { Component } from 'react'

import styles from './TeamList.less'

class TeamList extends Component {
  render() {
    return (
      <ul className={styles.List}>
      {/* <li style={props.selection === 'create' ? selectedStyle : null}>
        <Button className={styles.Create} onClick={() => props.handleSelect('create')}>
          {' '}
          <i className="fa fa-plus" /> Create Team
        </Button>
      </li> */}
      {Object.keys(this.props.teams).map(team => {
        return (
          <li
            key={this.props.teams[team].ZUID}
            // style={
            //   props.selection && props.selection.ID === team.ID
            //     ? selectedStyle
            //     : null
            // }
            onClick={() => console.log('click')}>
            <p>{this.props.teams[team].name}</p>
            <i
              className={`${styles.trash} fa fa-trash-o`}
              onClick={() => console.log('click')}
            />
          </li>
        )
      })}
    </ul>
    )
  }
}

export default TeamList
