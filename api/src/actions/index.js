'use strict'

const getUser = require('./user/find')

module.exports = (db) => {
  return {
    user: {
      find: findUser(db)
    }
  }
}
