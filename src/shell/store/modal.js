const initialState = { isOpen: false }

export function modal(state = initialState, action) {
  switch (action.type) {
    case 'NEW_MODAL':
      return { ...state, isOpen: true, ...action }
    case 'REMOVE_MODAL':
      return { isOpen: false }
    default:
      return state
  }
}

export function openModal(data) {
  // if (!data.component) {
  //   throw new Error("Cannot trigger modal without a component");
  // }
  return {
    type: 'NEW_MODAL',
    data
  }
}

export function closeModal() {
  return {
    type: 'REMOVE_MODAL'
  }
}
