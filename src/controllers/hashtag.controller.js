const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { hashtagService } = require('../services');
const { RES } = require('../utils/RES');

const getAllHashtags = catchAsync(async (req, res) => {
  const hashtags = await hashtagService.getAllHashtags();
  res.status(httpStatus.OK).send(RES(httpStatus.OK, '', true, hashtags));
});

const createHashtag = catchAsync(async (req, res) => {
  const hashtag = await hashtagService.createHashtag(req.body);
  res.status(httpStatus.CREATED).send(RES(httpStatus.CREATED, '', true, hashtag));
});

const updateHashtag = catchAsync(async (req, res) => {
  const hashtag = await hashtagService.updateHashtagById(req.params.hashtagId, req.body);
  res.status(httpStatus.OK).send(RES(httpStatus.OK, '', true, hashtag));
});

const deleteHashtag = catchAsync(async (req, res) => {
  await hashtagService.deleteHashtagById(req.params.hashtagId);
  res.status(httpStatus.OK).send(RES(httpStatus.OK, '', true, null));
});

module.exports = {
  getAllHashtags,
  createHashtag,
  updateHashtag,
  deleteHashtag,
};
