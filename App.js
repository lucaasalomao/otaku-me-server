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

/* authentication */

/* const authMiddleware = require('./middlewares/auth.middleware') */
const authRoute = require('./routes/auth.routes')

app.use(authRoute)
/* app.use(authMiddleware) */

/* private routes */

module.exports = app
