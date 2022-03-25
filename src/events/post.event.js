const { postService } = require('../services');

module.exports = (io, socket) => {
  const likePost = async (payload) => {
    const post = await postService.getPostById(payload.postId);
    if (post.users_like.some((o) => o === payload.userId)) {
      const idx = post.users_like.indexOf(payload.userId);
      post.users_like.splice(idx, 1);
    } else {
      post.users_like.push(payload.userId);
    }
    await post.save();

    socket.emit('post:num_like', { num_like: post.users_like.length() });

    return post;
  };

  const listenPost = async (payload) => {
    const post = await postService.getPostById(payload.postId);
    if (post.users_listening.some((o) => o === payload.userId)) {
      const idx = post.users_listening.indexOf(payload.userId);
      post.users_listening.splice(idx, 1);
    } else {
      post.users_listening.push(payload.userId);
    }
    await post.save();

    socket.emit('post:num_listening', { num_listening: post.users_listening.length() });

    return post;
  };

  socket.on('post:like', likePost);
  socket.on('post:listen', listenPost);
};
