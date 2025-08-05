const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

likeSchema.index({ blog: 1, user: 1 }, { unique: true }); // Prevent duplicate likes

module.exports = mongoose.model('Like', likeSchema);
