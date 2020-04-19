const express = require('express');
const routes = express.Router();
const postsController = require('../controllers/postscontroller');
const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        db(error, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        // construct unique filename 
        cb(null, name + '-' + Date.now() + '.' + ext)

    }
});

routes.get('/posts', postsController.getPosts);
routes.get('/post/:postId', postsController.getPost);
routes.put('/post/:postId', postsController.updatePost);
routes.post('/posts', multer(storage).single("image"), postsController.createPosts);
routes.delete('/post/:Id', postsController.deletePost);



module.exports = routes;