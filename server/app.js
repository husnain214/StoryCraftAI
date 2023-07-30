const express = require('express')
const cors = require('cors')
const app = express()

const storyRouter = require('./controllers/storyRouter')
const middleware = require('./utils/middleware')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use( storyRouter)

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)

module.exports = app
