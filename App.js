/* environment variables import */
require('dotenv').config()

/* database connection */
require('./configs/db.config')

/* importing models */
/*
const { Event } = require('./models/Event')
const { Comment } = require('./models/Comment')
const { Agenda } = require('./models/Agenda')
const { Feedback } = require('./models/Feedback') */

/* initialization of express application */

const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

/* authentication */

const authMiddleware = require('./middlewares/auth.middleware')
const authRoute = require('./routes/auth.routes')

app.use('/auth', authRoute)
app.use(authMiddleware)

/* private routes */

/* running server */
app.listen(process.env.PORT, () => {
  console.log('Server running on port:', process.env.PORT)
})
