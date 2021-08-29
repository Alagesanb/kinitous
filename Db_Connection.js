var fs = require("fs");
const mongoose = require("mongoose")
const express = require("express")
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');
var path = require('path');

const app = express();app.use(cors());



// connect with db
mongoose.connect('mongodb://localhost:27017/kinitous', { useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to db"));

db.once('open', function () {
console.log("connected to DB");
})

module.exports = db;
app.use(bodyParser.urlencoded({limit: '50mb',extended : true}));
app.use(bodyParser.json({limit: '50mb'}));

app.listen(3205, () => console.log(`Server running on port 3205`));



require('./model/user');

const userRoute = require('./routes/user')


app.use('/api/user', userRoute)
// cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });



