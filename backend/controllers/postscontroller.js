exports.getPosts = (req, res, next) => {
    const posts = [
        { id: '234werwer', title: 'First server post', content: 'First content from the server' },
        { id: '2342624', title: 'Second server post', content: 'Second content from the server' },
        { id: '335324234', title: 'Third server post', content: 'Third content from the server' }
    ];
    res.status(200).json({
        message: 'Successful',
        posts: posts
    });

}