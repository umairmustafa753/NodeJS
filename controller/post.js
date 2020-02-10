const Post = require('../model/post');

exports.getPost = (req, res) => {
    const posts = Post.find().select( "title body" )
    .then(posts => { res.status(200).json({ posts: posts }) })
    .catch(err => console.log("error message: ", err));
}

exports.createPost = (req, res) => {
    const post = new Post(req.body);
    post.save().then(result => {
        res.status(200).json({
            post: result
        });
    });
}