// import database from './database/connection'

import { logErrors, errorHandler } from './error'
import api from './routes'
import { createSocket } from './socket'
import CONFIG from './config'

import server from 'http'
import express from 'express'
import path from 'path'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const app = express()
const http = server.Server(app)
const PORT = CONFIG.port

// //Make sure database is up and running
// database.on('error', console.error.bind(console, 'connection error:'))
// database.once('open', () => {
//   console.log('We are live in action!')
// })

// Initialize socket
createSocket(http)

// setup the logger
app.use(morgan('tiny'))

// Priority serve static files.
app.use(express.static(path.join(__dirname, '../front-end/build')))

// Middlewares
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

// Handling errors
app.use(logErrors)
app.use(errorHandler)

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// Use sub routes for routing
app.use('/api', api)

// For everything else return React so react can do extra routing
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../front-end/build', 'index.html'))
})

http.listen(PORT, () => {
  console.log("-----------starting-----------")
  console.log(`Listening on port ${PORT}`)
});
