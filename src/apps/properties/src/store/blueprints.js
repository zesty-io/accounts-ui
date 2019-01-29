import { request } from '../../../../util/request'

export function blueprints(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_BLUEPRINTS_SUCCESS':
      return { ...state, ...action.blueprints }

    case 'DELETE_BLUEPRINT_SUCCESS':
      // remove deleted blueprint from state and return that state
      let blueprints = Object.keys(state).reduce((acc, blueprint) => {
        if (state[blueprint].ID !== action.id) {
          acc[blueprint] = state[blueprint]
        }
        return acc
      }, {})
      return blueprints
    case 'CREATE_BLUEPRINT_SUCCESS':
      return {
        ...state,
        [action.blueprint.ID]: action.blueprint
      }

    default:
      return state
  }
}

export function fetchBlueprints() {
  return dispatch => {
    dispatch({
      type: 'FETCHING_BLUEPRINTS'
    })
    return request(`${CONFIG.API_ACCOUNTS}/blueprints`).then(res => {
      dispatch({
        type: 'FETCHING_BLUEPRINTS_SUCCESS',
        blueprints: res.data.reduce((acc, print) => {
          acc[print.ID] = print
          return acc
        }, {})
      })
      return res.data
    })
  }
}

export function fetchBlueprint(id) {
  return dispatch => {
    dispatch({
      type: 'FETCHING_BLUEPRINTS'
    })
    return request(`${CONFIG.API_ACCOUNTS}/blueprints/${id}`).then(res => {
      dispatch({
        type: 'FETCHING_BLUEPRINTS_SUCCESS',
        blueprints: {
          [res.data.ID]: res.data
        }
      })
      return res.data
    })
  }
}

export function createBlueprint(body) {
  return dispatch => {
    dispatch({
      type: 'CREATING_BLUEPRINT'
    })
    return request(`${CONFIG.API_ACCOUNTS}/blueprints`, {
      method: 'POST',
      json: true,
      body
    }).then(res => {
      dispatch({
        type: 'CREATE_BLUEPRINT_SUCCESS',
        blueprint: res.data
      })
      return res.data
    })
  }
}

export function updateBlueprint(ID, body) {
  return dispatch => {
    dispatch({
      type: 'UPDATING_BLUEPRINT',
      ID,
      body
    })
    return request(`${CONFIG.API_ACCOUNTS}/blueprints/${ID}`, {
      method: 'PUT',
      json: true,
      body
    }).then(res => {
      dispatch({
        type: 'UPDATE_BLUEPRINT_SUCCESS',
        blueprint: res.data
      })
      return res.data
    })
  }
}
export function deleteBlueprint(id) {
  return dispatch => {
    dispatch({
      type: 'DELETE_BLUEPRINT'
    })
    return request(`${CONFIG.API_ACCOUNTS}/blueprints/${id}`, {
      method: 'DELETE'
    }).then(blueprint => {
      dispatch({
        type: 'DELETE_BLUEPRINT_SUCCESS',
        id
      })
      return blueprint
    })
  }
}
