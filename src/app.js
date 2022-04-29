const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { totp } = require('otplib');
const config = require('./config/config');
const MORGAN = require('./config/morgan');
const { jwtStrategy, ggStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const { postEvents, userEvents, messengerEvents, notificationEvents } = require('./events');

const app = express();

totp.options = {
  step: 60 * 5, // 5 minutes
};

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

const onConnection = (socket) => {
  socket.on('create_room', (payload) => {
    const { userId } = payload;
    socket.join(userId);
  });

  postEvents(io, socket);
  userEvents(io, socket);
  messengerEvents(io, socket);
  notificationEvents(io, socket);
};

io.on('connection', onConnection);

if (config.env !== 'test') {
  app.use(MORGAN.successHandler);
  app.use(MORGAN.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
passport.use(ggStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

app.get('/', (_, res) => res.redirect('/v1/docs'));

app.get('/favicon.ico', (req, res) => res.status(204));

// v1 api routes
app.use('/v1', routes);

app.get('/v1/auth/google', passport.authenticate('google', { scope: ['profile'] }));
app.get('/v1/auth/google/callback', passport.authenticate('google'));

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy!'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = httpServer;
