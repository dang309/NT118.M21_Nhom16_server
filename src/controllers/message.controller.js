const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { messageService } = require('../services');
const pick = require('../utils/pick');
const { RES } = require('../utils/RES');

const createMessage = catchAsync(async (req, res) => {
  const message = await messageService.createMessage(req.body);
  res.status(httpStatus.CREATED).send(RES(httpStatus.CREATED, '', true, message));
});

const getMessages = catchAsync(async (req, res) => {
  const { filters } = pick(req.query, ['filters']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await messageService.queryMessages(filters, options);
  res.send(RES(httpStatus.OK, '', true, result));
});

const getMessageByPostId = catchAsync(async (req, res) => {
  const message = await messageService.getMessageByPostId(req.params.postId);
  res.send(RES(httpStatus.OK, '', true, message));
});

const updateMessage = catchAsync(async (req, res) => {
  const message = await messageService.updateMessageById(req.params.messageId, req.body);
  res.send(RES(httpStatus.OK, '', true, message));
});

const deleteMessage = catchAsync(async (req, res) => {
  await messageService.deleteMessageById(req.params.messageId);
  res.status(httpStatus.OK).send(RES(httpStatus.OK, '', true, null));
});

module.exports = {
  createMessage,
  getMessages,
  getMessageByPostId,
  updateMessage,
  deleteMessage,
};
