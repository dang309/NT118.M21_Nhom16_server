const { Comment } = require('../models');

/**
 * Create a comment
 * @param {Object} commentBody
 * @returns {Promise<Comment>}
 */
const createComment = async (commentBody) => {
  return Comment.create(commentBody);
};

/**
 * Query for comments
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryComments = async (filter, options) => {
  const comments = await Comment.paginate(filter, options);
  return comments;
};

/**
 * Get comment by id
 * @param {ObjectId} id
 * @returns {Promise<Comment>}
 */
const getCommentById = async (id) => {
  return Comment.findById(id);
};

const getCommentByPostId = async (postId) => {
  return Comment.find({ post_id: postId });
};

/**
 * Update comment by id
 * @param {ObjectId} commentId
 * @param {Object} updateBody
 * @returns {Promise<Comment>}
 */
const updateCommentById = async (commentId, updateBody) => {
  const comment = await getCommentById(commentId);
  Object.assign(comment, updateBody);
  await comment.save();
  return comment;
};

/**
 * Delete comment by id
 * @param {ObjectId} commentId
 * @returns {Promise<Comment>}
 */
const deleteCommentById = async (commentId) => {
  const comment = await getCommentById(commentId);
  await comment.remove();
  return comment;
};

module.exports = {
  createComment,
  queryComments,
  getCommentById,
  getCommentByPostId,
  updateCommentById,
  deleteCommentById,
};
