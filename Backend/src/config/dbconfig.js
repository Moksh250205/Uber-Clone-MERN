const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

async function dbConnect() {
    try {
        
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Connected to Database");
    } catch (error) {
        console.error("Error connecting to Database", error);
    }
}

module.exports = dbConnect;
