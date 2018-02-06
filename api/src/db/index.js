'use strict'

const mysql = require('mysql2')

module.exports = (options) => {
  let opts = Object.assign({}, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }, options)

  try {
    return mysql.createPool(opts)
  } catch (err) {
    console.log('Failed Connecting to MySQL', err)
  }
}
