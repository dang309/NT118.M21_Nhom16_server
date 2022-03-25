const { version } = require('../../package.json');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Phát triển ứng dụng trên thiết bị di động - Nhóm 16',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `https://nt118-m21-nhom16-api.herokuapp.com/v1`,
    },
  ],
};

module.exports = swaggerDef;
