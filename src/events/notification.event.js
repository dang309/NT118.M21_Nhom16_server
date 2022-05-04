const { Notification } = require('../models');

module.exports = (io, socket) => {
  const readNotifications = async (payload) => {
    const { notiId } = payload;
    await Notification.updateOne({ _id: notiId }, { $set: { is_unread: false } });
  };

  socket.on('notification:read_notification', readNotifications);
};
