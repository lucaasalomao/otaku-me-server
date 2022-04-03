/* environment variables import */
require('dotenv').config()

/* db connection */
const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to Otaku Me Database on port ${process.env.PORT}..`)
    } catch (error) {
        console.log("Error connecting with Otaku Me Database: ", error)
    } 
}

module.exports = connect