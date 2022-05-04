const { Message } = require('../models');

module.exports = (io, socket) => {
  const sendPrivateMessages = async (payload) => {
    const { messageId, content, from, to } = payload;
    const _contactIds = [];
    _contactIds.push(from);
    _contactIds.push(to);
    const newMessage = await Message.create({
      message_id: messageId,
      contact_id: _contactIds.sort().join('_'),
      content,
      from,
      to,
    });
    socket.to(to).emit('messenger:send_private_message', newMessage);
  };

  const readMessages = async () => {
    await Message.updateMany({ is_unread: true }, { $set: { is_unread: false } }, { multi: true });
  };

  socket.on('messenger:send_private_message', sendPrivateMessages);
  socket.on('messenger:read_message', readMessages);
};
