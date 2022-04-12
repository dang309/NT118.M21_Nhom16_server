const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const genreSchema = mongoose.Schema(
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
genreSchema.plugin(toJSON);

/**
 * @typedef Genre
 */
const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
