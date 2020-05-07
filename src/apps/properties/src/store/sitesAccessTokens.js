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
    case 'FETCH_SITE_ACCESS_TOKENS_USAGE_SUCCESS':
      const tokens = state[action.siteZUID].accessTokens.map(accessToken => {
        if (accessToken.ZUID === action.tokenZUID) {
          accessToken.usage = action.accessTokenUsage
        }
        return accessToken
      })

      return {
        ...state,
        [action.siteZUID]: {
          ...state[action.siteZUID],
          accessTokens: tokens
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
        accessToken => accessToken.ZUID !== action.accessTokenZUID
      )
      return {
        ...state,
        [action.siteZUID]: {
          ...state[action.siteZUID],
          accessTokens
        }
      }
    case 'RENEW_SITE_ACCESS_TOKEN':
      const copy = state[action.siteZUID].accessTokens.map(el => el)
      const index = state[action.siteZUID].accessTokens
        .map(el => el.ZUID)
        .indexOf(action.accessToken.ZUID)
      if (index !== -1) {
        copy[index] = action.accessToken
      }
      return {
        ...state,
        [action.siteZUID]: {
          ...state[action.siteZUID],
          accessTokens: copy
        }
      }
    default:
      return state
  }
}

export function fetchAccessTokens(siteZUID) {
  return (dispatch, getState) => {
    const state = getState()
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZUID}/tokens`, {
      method: 'Get',
      json: true
    }).then(res => {
      const accessTokens = res.data.map(item => {
        dispatch(fetchUsage(siteZUID, item))

        return {
          ZUID: item.ZUID,
          name: item.name,
          token: item.token,
          createdAt: item.createdAt,
          roleZUID: item.roleZUID,
          expiry: item.expiry
        }
      })

      if (!res.error) {
        dispatch({
          type: 'FETCH_SITE_ACCESS_TOKENS_SUCCESS',
          accessTokens,
          siteZUID
        })
      }

      return accessTokens
    })
  }
}

export function createAccessToken(siteZUID, name, roleZUID) {
  return dispatch => {
    return request(`${CONFIG.API_ACCOUNTS}/tokens`, {
      method: 'POST',
      json: true,
      body: { roleZUID, name }
    })
      .then(res => {
        if (!res.error) {
          dispatch({
            type: 'UPDATE_SITE_ACCESS_TOKENS',
            accessToken: res.data,
            siteZUID
          })
        }
        return res.data
      })
      .catch(err => err)
  }
}

export function renewAccessToken(name, token, siteZUID) {
  return dispatch => {
    return request(`${CONFIG.API_ACCOUNTS}/tokens/${token}?action=renew`, {
      method: 'PUT',
      json: true,
      body: { name }
    })
      .then(res => {
        if (!res.error) {
          dispatch({
            type: 'RENEW_SITE_ACCESS_TOKEN',
            accessToken: res.data,
            siteZUID
          })
        }
        return res.data
      })
      .catch(err => err)
  }
}

export const removeAccessToken = (siteZUID, accessTokenZUID) => {
  return dispatch => {
    return request(`${CONFIG.API_ACCOUNTS}/tokens/${accessTokenZUID}`, {
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

export const fetchUsage = (siteZUID, item) => {
  return dispatch => {
    return request(
      `https://${siteZUID}${CONFIG.API_INSTANCE}/env/audits/?affectedZUID=${item.ZUID}`,
      {
        method: 'GET',
        json: true
      }
    )
      .then(res => {
        dispatch({
          type: 'FETCH_SITE_ACCESS_TOKENS_USAGE_SUCCESS',
          siteZUID,
          tokenZUID: item.ZUID,
          accessTokenUsage: res.data
        })
        return res.data
      })
      .catch(err => err)
  }
}
