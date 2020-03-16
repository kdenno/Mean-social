const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const postRoutes = require("./routes/posts");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Controll-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    next();

});
app.use('/api', postRoutes);

module.exports = app;