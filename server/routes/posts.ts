
const express = require('express');
const router = express.Router();
const Post = require('../models/Post.ts');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({message: err})
  }
});

// Get specific post
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.sjon({message: err});
  };
})

// Create a post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });
  try{
  const savedPost = await post.save();
  res.json(savedPost)
  } catch (err) {
    res.json({message: err})
  };
})

//Update post
router.patch('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      {_id: req.params.postId},
      {$set: {title: req.body.title}}
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({message: err})
  };
})

//Delete post
router.delete('/:postId', async (req, res) => {
  try {
    const post = await Post.deleteOne({_id: req.params.postId})
    res.json(post);
  } catch (err) {
    res.json({message: err})
  };
})

module.exports = router;
