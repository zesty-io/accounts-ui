export function systemRoles(state = {}, action) {
  switch (action.type) {
    case 'FETCH_SYSTEM_ROLES_SUCCESS':
      return action.roles
    default:
      return state
  }
}

export function fetchSystemRoles() {
  return dispatch => {
    // TODO Fetch from API
    // return request()
    dispatch({
      type: 'FETCH_SYSTEM_ROLES_SUCCESS',
      roles: {
        '31-71cfc74-0wn3r': {
          ZUID: '31-71cfc74-0wn3r',
          name: 'Owner',
          accessLevel: 0
        },
        '31-71cfc74-4dm13': {
          ZUID: '31-71cfc74-4dm13',
          name: 'Admin',
          accessLevel: 1
        },
        '31-71cfc74-d3v3l0p3r': {
          ZUID: '31-71cfc74-d3v3l0p3r',
          name: 'Developer',
          accessLevel: 2
        },
        '31-71cfc74-s30': {
          ZUID: '31-71cfc74-s30',
          name: 'SEO',
          accessLevel: 3
        },
        '31-71cfc74-p0bl1shr': {
          ZUID: '31-71cfc74-p0bl1shr',
          name: 'Publisher',
          accessLevel: 4
        },
        '31-71cfc74-c0ntr1b0t0r': {
          ZUID: '31-71cfc74-c0ntr1b0t0r',
          name: 'Contributor',
          accessLevel: 5
        }
      }
    })
  }
}
