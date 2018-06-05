import { request } from '../../../../util/request'

export function blueprints(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_BLUEPRINTS':
      return state
    case 'FETCHING_BLUEPRINTS_ERROR':
      // TODO show error message
      return {
        ...state,
        null: {
          name: 'Looks like you havent selected a blueprint',
          coverImage: '',
          description: 'Click the button to select a blueprint.',
          createdByUserZUID: null
        }
      }

    case 'FETCHING_BLUEPRINTS_SUCCESS':
      return { ...state, ...action.blueprints }

    case 'CREATING_BLUEPRINT':
      return state

    case 'CREATE_BLUEPRINT_SUCCESS':
      let blueprints = {
        ...state,
        [action.blueprint.ID]: action.blueprint
      }
      return blueprints

    case 'CREATE_BLUEPRINT_ERROR':
      return state

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
      .then(json => {
        dispatch({
          type: 'FETCHING_BLUEPRINTS_SUCCESS',
          blueprints: json.data.reduce((acc, print) => {
            acc[print.ID] = print
            return acc
          }, {})
        })
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

export function fetchBlueprint(id) {
  return dispatch => {
    dispatch({
      type: 'FETCHING_BLUEPRINTS'
    })
    return request(`${CONFIG.API_ACCOUNTS}/blueprints/${id}`)
      .then(blueprint => {
        dispatch({
          type: 'FETCHING_BLUEPRINTS_SUCCESS',
          blueprints: {
            [blueprint.data.ID]: blueprint.data
          }
        })
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

export function postNewBlueprint(body) {
  return dispatch => {
    dispatch({
      type: 'CREATING_BLUEPRINT'
    })
    return request(`${CONFIG.API_ACCOUNTS}/blueprints`, {
      method: 'POST',
      json: true,
      body
    })
      .then(data => {
        dispatch({
          type: 'CREATE_BLUEPRINT_SUCCESS',
          blueprint: data.data
        })
        return data.data
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
      .then(data => {
        dispatch({
          type: 'UPDATE_BLUEPRINT_SUCCESS',
          blueprint: data.data
        })
        return data.data
      })
      .catch(err => {
        console.table(err)
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
        console.log('response from delete', blueprint)
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
