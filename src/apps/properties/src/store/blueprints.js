import { request } from '../../../../util/request'

export function blueprints(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_BLUEPRINTS_SUCCESS':
      return action.blueprints

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
    return request(`${CONFIG.API_ACCOUNTS}/blueprints`)
      .then(res => {
        dispatch({
          type: 'FETCHING_BLUEPRINTS_SUCCESS',
          blueprints: res.data.reduce((acc, print) => {
            acc[print.ID] = print
            return acc
          }, {})
        })
        return res.data
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'FETCHING_BLUEPRINTS_ERROR',
          err
        })
      })
  }
}

export function fetchBlueprint(id) {
  return dispatch => {
    dispatch({
      type: 'FETCHING_BLUEPRINTS'
    })
    return request(`${CONFIG.API_ACCOUNTS}/blueprints/${id}`)
      .then(res => {
        dispatch({
          type: 'FETCHING_BLUEPRINTS_SUCCESS',
          blueprints: {
            [res.data.ID]: res.data
          }
        })
        return res.data
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'FETCHING_BLUEPRINTS_ERROR',
          err
        })
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
    })
      .then(res => {
        dispatch({
          type: 'CREATE_BLUEPRINT_SUCCESS',
          blueprint: res.data
        })
        return res.data
      })
      .catch(err => {
        console.table(err)
        dispatch({
          type: 'CREATE_BLUEPRINT_ERROR',
          err
        })
        throw err
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
    })
      .then(res => {
        dispatch({
          type: 'UPDATE_BLUEPRINT_SUCCESS',
          blueprint: res.data
        })
        return res.data
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'UPDATE_BLUEPRINT_ERROR',
          err
        })
        throw err
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
    })
      .then(blueprint => {
        return blueprint
      })
      .catch(err => {
        console.table(err)
        dispatch({
          type: 'FETCHING_BLUEPRINTS_ERROR',
          err
        })
      })
  }
}
