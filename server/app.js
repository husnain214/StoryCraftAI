const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const storyRouter = require('./controllers/storyRouter')
const middleware = require('./utils/middleware')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(storyRouter)

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)

module.exports = app
