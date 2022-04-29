const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const postRoute = require('./post.route');
const commentRoute = require('./comment.route');
const genreRoute = require('./genre.route');
const hashtagRoute = require('./hashtag.route');
const messageRoute = require('./message.route');
const docsRoute = require('./docs.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/posts',
    route: postRoute,
  },
  {
    path: '/comments',
    route: commentRoute,
  },
  {
    path: '/genres',
    route: genreRoute,
  },
  {
    path: '/hashtags',
    route: hashtagRoute,
  },
  {
    path: '/messages',
    route: messageRoute,
  },
  {
    path: '/docs',
    route: docsRoute,
  },
];

// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;
