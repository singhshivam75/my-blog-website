const mongoose = require('mongoose');
const Like = require('../models/like');
const Blog = require('../models/blog');

exports.toggleLike = async (req, res, next) => {
  const { id: blogId } = req.params;
  const userId = req.user.userId;

  if (!mongoose.isValidObjectId(blogId)) {
    return res.status(400).json({
      status: "error",
      message: 'Invalid blog ID'
    });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({
      status: "error",
      message: 'Blog not found'
    });

    const existingLike = await Like.findOne({ blog: blogId, user: userId });

    if (existingLike) {
      await existingLike.deleteOne();
      return res.status(200).json({
        status: "success",
        message: 'Blog unliked'
      });
    }

    await Like.create({ blog: blogId, user: userId });
    res.status(201).json({
      status: "success",
      message: 'Blog liked'
    });
  } catch (err) {
    next(err);
  }
};

exports.getLikesCount = async (req, res, next) => {
  const { id: blogId } = req.params;

  if (!mongoose.isValidObjectId(blogId)) {
    return res.status(400).json({
      status: "error",
      message: 'Invalid blog ID'
    });
  }

  try {
    const count = await Like.countDocuments({ blog: blogId });
    res.status(200).json({ blogId, totalLikes: count });
  } catch (err) {
    next(err);
  }
};

exports.getLikedUsers = async (req, res, next) => {
  const { id: blogId } = req.params;

  if (!mongoose.isValidObjectId(blogId)) {
    return res.status(400).json({
      status: "error",
      message: 'Invalid blog ID'
    });
  }

  try {
    const likes = await Like.find({ blog: blogId })
      .populate('user', 'username email');
    res.status(200).json(likes.map(like => like.user));
  } catch (err) {
    next(err);
  }
};