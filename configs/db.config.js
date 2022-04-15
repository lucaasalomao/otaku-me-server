/* environment variables import */
require('dotenv').config()

/* db connection */
const mongoose = require('mongoose')

const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Connected to ${connection.connections[0].name} on port ${process.env.PORT}..`)
  } catch (error) {
    console.log('Error connecting to Database: ', error)
  }
}

module.exports = connect
