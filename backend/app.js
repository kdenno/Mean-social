const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const postRoutes = require("./routes/posts");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// load env variables
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

mongoose.connect(process.env.MONGO_URL).then(result => { console.log('Connected to database'); }).catch(err => { console.log(err); });


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
app.use('/api', postRoutes);

module.exports = app;