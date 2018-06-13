export function notifications(state = [], action) {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return [action.data, ...state]
    case 'REMOVE_NOTIFICATION':
      return state.filter(notification => {
        return notification.epoch !== action.epoch
      })
    default:
      return state
  }
}

export function notify(data) {
  if (!data.message && !data.HTML) {
    throw new Error('Cannot trigger notification without a message')
  }
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      ...data,
      epoch: Date.now()
    }
  }
}

export function remove(epoch) {
  if (!epoch) {
    throw new Error('Cannot remove notification without epoch timestamp')
  }
  return {
    type: 'REMOVE_NOTIFICATION',
    epoch
  }
}
