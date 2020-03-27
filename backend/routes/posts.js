const express = require('express');
const routes = express.Router();
const postsController = require('../controllers/postscontroller');

routes.get('/posts', postsController.getPosts);
routes.get('/post:postId', postsController.getPost);
routes.put('/post:postId', postsController.updatePost);
routes.post('/post', postsController.createPosts);
routes.delete('/post/:Id', postsController.deletePost);



module.exports = routes;