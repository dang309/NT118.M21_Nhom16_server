const HTTP_STATUS = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');
const s3 = require('../config/s3');

const createPost = catchAsync(async (req, res) => {
  const data = Object.assign(req.body, {
    sound: {
      bucket: req.files.sound[0].bucket,
      key: req.files.sound[0].key,
    },
    thumbnail: {
      bucket: req.files.thumbnail && req.files.thumbnail[0].bucket,
      key: req.files.thumbnail && req.files.thumbnail[0].key,
    },
  });
  const post = await postService.createPost(data);
  res.status(HTTP_STATUS.CREATED).send(post);
});

const getPosts = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['user_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await postService.queryPosts(false, options);
  res.send(result);
});

const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId);
  res.send(post);
});

const getSound = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId);
  s3.getObject({ Bucket: post.sound.bucket, Key: post.sound.key }).createReadStream().pipe(res);
});

const getThumbnail = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId);
  s3.getObject({ Bucket: post.thumbnail.bucket, Key: post.thumbnail.key }).createReadStream().pipe(res);
});

const updatePost = catchAsync(async (req, res) => {
  const post = await postService.updatePostById(req.params.postId, req.body);
  res.send(post);
});

const deletePost = catchAsync(async (req, res) => {
  await postService.deletePostById(req.params.postId);
  res.status(HTTP_STATUS.NO_CONTENT).send();
});

module.exports = {
  createPost,
  getPosts,
  getPost,
  getSound,
  getThumbnail,
  updatePost,
  deletePost,
};
