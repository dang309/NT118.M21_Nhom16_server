const { Hashtag } = require('../models');

/**
 * Create a hashtag
 * @param {Object} hashtagBody
 * @returns {Promise<Hashtag>}
 */
const createHashtag = async (hashtagBody) => {
  return Hashtag.create(hashtagBody);
};

/**
 * Query for hashtags
 * @returns {Promise<QueryResult>}
 */
const getAllHashtags = async () => {
  const hashtags = await Hashtag.find({});
  return hashtags;
};

/**
 * Get hashtag by id
 * @param {ObjectId} id
 * @returns {Promise<Hashtag>}
 */
const getHashtagById = async (id) => {
  return Hashtag.findById(id);
};

/**
 * Update hashtag by id
 * @param {ObjectId} hashtagId
 * @param {Object} updateBody
 * @returns {Promise<Hashtag>}
 */
const updateHashtagById = async (hashtagId, updateBody) => {
  const hashtag = await getHashtagById(hashtagId);
  Object.assign(hashtag, updateBody);
  await hashtag.save();
  return hashtag;
};

/**
 * Delete hashtag by id
 * @param {ObjectId} hashtagId
 * @returns {Promise<Hashtag>}
 */
const deleteHashtagById = async (hashtagId) => {
  const hashtag = await getHashtagById(hashtagId);
  await hashtag.remove();
  return hashtag;
};

module.exports = {
  getAllHashtags,
  createHashtag,
  getHashtagById,
  updateHashtagById,
  deleteHashtagById,
};
