import { request } from '../../../../util/request'
import config from '../../../../shell/config'

export function invite(state = {inviteRole:'editor'}, action) {
  switch (action.type) {
    case 'INVITE_DATA':
      return {...state, ...action.payload}
    case 'SEND_INVITE':
      console.log(state.inviteEmail, state.inviteRole)
      return state
    default:
      return state
  }
}

export function inviteData(payload) {
  return {
    type: 'INVITE_DATA',
    meta: {
      debounce: {
        time: 300
      }
    },
    payload
  }
}

export function sendInvite() {
  return {type: 'SEND_INVITE'}
}