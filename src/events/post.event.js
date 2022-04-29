const { Notification } = require('../models');
const { postService } = require('../services');

module.exports = (io, socket) => {
  const likePost = async (payload) => {
    const { postId, userId } = payload;
    const post = await postService.getPostById(postId);
    if (!post) return;
    if (post.users_like.some((o) => o === userId)) {
      const idx = post.users_like.indexOf(userId);
      post.users_like.splice(idx, 1);
    } else {
      if (post.user_id !== userId) {
        const newNotification = await Notification.create({
          user_id: userId,
          opponent_id: post.user_id,
          action: 'Liked',
          source_post_id: postId,
        });
        socket.emit('notification:send_notification', newNotification);
      }
      post.users_like.push(userId);
    }
    await post.save();

    socket.emit('post:num_like', { postId: post.id, users_like: post.users_like });

    return post;
  };

  const listenPost = async (payload) => {
    const { userId, postId } = payload;
    const post = await postService.getPostById(postId);
    if (post.users_listening.some((o) => o === userId)) {
      return;
    }
    if (post.user_id !== userId) {
      const newNotification = await Notification.create({
        user_id: userId,
        opponent_id: post.user_id,
        action: 'Listened',
        source_post_id: postId,
      });
      socket.emit('notification:send_notification', newNotification);
    }
    post.users_listening.push(userId);

    await post.save();

    socket.emit('post:num_listening', { postId: post.id, users_listening: post.users_listening });

    return post;
  };

  socket.on('post:like', likePost);
  socket.on('post:listen', listenPost);
};
