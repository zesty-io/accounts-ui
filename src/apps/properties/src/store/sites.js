import { request } from '../../../../util/request'
import { normalizeSites } from '../store'
import { notify } from '../../../../shell/store/notifications'

export function sites(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_SITES':
      // TODO show loading state?
      return state

    case 'FETCH_SITES_SUCCESS':
      return { ...state, ...normalizeSites(action.sites) }

    case 'FETCH_SITES_INVITES_SUCCESS':
      return { ...state, ...normalizeSites(action.sites) }

    case 'FETCH_SITE_SUCCESS':
      return { ...state, [action.site.ZUID]: action.site }

    case 'CREATE_SITE_SUCCESS':
      return { ...state, [action.site.ZUID]: action.site }

    default:
      return state
  }
}

export function fetchSites() {
  return dispatch => {
    dispatch({
      type: 'FETCHING_SITES'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances`)
      .then(sites => {
        sites.data.sort((prev, next) => {
          if (prev.name < next.name) {
            return -1
          }
          if (prev.name > next.name) {
            return 1
          }
          return 0
        })

        dispatch({
          type: 'FETCH_SITES_SUCCESS',
          sites: sites.data
        })
        return sites
      })
      .catch(err => {
        console.table(err)
        dispatch(
          notify({
            message: 'There was a problem fetching your instances',
            type: 'error'
          })
        )
        dispatch({
          type: 'FETCH_SITES_ERROR',
          err
        })
      })
  }
}

export function fetchSitesWithInvites() {
  return dispatch => {
    dispatch({
      type: 'FETCHING_SITES_INVITES'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances/invites`)
      .then(sites => {
        sites.data.sort((prev, next) => {
          if (prev.name < next.name) {
            return -1
          }
          if (prev.name > next.name) {
            return 1
          }
          return 0
        })

        dispatch({
          type: 'FETCH_SITES_INVITES_SUCCESS',
          sites: sites.data
        })
        return sites
      })
      .catch(err => {
        console.table(err)
        dispatch(
          notify({
            message: 'There was a problem fetching your instances',
            type: 'error'
          })
        )
        dispatch({
          type: 'FETCH_SITES_INVITES_ERROR',
          err
        })
      })
  }
}

export function fetchSite(siteZUID) {
  return dispatch => {
    dispatch({
      type: 'FETCHING_SITES'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZUID}`)
      .then(site => {
        dispatch({
          type: 'FETCH_SITE_SUCCESS',
          site: site.data
        })
      })
      .catch(err => {
        console.table(err)
        dispatch(
          notify({
            message: 'There was a problem fetching sites',
            type: 'error'
          })
        )
        dispatch({
          type: 'FETCH_SITE_ERROR',
          err
        })
      })
  }
}

export function updateSite(siteZUID, payload) {
  return dispatch => {
    dispatch({
      type: 'UPDATING_SITE'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZUID}`, {
      method: 'PUT',
      json: true,
      body: payload
    })
      .then(data => {
        dispatch({ type: 'UPDATE_SITE_SUCCESS' })
        return data
      })
      .catch(err => {
        dispatch({ type: 'UPDATE_SITE_FAILURE' })
        console.table(err)
        throw err
      })
  }
}

export function acceptInvite(inviteZUID) {
  return dispatch => {
    dispatch({ type: 'ACCEPT_INVITE' })
    return request(
      `${CONFIG.API_ACCOUNTS}/invites/${inviteZUID}?acceptInvite=true`,
      {
        method: 'PUT'
      }
    )
      .then(data => {
        dispatch({ type: 'ACCEPT_INVITE_SUCCESS' })
        return data
      })
      .catch(err => {
        dispatch({ type: 'ACCEPT_INVITE_FAILURE' })
        dispatch(
          notify({
            message: `There was an error accepting the invite`,
            type: 'error'
          })
        )
        console.table(err)
        throw err
      })
  }
}

export function declineInvite(inviteZUID) {
  return dispatch => {
    dispatch({ type: 'DELETE_INVITE' })
    return request(
      `${CONFIG.API_ACCOUNTS}/invites/${inviteZUID}?declineInvite=true`,
      {
        method: 'PUT'
      }
    )
      .then(data => {
        dispatch({ type: 'DELETE_INVITE_SUCCESS' })
        return data
      })
      .catch(err => {
        dispatch({ type: 'DELETE_INVITE_FAILURE' })
        throw err
      })
  }
}

export function cancelInvite(inviteZUID) {
  return dispatch => {
    dispatch({ type: 'DELETE_INVITE' })
    return request(
      `${CONFIG.API_ACCOUNTS}/invites/${inviteZUID}?cancelInvite=true`,
      {
        method: 'PUT'
      }
    )
      .then(data => {
        dispatch({ type: 'DELETE_INVITE_SUCCESS', data })
        return data
      })
      .catch(err => {
        dispatch({ type: 'DELETE_INVITE_FAILURE' })
        throw err
      })
  }
}

export function sendInvite(payload) {
  return dispatch => {
    dispatch({
      type: 'SENDING_INVITE'
    })
    let roleName = payload.role
    const newRoleID = role => {
      switch (role) {
        case 'Owner':
          return 0
        case 'Admin':
          return 1
        case 'Contributor':
          return 5
        case 'Publisher':
          return 4
        case 'Developer':
          return 2
        case 'SEO':
          return 3
        default:
          return 5
      }
    }
    return request(`${CONFIG.API_ACCOUNTS}/invites`, {
      method: 'POST',
      json: true,
      body: {
        inviteeEmail: payload.inviteeEmail,
        entityZUID: payload.entityZUID,
        accessLevel: newRoleID(roleName)
        // roleZUID: payload.roleZUID
      }
    })
      .then(data => {
        dispatch(
          notify({
            HTML: `<p>
    <i class="fa fa-check-square-o" aria-hidden="true" />&nbsp;Invite sent to <i>${
      data.data.inviteeEmail
    }</i>
  </p>`,
            type: 'success'
          })
        )
        dispatch({
          type: 'SEND_INVITE_SUCCESS',
          data
        })
        return data
      })
      .catch(err => {
        console.table(err)
        dispatch(
          notify({
            HTML: `<p>
      <i class="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;An error occurred sending the invite: ${err}
    </p>`,
            type: 'error'
          })
        )
        dispatch({
          type: 'SEND_INVITE_ERROR',
          err
        })
      })
  }
}

export const postNewSite = name => {
  return dispatch => {
    dispatch({
      type: 'CREATING_SITE'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances`, {
      method: 'POST',
      json: true,
      body: { name }
    })
      .then(data => {
        dispatch({
          type: 'CREATE_SITE_SUCCESS',
          site: data.data
        })
        return data
      })
      .catch(err => {
        dispatch({
          type: 'CREATE_SITE_ERROR',
          err
        })
        console.table(err)
        throw err
      })
  }
}

export const removeUser = (userZUID, roleZUID) => {
  return dispatch => {
    dispatch({ type: 'REMOVE_USER' })
    return request(
      `${CONFIG.API_ACCOUNTS}/users/${userZUID}/roles/${roleZUID}`,
      { method: 'DELETE' }
    )
      .then(data => {
        dispatch({ type: 'REMOVE_USER_SUCCESS', data })
        return data
      })
      .catch(err => {
        console.table(err)
        dispatch({ type: 'REMOVE_USER_ERROR' })
      })
  }
}
