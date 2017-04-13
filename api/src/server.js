'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const user = require('./routes/user')

module.exports = (actions) => {
  const app = express()

  app.use(bodyParser.json())
  app.use((req, res) => {
    res.locals.actions = actions
  })

  // Routes
  app.get('/user/:id', user.find)
  // app.patch('/user/:id', user.update)
  // app.post('/user/:id', user.create)

  app.get('/', (req, res) => res.sendStatus(200))
  app.all('*', (req, res) => res.sendStatus(404))

  app.listen(process.env.PORT, () => {
    console.log(`server started on port: ${process.env.PORT}`)
  })

  return app
}
