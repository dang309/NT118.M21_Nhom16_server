const { Notification } = require('../models');
const { userService, postService } = require('../services');

module.exports = (io, socket) => {
  const toggleFollow = async (payload) => {
    const userSource = await userService.getUserById(payload.userIdSource);
    const userDestination = await userService.getUserById(payload.userIdDestination);
    if (!userSource || !userDestination) return;
    if (userSource.following.some((o) => o === payload.userIdDestination)) {
      const idxSource = userSource.following.indexOf(payload.userIdDestination);
      const idxDestination = userDestination.followers.indexOf(payload.userIdSource);
      userSource.following.splice(idxSource, 1);
      userDestination.followers.splice(idxDestination, 1);
    } else {
      userSource.following.push(payload.userIdDestination);
      userDestination.followers.push(payload.userIdSource);
    }
    await userSource.save();
    await userDestination.save();

    socket.emit('user:num_following', { userId: userSource.id, num_following: userSource.following });
    socket.emit('user:num_followers', { userId: userDestination.id, num_followers: userDestination.followers });
  };

  const bookmarkPost = async (payload) => {
    const { userId, postId } = payload;
    const user = await userService.getUserById(userId);
    const post = await postService.getPostById(postId);
    if (user.bookmarked_posts.some((o) => o === postId)) {
      return;
    }
    if (post.user_id !== userId) {
      const newNotification = await Notification.create({
        user_id: userId,
        opponent_id: post.user_id,
        action: 'Bookmarked',
        source_post_id: postId,
      });
      socket.emit('notification:send_notification', newNotification);
    }
    user.bookmarked_posts.push(postId);

    await user.save();
  };

  socket.on('user:toggle_follow', toggleFollow);
  socket.on('user:add_bookmarked_post', bookmarkPost);
};
