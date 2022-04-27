const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { commentService } = require('../services');
const pick = require('../utils/pick');
const { RES } = require('../utils/RES');

const createComment = catchAsync(async (req, res) => {
  // const data = Object.assign(req.body, { image: req.file.path });
  const comment = await commentService.createComment(req.body);
  res.status(httpStatus.CREATED).send(RES(httpStatus.CREATED, '', true, comment));
});

const getComments = catchAsync(async (req, res) => {
  const { filters } = pick(req.query, ['filters']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await commentService.queryComments(filters, options);
  res.send(RES(httpStatus.OK, '', true, result));
});

const getCommentByPostId = catchAsync(async (req, res) => {
  const comment = await commentService.getCommentByPostId(req.params.postId);
  res.send(RES(httpStatus.OK, '', true, comment));
});

const updateComment = catchAsync(async (req, res) => {
  const comment = await commentService.updateCommentById(req.params.commentId, req.body);
  res.send(RES(httpStatus.OK, '', true, comment));
});

const deleteComment = catchAsync(async (req, res) => {
  await commentService.deleteCommentById(req.params.commentId);
  res.status(httpStatus.OK).send(RES(httpStatus.OK, '', true, null));
});

module.exports = {
  createComment,
  getComments,
  getCommentByPostId,
  updateComment,
  deleteComment,
};
