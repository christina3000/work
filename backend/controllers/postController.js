const Post = require('../models/post');

exports.getPosts = async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
};

exports.createPost = async (req, res) => {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
};

exports.getPost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
};

exports.updatePost = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
};

exports.deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted")
};
