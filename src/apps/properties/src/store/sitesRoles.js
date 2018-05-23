import { request } from '../../../../util/request'


export function sitesRoles(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_ROLES':
      return state
    case 'FETCH_ROLES_SUCCESS':
      return { ...state, [action.siteZUID]: action.normalizedRoles }

    case 'FETCH_ROLES_ERROR':
      return state
    case 'ADDING_ROLE_FAILURE':
      return state
    case 'ADDING_ROLE_SUCCESS':
      return {
        ...state,
        [action.siteZUID]: {...state[action.siteZUID],
          [action.role.ZUID]: action.role
        }
      }
    case 'DELETING_ROLE':
      return state
    case 'DELETING_ROLE_SUCCESS':
      return { ...state, [action.siteZUID]: action.siteRoles }
    case 'DELETING_ROLE_FAILURE':
      return state
    case 'FETCHING_ROLE':
      return state
    case 'FETCHING_ROLE_SUCCESS':
      return {
        ...state,
        [action.siteZUID]: { ...state[action.siteZUID], ...action.role }
      }
    case 'FETCHING_ROLE_FAILURE':
      return state
    case 'UPDATING_ROLE':
      return state
    case 'UPDATING_ROLE_SUCCESS':
      return state
    case 'UPDATING_ROLE_FAILURE':
      return state
    case 'CREATING_ROLE':
      return state
    case 'CREATING_ROLE_SUCCESS':
      return state
    case 'CREATING_ROLE_FAILURE':
      return state
    default:
      return state
  }
}

export const fetchSiteRoles = siteZUID => {
  return dispatch => {
    dispatch({
      type: 'FETCHING_ROLES'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZUID}/roles`)
      .then(roles => {
        dispatch({
          type: 'FETCH_ROLES_SUCCESS',
          siteZUID,
          normalizedRoles: roles.data.reduce((acc, role) => {
            acc[role.ZUID] = role
            return acc
          }, {})
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'FETCH_ROLES_ERROR',
          err
        })
      })
  }
}

export const getRole = (roleZUID, siteZUID) => {
  return dispatch => {
    dispatch({ type: 'FETCHING_ROLE' })
    return request(`${CONFIG.API_ACCOUNTS}/roles/${roleZUID}`)
      .then(data => {
        let normalizedGranularRoles = {}
        data.data.granularRoles &&
          data.data.granularRoles.map(role => {
            normalizedGranularRoles[role.resourceZUID] = { ...role }
          })
        let role = {
          [data.data.ZUID]: {
            ...data.data,
            granularRoles: normalizedGranularRoles
          }
        }
        dispatch({
          type: 'FETCHING_ROLE_SUCCESS',
          role,
          siteZUID
        })
        return data.data
      })
      .catch(err => {
        dispatch({ type: 'FETCHING_ROLE_FAILURE' })
        console.table(err)
        throw err
      })
  }
}

export const createRole = (siteZUID, body) => {
  return dispatch => {
    dispatch({ type: 'ADDING_ROLE' })
    return request(`${CONFIG.API_ACCOUNTS}/roles`, {
      method: 'POST',
      json: true,
      body: {
        entityZUID: siteZUID,
        name: body.name,
        systemRoleZUID: body.systemRoleZUID
        // add expiry once allowed by API again
      }
    })
      .then(data => {
        dispatch({
          type: 'ADDING_ROLE_SUCCESS',
          siteZUID,
          role: data.data
        })
        return data.data
      })
      .catch(err => {
        console.table(err)
        dispatch({ type: 'ADDING_ROLE_FAILURE' })
        throw err
      })
  }
}

export const removeRole = (roleZUID, siteZUID) => {
  return (dispatch, getState) => {
    //create an object with the role deleted
    const siteRoles = getState().sitesRoles[siteZUID]
    delete siteRoles[roleZUID]
    dispatch({ type: 'DELETING_ROLE' })
    return request(`${CONFIG.API_ACCOUNTS}/roles/${roleZUID}`, {
      method: 'DELETE'
    })
      .then(data => {
        dispatch({ type: 'DELETING_ROLE_SUCCESS', roleZUID, siteRoles })
        return data
      })
      .catch(err => {
        console.table(err)
        dispatch({ type: 'DELETING_ROLE_FAILURE' })
        throw err
      })
  }
}

export const updateGranularRole = (resourceZUID, role, roleZUID) => {
  return dispatch => {
    dispatch({ type: 'UPDATING_ROLE' })
    return request(`${CONFIG.API_ACCOUNTS}/roles/${roleZUID}/granulars`, {
      method: 'PUT',
      json: true,
      body: [{ resourceZUID, ...role }]
    })
      .then(data => {
        dispatch({ type: 'UPDATING_ROLE_SUCCESS' })
        return data
      })
      .catch(err => {
        console.table(err)
        dispatch({ type: 'UPDATING_ROLE_FAILURE', err })
        throw err
      })
  }
}

export const createGranularRole = (resourceZUID, granularRole, roleZUID) => {
  return dispatch => {
    dispatch({ type: 'CREATING_ROLE' })
    return request(`${CONFIG.API_ACCOUNTS}/roles/${roleZUID}/granulars`, {
      method: 'POST',
      json: true,
      body: { resourceZUID, ...granularRole }
    })
      .then(data => {
        dispatch({ type: 'CREATING_ROLE_SUCCESS' })
        return data
      })
      .catch(err => {
        console.table(err)
        dispatch({ type: 'CREATING_ROLE_FAILURE', err })
        throw err
      })
  }
}
