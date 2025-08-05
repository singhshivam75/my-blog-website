const Comment = require('../models/comment');
const Blog = require('../models/blog');
const mongoose = require('mongoose');

exports.addComment = async (req, res, next) => {
  const { id: blogId } = req.params;
  const { text } = req.body;

  if (!text || typeof text !== 'string' || text.trim().length < 1) {
    return res.status(400).json({
      status: "error",
      message: 'Comment text is required'
    });
  }

  if (!mongoose.isValidObjectId(blogId)) {
    return res.status(400)
      .json({
        status: "error",
        message: 'Invalid blog ID'
      });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404)
        .json({
          status: "error",
          message: 'Blog not found'
        });
    }

    const comment = await Comment.create({
      blog: blogId,
      user: req.user.userId,
      text: text.trim(),
    });

    res.status(201).json({
      status: "success",
      message: 'Comment added',
      comment,
    });
  } catch (err) {
    next(err);
  }
};

exports.getComments = async (req, res, next) => {
  const { id: blogId } = req.params;

  if (!mongoose.isValidObjectId(blogId)) {
    return res.status(400)
      .json({
        status: "success",
        message: 'Invalid blog ID'
      });
  }

  try {
    const comments = await Comment.find({ blog: blogId }).populate('user', 'username email');
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

exports.getCommentCount = async (req, res, next) => {
  const { id: blogId } = req.params;
  try {
    const count = await Comment.countDocuments({ blog: blogId });
    res.status(200).json({ blogId, totalComments: count });
  } catch (err) {
    next(err);
  }
};
