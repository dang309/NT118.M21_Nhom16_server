const { Notification } = require('../models');

module.exports = (io, socket) => {
  const sendNotification = async (payload) => {
    const { userId, opponentId, action, sourcePostId } = payload;
    const newNotification = await Notification.create({
      user_id: userId,
      opponent_id: opponentId,
      action,
      source_post_id: sourcePostId,
    });
    socket.to(opponentId).emit('notification:send_notification', newNotification);
  };

  const readNotifications = async () => {
    await Notification.updateMany({ is_unread: true }, { $set: { is_unread: false } }, { multi: true });
  };

  socket.on('notification:send_notification', sendNotification);
  socket.on('notification:read_notification', readNotifications);
};
