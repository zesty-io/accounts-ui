import { request } from '../../../../util/request'

export function sitesAccessTokens(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_SITE_ACCESS_TOKENS':
      return state
    case 'FETCH_SITE_ACCESS_TOKENS_SUCCESS':
      return {
        ...state,
        [action.siteZUID]: {
          ...state[action.siteZUID],
          accessTokens: action.accessTokens
        }
      }
    case 'FETCH_SITE_ACCESS_TOKENS_ERROR':
      return state
    case 'UPDATE_SITE_ACCESS_TOKENS':
      return {
        ...state,
        [action.siteZUID]: {
          ...state[action.siteZUID],
          accessTokens: [
            ...state[action.siteZUID].accessTokens,
            action.accessToken
          ]
        }
      }
    case 'REMOVE_SITE_ACCESS_TOKEN_SUCCESS':
      const accessTokens = state[action.siteZUID].accessTokens.filter(
        accessToken => accessToken.ZUID !== action.accessToken.ZUID
      )
      return {
        ...state,
        [action.siteZUID]: {
          ...state[action.siteZUID],
          accessTokens
        }
      }
    case 'RENEW_SITE_ACCESS_TOKEN':
      console.log('Renew token', action)
      return state
    default:
      return state
  }
}

export function fetchAccessTokens(siteZUID) {
  console.log('siteZUID', siteZUID)
  return (dispatch, getState) => {
    const state = getState()
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZUID}/tokens`, {
      method: 'Get',
      json: true
    }).then(res => {
      const accessTokens = res.data.map(item => ({
        ZUID: item.ZUID,
        name: item.name,
        token: item.token,
        createdAt: item.createdAt,
        roleZUID: item.roleZUID,
        expiry: item.expiry
      }))

      if (!res.error) {
        dispatch({
          type: 'FETCH_SITE_ACCESS_TOKENS_SUCCESS',
          accessTokens,
          siteZUID
        })
      }
      return res.data
    })
  }
}

export function createAccessToken(siteZUID, name, roleZUID) {
  return dispatch => {
    return request(`${CONFIG.API_ACCOUNTS}/tokens`, {
      method: 'POST',
      json: true,
      body: { roleZUID, name }
    }).then(res => {
      if (!res.error) {
        dispatch({
          type: 'UPDATE_SITE_ACCESS_TOKENS',
          accessToken: res.data,
          siteZUID
        })
      }
      return res.data
    })
  }
}

export function renewAccessToken(name, siteZUID) {
  return dispatch => {
    return request(`${CONFIG.API_ACCOUNTS}/tokens?action=renew`, {
      method: 'PUT',
      json: true,
      body: { name }
    })
      .then(res => {
        console.log('RES', res)
        if (!res.error) {
          dispatch({
            type: 'RENEW_SITE_ACCESS_TOKEN',
            accessToken: res.data,
            siteZUID
          })
        }
        return res.data
      })
      .catch(err => {
        console.error('ERROR:', err)
        return err
      })
  }
}

export const removeDomain = (siteZUID, accessTokenZUID) => {
  return dispatch => {
    return request(`${CONFIG.API_ACCOUNTS}/domains/${accessTokenZUID}`, {
      method: 'DELETE'
    }).then(res => {
      dispatch({
        type: 'REMOVE_SITE_ACCESS_TOKEN_SUCCESS',
        accessTokenZUID,
        siteZUID
      })
      return res.data
    })
  }
}

export const getUsageToken = ZUID => {
  return request(`${CONFIG.API_ACCOUNTS}/audits/${ZUID}`, {
    method: 'GET',
    json: true
  })
    .then(res => console.log('res', res))
    .catch(err => console.log('err', err))
}
