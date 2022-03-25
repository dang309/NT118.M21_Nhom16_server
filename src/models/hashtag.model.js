const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const hashtagSchema = mongoose.Schema(
  {
    name: {
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
hashtagSchema.plugin(toJSON);

/**
 * @typedef Hashtag
 */
const Hashtag = mongoose.model('Hashtag', hashtagSchema);

module.exports = Hashtag;
