const { Message } = require('../models');

module.exports = (io, socket) => {
  const createRoom = async (payload) => {
    const { userId } = payload;
    socket.join(userId);
  };

  const sendPrivateMessage = async (payload) => {
    const { content, from, to } = payload;
    socket.to(to).emit('messenger:send_private_message', { content, from, to });
    await Message.create({ content, from, to });
  };

  socket.on('messenger:create_room', createRoom);
  socket.on('messenger:send_private_message', sendPrivateMessage);
};
