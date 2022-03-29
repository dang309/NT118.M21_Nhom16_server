const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const commentSchema = mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    content: {
      type: String,
      trim: true,
    },
    user_comment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    users_like: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

// add plugin that converts mongoose to json
commentSchema.plugin(toJSON);
commentSchema.plugin(paginate);

/**
 * @typedef Comment
 */
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
