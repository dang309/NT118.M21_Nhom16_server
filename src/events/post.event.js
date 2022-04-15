const { postService } = require('../services');

module.exports = (io, socket) => {
  const likePost = async (payload) => {
    const post = await postService.getPostById(payload.postId);
    if (!post) return;
    if (post.users_like.some((o) => o === payload.userId)) {
      const idx = post.users_like.indexOf(payload.userId);
      post.users_like.splice(idx, 1);
    } else {
      post.users_like.push(payload.userId);
    }
    await post.save();

    socket.emit('post:num_like', { postId: post.id, users_like: post.users_like });

    return post;
  };

  const listenPost = async (payload) => {
    const post = await postService.getPostById(payload.postId);
    if (post.users_listening.some((o) => o === payload.userId)) {
      return;
    }
    post.users_listening.push(payload.userId);

    await post.save();

    socket.emit('post:num_listening', { postId: post.id, users_listening: post.users_listening });

    return post;
  };

  socket.on('post:like', likePost);
  socket.on('post:listen', listenPost);
};
