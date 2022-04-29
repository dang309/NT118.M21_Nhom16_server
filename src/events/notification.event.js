const { Notification } = require('../models');

module.exports = (io, socket) => {
  const readNotifications = async () => {
    await Notification.updateMany({ is_unread: true }, { $set: { is_unread: false } }, { multi: true });
  };

  socket.on('notification:read_notification', readNotifications);
};
