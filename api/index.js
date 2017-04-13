'use strict'

const dotenv = require('dotenv')
const path = require('path')
const db = require('./src/db')
const server = require('./src/server')
const actions = require('./src/server')

dotenv.load({
  path: process.env.dotenv_path || path.join(__dirname, '.env')
})

server(actions(db())).listen(process.env.PORT, () => {
  console.log(`server started on port: ${process.env.PORT}`)
})
