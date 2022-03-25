const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { commentService } = require('../services');

const createComment = catchAsync(async (req, res) => {
  // const data = Object.assign(req.body, { image: req.file.path });
  const comment = await commentService.createComment(req.body);
  res.status(httpStatus.CREATED).send(comment);
});

const getCommentByPostId = catchAsync(async (req, res) => {
  const comment = await commentService.getCommentByPostId(req.params.postId);
  res.send(comment);
});

const updateComment = catchAsync(async (req, res) => {
  const comment = await commentService.updateCommentById(req.params.commentId, req.body);
  res.send(comment);
});

const deleteComment = catchAsync(async (req, res) => {
  await commentService.deleteCommentById(req.params.commentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createComment,
  getCommentByPostId,
  updateComment,
  deleteComment,
};
