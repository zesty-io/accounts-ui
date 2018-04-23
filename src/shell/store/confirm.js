const initialState = { isOpen: false };

export function confirm(state = initialState, action) {
  switch (action.type) {
    case "NEW_CONFIRM":
      return { ...state, isOpen: true, ...action };
    case "REMOVE_CONFIRM":
      return { isOpen: false };
    default:
      return state;
  }
}

export function openConfirm(data) {
  if(!data.prompt){
    console.error('cannot confirm without a prompt')
  }
  return {
    type: "NEW_CONFIRM",
    data
  };
}

export function closeConfirm() {
  return {
    type: "REMOVE_CONFIRM"
  };
}
