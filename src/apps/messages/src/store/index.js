export function messages(state = {}, action) {
  switch (action.type) {
    case "FETCHING_MESSAGES":
      // TODO show loading state
      return state;
      break;
    case "FETCH_MESSAGES_SUCCESS":
      return action.messages
      break;
    case "FETCH_MESSAGES_ERROR":
      //TODO handle failure
      return state
      break;
    default:
      return state;
  }
}

export function fetchMessages() {
  return (dispatch) => {
    dispatch({
      type: "FETCHING_MESSAGES"
    })

    dispatch({
      type: "FETCH_MESSAGES_SUCCESS",
      messages: {
        "001": {
          type: "invite",
          from: "Stuart",
          date: Date.now(),
          message: "You have been invited to join \"Sony Alpha 2.0\""
        }
      }
    })

    // TODO load data from api
    // request("")
    // .then(messages => {
    //   dispatch({
    //     type: "FETCH_MESSAGES_SUCCESS",
    //     messages
    //   })
    // })
    // .catch(err => {
    //   dispatch({
    //     type: "FETCH_MESSAGES_ERROR",
    //     err
    //   })
    // })
  }
}

export function messageAction() {
  // TODO Do message action. e.g. Accept invite
  return (dispatch) => {
    // dispatch({
    //   type: "FETCHING_MESSAGES"
    // })

    request("")
    .then(messages => {
      // dispatch({
      //   type: "FETCH_MESSAGES_ERROR",
      //   messages
      // })
    })
    .catch(err => {
      // dispatch({
      //   type: "FETCH_MESSAGES_ERROR",
      //   err
      // })
    })
  }
}
