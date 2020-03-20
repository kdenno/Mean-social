const express = require('express');
const routes = express.Router();
const postsController = require('../controllers/postscontroller');

routes.get('/posts', postsController.getPosts);
routes.post('/post', postsController.createPosts);
routes.delete('/post/:Id', postsController.deletePost);



module.exports = routes;