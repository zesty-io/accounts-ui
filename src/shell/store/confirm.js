const initialState = { isOpen: false }

export function confirm(state = initialState, action) {
  switch (action.type) {
    case 'NEW_CONFIRM':
      return { isOpen: true, ...action.data }
    case 'REMOVE_CONFIRM':
      return { isOpen: false }
    default:
      return state
  }
}

export function zConfirm(data, result) {
  if (!data.prompt) {
    console.error('cannot confirm without a prompt')
  }
  if (!data.callback) {
    console.error('cannot confirm without a callback')
  }
  return({
    type: 'NEW_CONFIRM',
    data
  })
}
