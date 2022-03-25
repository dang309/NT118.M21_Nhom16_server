const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createComment = {
  body: Joi.object().keys({
    content: Joi.string().required(),
    user_comment_id: Joi.string().custom(objectId),
  }),
};

const getComments = {
  query: Joi.object().keys({
    post_id: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getComment = {
  params: Joi.object().keys({
    commentId: Joi.string().custom(objectId),
  }),
};

const updateComment = {
  params: Joi.object().keys({
    commentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      content: Joi.string().email(),
    })
    .min(1),
};

const deleteComment = {
  params: Joi.object().keys({
    commentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
};
