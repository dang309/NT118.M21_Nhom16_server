const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const conversationSchema = mongoose.Schema(
  {
    first_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    second_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
conversationSchema.plugin(toJSON);

/**
 * @typedef Conversation
 */
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
