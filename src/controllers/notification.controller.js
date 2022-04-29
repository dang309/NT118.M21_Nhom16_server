const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { notificationService } = require('../services');
const pick = require('../utils/pick');
const { RES } = require('../utils/RES');

const createNotification = catchAsync(async (req, res) => {
  const notification = await notificationService.createNotification(req.body);
  res.status(httpStatus.CREATED).send(RES(httpStatus.CREATED, '', true, notification));
});

const getNotifications = catchAsync(async (req, res) => {
  const { filters } = pick(req.query, ['filters']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await notificationService.queryNotifications(filters, options);
  res.send(RES(httpStatus.OK, '', true, result));
});

const updateNotification = catchAsync(async (req, res) => {
  const notification = await notificationService.updateNotificationById(req.params.notificationId, req.body);
  res.send(RES(httpStatus.OK, '', true, notification));
});

const deleteNotification = catchAsync(async (req, res) => {
  await notificationService.deleteNotificationById(req.params.notificationId);
  res.status(httpStatus.OK).send(RES(httpStatus.OK, '', true, null));
});

module.exports = {
  createNotification,
  getNotifications,
  updateNotification,
  deleteNotification,
};
