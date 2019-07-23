const initialState = { isOpen: false }

export const REMOVE_CONFIRM = 'REMOVE_CONFIRM',
  NEW_CONFIRM = 'NEW_CONFIRM'

export function confirm(state = initialState, action) {
  switch (action.type) {
    case NEW_CONFIRM:
      return { isOpen: true, ...action.data }
    case REMOVE_CONFIRM:
      return { isOpen: false }
    default:
      return state
  }
}

export function zConfirm(data) {
  if (!data.prompt) {
    return console.error('cannot confirm without a prompt')
  }
  if (!data.callback) {
    return console.error('cannot confirm without a callback')
  }
  return {
    type: NEW_CONFIRM,
    data
  }
}
