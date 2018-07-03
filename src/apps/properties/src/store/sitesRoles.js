import { request } from '../../../../util/request'

export function sitesRoles(state = {}, action) {
  switch (action.type) {
    case 'FETCH_ROLES_SUCCESS':
      return { ...state, [action.siteZUID]: action.normalizedRoles }

    case 'ADDING_ROLE_SUCCESS':
      return {
        ...state,
        [action.siteZUID]: {
          ...state[action.siteZUID],
          [action.role.ZUID]: action.role
        }
      }

    case 'DELETING_ROLE_SUCCESS':
      return { ...state, [action.siteZUID]: action.siteRoles }

    case 'FETCHING_ROLE_SUCCESS':
      return {
        ...state,
        [action.siteZUID]: { ...state[action.siteZUID], ...action.role }
      }

    default:
      return state
  }
}

export const fetchSiteRoles = siteZUID => {
  return (dispatch, getState) => {
    dispatch({
      type: 'FETCHING_ROLES'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZUID}/roles`)
      .then(res => {
        const state = getState()

        dispatch({
          type: 'FETCH_ROLES_SUCCESS',
          siteZUID,
          normalizedRoles: res.data.reduce((acc, role) => {
            acc[role.ZUID] = role
            if (state.systemRoles[role.systemRoleZUID]) {
              acc[role.ZUID].systemRole = {
                ...role.systemRole,
                ...state.systemRoles[role.systemRoleZUID]
              }
            }

            return acc
          }, {})
        })

        return res.data
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
