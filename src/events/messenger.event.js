const { Message } = require('../models');

module.exports = (io, socket) => {
  const createRoom = async (payload) => {
    const { userId } = payload;
    socket.join(userId);
  };

  const sendPrivateMessages = async (payload) => {
    const { content, from, to } = payload;
    const newMessage = await Message.create({ content, from, to });
    socket.to(to).emit('messenger:send_private_message', newMessage);
  };

  const readMessages = async () => {
    await Message.updateMany({ is_unread: true }, { $set: { is_unread: false } }, { multi: true });
  };

  socket.on('messenger:create_room', createRoom);
  socket.on('messenger:send_private_message', sendPrivateMessages);
  socket.on('messenger:read_message', readMessages);
};
