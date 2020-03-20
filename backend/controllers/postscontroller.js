const Post = require("../Models/post");

exports.getPosts = async(req, res, next) => {
    const posts = await Post().find();
    const updatedPosts = posts.map(p => {
        return {...p._doc, _id: p._id.toString() }
    });

    res.status(200).json({
        message: 'Successful',
        posts: updatedPosts
    });

}
exports.createPosts = async(req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    const savedPost = await post.save();
    res.status().json({
        message: 'Post created',
        postId: savedPost._id
    });
}
exports.deletePost = async(req, res, next) => {
    const postId = req.params.Id;
    // find post 
    const post = await Post.find({ _id: postId });
    if (!post) {
        throw new Error('Post found');
    }
    await Post.deleteOne(postId);
    res.status(201).json({
        message: 'Post deleted successfully'
    });

}