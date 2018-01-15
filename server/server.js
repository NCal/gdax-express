// PACKAGES //
const path = require('path')
const fs = require('fs')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const bluebird = require('bluebird')
const indexRoutes = require('./routes/index')

// CREATE APP //
const app = express()

// VIEW ENGINE //
app.set('view engine', 'html')
app.engine('html', function (path, options, callbacks) {
  fs.readFile(path, 'utf-8', callback)
})
app.set('json spaces', 0)

// MIDDLEWARE //
app.use(express.static(path.join(__dirname, '../client')))
app.use(logger('dev'))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.json())

// ROUTES //
app.use('/', indexRoutes)

// ERROR HANDLER //
app.use(function (err, req, res, next) {
  console.log(err.stack)
  res.status(err.status || 500).send('general server error')
})

const port = 3000
const server = app.listen(port, function () {
  console.log('running at localhost:' + port)
})
