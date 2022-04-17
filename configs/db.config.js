/* db connection */
const mongoose = require('mongoose')

const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Connected to ${connection.connections[0].name} Database..`)
  } catch (error) {
    console.log('Error connecting to Database: ', error)
  }
}

connect()
