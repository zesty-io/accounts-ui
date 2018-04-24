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

export function newConfirm(data, result) {
  if (!data.prompt) {
    console.error('cannot confirm without a prompt')
  }
  return({
    type: 'NEW_CONFIRM',
    data
  })
}
