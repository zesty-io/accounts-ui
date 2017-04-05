'use strict'

const mysql = require('mysql2')

module.exports = (options) => {
  let opts = Object.assign({}, {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }, options)

  return mysql.createPool(opts)
}
