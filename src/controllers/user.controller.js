const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const s3 = require('../config/s3');
const { userService } = require('../services');

const { RES } = require('../utils/RES');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(RES(httpStatus.CREATED, '', true, user));
});

const getUsers = catchAsync(async (req, res) => {
  const { filters } = pick(req.query, ['filters']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(JSON.parse(filters), options);
  res.send(RES(httpStatus.OK, '', true, result));
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(RES(httpStatus.OK, '', true, user));
});

const getAvatar = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  s3.getObject({ Bucket: user.avatar.bucket, Key: user.avatar.key }).createReadStream().pipe(res);
});

const updateUser = catchAsync(async (req, res) => {
  const data = Object.assign(req.body, {
    avatar: {
      bucket: req.file.bucket,
      key: req.file.key,
    },
  });
  const user = await userService.updateUserById(req.params.userId, data);
  res.send(RES(httpStatus.OK, '', true, user));
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.OK).send(RES(httpStatus.OK, '', true, null));
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  getAvatar,
  updateUser,
  deleteUser,
};
