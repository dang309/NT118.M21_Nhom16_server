const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { conversationService } = require('../services');
const pick = require('../utils/pick');
const { RES } = require('../utils/RES');

const createConversation = catchAsync(async (req, res) => {
  const conversation = await conversationService.createConversation(req.body);
  res.status(httpStatus.CREATED).send(RES(httpStatus.CREATED, '', true, conversation));
});

const getConversations = catchAsync(async (req, res) => {
  const { filters } = pick(req.query, ['filters']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await conversationService.queryConversations(filters, options);
  res.send(RES(httpStatus.OK, '', true, result));
});

const getConversationByPostId = catchAsync(async (req, res) => {
  const conversation = await conversationService.getConversationByPostId(req.params.postId);
  res.send(RES(httpStatus.OK, '', true, conversation));
});

const updateConversation = catchAsync(async (req, res) => {
  const conversation = await conversationService.updateConversationById(req.params.conversationId, req.body);
  res.send(RES(httpStatus.OK, '', true, conversation));
});

const deleteConversation = catchAsync(async (req, res) => {
  await conversationService.deleteConversationById(req.params.conversationId);
  res.status(httpStatus.OK).send(RES(httpStatus.OK, '', true, null));
});

module.exports = {
  createConversation,
  getConversations,
  getConversationByPostId,
  updateConversation,
  deleteConversation,
};
