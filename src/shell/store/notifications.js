const initialState = [];

export function notifications(state = initialState, action) {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return [action.data, ...state];
    case "REMOVE_NOTIFICATION":
      return state.filter(notification => {
        if (notification.epoch == action.epoch) {
          return false;
        } else {
          return true;
        }
      });
    default:
      return state;
  }
}

export function notify(data) {
  if (!data.message && !data.HTML) {
    throw new Error("Cannot trigger notification without a message");
  }
  return {
    type: "NEW_NOTIFICATION",
    data: {
      ...data,
      epoch: Math.floor(Date.now() / 1000)
    }
  };
}

export function remove(epoch) {
  if (!epoch) {
    throw new Error("Cannot remove notification without epoch timestamp");
  }
  return {
    type: "REMOVE_NOTIFICATION",
    epoch
  }
}