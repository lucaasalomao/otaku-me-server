/* environment variables import */
require('dotenv').config()

/* database connection */
require('./configs/db.config')

/* initialization of express application */

const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

/* importing middleware */
const authMiddleware = require('./middlewares/auth.middleware')

/* importing routes */
const authRoute = require('./routes/auth.routes')
const agendaRoute = require('./routes/agenda.routes')
const animeRoute = require('./routes/anime.routes')
const commentRoute = require('./routes/comment.routes')

/* public routes */
app.use(authRoute)

/* authentication middleware */
app.use(authMiddleware)

/* private routes */
app.use(commentRoute)
app.use(agendaRoute)
app.use(animeRoute)

module.exports = app
