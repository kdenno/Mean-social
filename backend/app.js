const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const postRoutes = require("./routes/posts");
const mongoose = require("mongoose");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const MONGODB_URI =
    "mongodb+srv://node-complete:jZ7hhyZl5b5smXig@cluster0-k1a0c.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI).then(result => { console.log('Connectedt to database'); }).catch(err => { console.log(err); });


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