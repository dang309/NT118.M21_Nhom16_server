const { Conversation } = require('../models');

/**
 * Create a conversation
 * @param {Object} conversationBody
 * @returns {Promise<Conversation>}
 */
const createConversation = async (conversationBody) => {
  return Conversation.create(conversationBody);
};

/**
 * Query for conversations
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryConversations = async (filters, options) => {
  const conversations = await Conversation.paginate(filters, options);
  return conversations;
};

/**
 * Get conversation by id
 * @param {ObjectId} id
 * @returns {Promise<Conversation>}
 */
const getConversationById = async (id) => {
  return Conversation.findById(id);
};

const getConversationByPostId = async (postId) => {
  return Conversation.find({ post_id: postId });
};

/**
 * Update conversation by id
 * @param {ObjectId} conversationId
 * @param {Object} updateBody
 * @returns {Promise<Conversation>}
 */
const updateConversationById = async (conversationId, updateBody) => {
  const conversation = await getConversationById(conversationId);
  Object.assign(conversation, updateBody);
  await conversation.save();
  return conversation;
};

/**
 * Delete conversation by id
 * @param {ObjectId} conversationId
 * @returns {Promise<Conversation>}
 */
const deleteConversationById = async (conversationId) => {
  const conversation = await getConversationById(conversationId);
  await conversation.remove();
  return conversation;
};

module.exports = {
  createConversation,
  queryConversations,
  getConversationById,
  getConversationByPostId,
  updateConversationById,
  deleteConversationById,
};
