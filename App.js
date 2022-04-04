/* environment variables import */
require('dotenv').config()

/* db connection */
const connect = require("./configs/db.config")
connect()

/* USER model import */
const { User } = require("./models/User")
/* Event model import  */
const { Event } = require("./models/Event")

/* routing and controllers - express*/

const express = require('express')

const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())