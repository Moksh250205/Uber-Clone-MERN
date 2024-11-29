const express = require('express'); 
const app = express(); 

const dotenv = require("dotenv"); 
const cors = require('cors');
const cookieParser = require('cookie-parser');   
const dbConnect = require('./src/config/dbconfig');
dotenv.config(); 
dbConnect(); 

app.use(cookieParser()); 
app.use(cors());
app.use(express.json());

app.use("/api/user", require("./src/routes/user.route")); 
app.use("/api/captain", require("./src/routes/captain.route"));

app.get('/', (req, res) =>{
    res.send('Hello World')
}); 

module.exports = app; 