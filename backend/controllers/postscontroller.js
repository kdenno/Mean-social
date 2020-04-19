const Post = require("../Models/post");

exports.getPosts = async(req, res, next) => {
    try {
        const posts = await Post.find();
        const updatedPosts = posts.map(p => {
            return {...p._doc, _id: p._id.toString() }
        });
        res.status(200).json({
            message: 'Successful',
            posts: updatedPosts
        });
    } catch (err) {
        console.log(err);

    };



}
exports.getPost = async(req, res, next) => {
    const postId = req.params.postId;
    try {
        const thepost = await Post.findById(postId);
        res.status(200).json({ message: 'success', data: {...thepost._doc, _id: thepost._id.toString() } });

    } catch (error) {
        console.log(error);

    }

}
exports.createPosts = async(req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename
    });
    try {
        const savedPost = await post.save();
        res.status(201).json({
            message: 'Post created',
            post: {...savedPost, id: savedPost._id.toString() }
        });

    } catch (error) {
        console.log(error);

    }

}
exports.updatePost = async(req, res, next) => {
    let imagePath;
    if (req.file) {
        // user has set new file
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + '/images/' + req.file.filename
    } else {
        imagePath = req.body.imagePath
    }

    const newPost = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath
    });
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.postId }, newPost);
        res.status(201).json({ message: 'update successful', data: updatedPost });

    } catch (error) {
        console.log(error);

    }


}
exports.deletePost = async(req, res, next) => {
    const postId = req.params.Id;
    // find post 
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error('Post not found');
    }
    await Post.deleteOne({ _id: postId });
    res.status(201).json({
        message: 'Post deleted successfully'
    });

}