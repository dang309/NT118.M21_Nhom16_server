const { Conversation, Message } = require('../models');

module.exports = (io, socket) => {
  const createRoom = async (payload) => {
    const { firstUserId, secondUserId } = payload;
    const conversation = await Conversation.find({
      $or: [
        { first_user_id: firstUserId },
        { second_user_id: firstUserId },
        { first_user_id: secondUserId },
        { second_user_id: secondUserId },
      ],
    });
    if (conversation) {
      socket.emit('messenger:room_id', { conversationId: conversation[0]._id, secondUserId });
      return;
    }
    const newConversation = await Conversation.create({ first_user_id: firstUserId, second_user_id: secondUserId });
    socket.emit('messenger:room_id', { conversationId: newConversation._id, secondUserId });
  };

  const sendPrivateMessage = async (payload) => {
    const { conversationId, content, from, to } = payload;
    const newMessage = await Message.create({ conversation_id: conversationId, content, from, to });
    socket.emit('messenger:send_private_message', newMessage);
  };

  socket.on('messenger:create_room', createRoom);
  socket.on('messenger:send_private_message', sendPrivateMessage);
};
