/* environment variables import */
require('dotenv').config()

/* db connection */
const connect = require('./configs/db.config')
connect()

/* Models import */
/* const { User } = require('./models/User')
const { Event } = require('./models/Event')
const { Comment } = require('./models/Comment')
const { Agenda } = require('./models/Agenda')
const { Feedback } = require('./models/Feedback') */

/* routing and controllers - express */

const express = require('express')

const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())
