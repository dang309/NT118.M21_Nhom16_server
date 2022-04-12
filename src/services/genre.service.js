const { Genre } = require('../models');

/**
 * Create a genre
 * @param {Object} genreBody
 * @returns {Promise<Genre>}
 */
const createGenre = async (genreBody) => {
  return Genre.create(genreBody);
};

/**
 * Query for genres
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllGenres = async () => {
  const genres = await Genre.find({});
  return genres;
};

/**
 * Get genre by id
 * @param {ObjectId} id
 * @returns {Promise<Genre>}
 */
const getGenreById = async (id) => {
  return Genre.findById(id);
};

/**
 * Update genre by id
 * @param {ObjectId} genreId
 * @param {Object} updateBody
 * @returns {Promise<Genre>}
 */
const updateGenreById = async (genreId, updateBody) => {
  const genre = await getGenreById(genreId);
  Object.assign(genre, updateBody);
  await genre.save();
  return genre;
};

/**
 * Delete genre by id
 * @param {ObjectId} genreId
 * @returns {Promise<Genre>}
 */
const deleteGenreById = async (genreId) => {
  const genre = await getGenreById(genreId);
  await genre.remove();
  return genre;
};

module.exports = {
  getAllGenres,
  createGenre,
  getGenreById,
  updateGenreById,
  deleteGenreById,
};
