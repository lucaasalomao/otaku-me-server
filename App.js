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
const commentRoute = require('./routes/comment.routes')
const listRoute = require('./routes/list.routes')
const itemRoute = require('./routes/item.routes')
const userRoute = require('./routes/user.routes')
const authRoute = require('./routes/auth.routes')

/* public routes */
app.use('/', authRoute)

/* authentication middleware */
app.use(authMiddleware)

/* private routes */
app.use('/comment', commentRoute)
app.use('/list', listRoute)
app.use('/item', itemRoute)
app.use('/user', userRoute)

module.exports = app
