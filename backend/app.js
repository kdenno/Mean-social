const express = require('express');
const app = express();
const postRoutes = require("./routes/posts");
app.use('/api', postRoutes);

module.exports = app;