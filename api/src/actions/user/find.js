module.exports = function findUser(db) {
  return (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT FROM `/users` WHERE `id` = ?"
      db.query(query, [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}
