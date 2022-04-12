const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { genreService } = require('../services');
const { RES } = require('../utils/RES');

const getAllGenres = catchAsync(async (req, res) => {
  const genres = await genreService.getAllGenres();
  res.status(httpStatus.OK).send(RES(httpStatus.OK, '', true, genres));
});

const createGenre = catchAsync(async (req, res) => {
  const genre = await genreService.createGenre(req.body);
  res.status(httpStatus.CREATED).send(RES(httpStatus.CREATED, '', true, genre));
});

const updateGenre = catchAsync(async (req, res) => {
  const genre = await genreService.updateGenreById(req.params.genreId, req.body);
  res.status(httpStatus.OK).send(RES(httpStatus.OK, '', true, genre));
});

const deleteGenre = catchAsync(async (req, res) => {
  await genreService.deleteGenreById(req.params.genreId);
  res.status(httpStatus.OK).send(RES(httpStatus.OK, '', true, null));
});

module.exports = {
  getAllGenres,
  createGenre,
  updateGenre,
  deleteGenre,
};
