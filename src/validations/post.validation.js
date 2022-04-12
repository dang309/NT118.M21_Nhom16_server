const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    user_id: Joi.string().required(),
    caption: Joi.string().required(),
    sound: Joi.string().required(),
    thumbnail: Joi.string().required(),
    genre_id: Joi.string().required(),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    user_id: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      caption: Joi.string().email(),
      thumbnail: Joi.binary(),
      password: Joi.string().custom(password),
      sound: Joi.binary(),
      hashtag: Joi.string(),
      genre: Joi.string(),
    })
    .min(1),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
