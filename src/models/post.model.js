const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const postSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    caption: {
      type: String,
      trim: true,
      default: '',
    },
    sound: {
      type: String,
    },
    thumbnail: {
      type: String,
      default: '',
    },
    users_like: {
      type: Array,
      default: [],
    },
    users_listening: {
      type: Array,
      default: [],
    },
    hashtag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hashtag',
      default: '',
    },
    genre: {
      type: String,
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
postSchema.plugin(toJSON);
postSchema.plugin(paginate);

/**
 * @typedef Post
 */
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
