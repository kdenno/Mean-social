const express = require('express');
const routes = express.Router();
const postsController = require('../controllers/postscontroller');

routes.get('/posts', postsController.getPosts);



module.exports = routes;