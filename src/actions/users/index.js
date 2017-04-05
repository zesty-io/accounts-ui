export function getUser(id) {
  return (dispatch) => {
    fetch(`${API}/user/${id}`)
      .then(res => res.json())
      .then(user => {
        console.log('user', user)
        dispatch({
          type: FETCH_USER_SUCCESS,
          id,
          user
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: FETCH_USER_ERROR,
          id,
          err
        })
      })
  }
}
