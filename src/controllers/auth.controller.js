const httpStatus = require('http-status');
const { totp } = require('otplib');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');

const { generateToken } = require('../utils/2fa');

const { RES } = require('../utils/RES');
const logger = require('../config/logger');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send(RES(httpStatus.CREATED, '', true, { user, tokens }));
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send(RES(httpStatus.CREATED, '', true, { user, tokens }));
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.OK).send(RES(httpStatus.OK, '', true, null));
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send(RES(httpStatus.OK, '', true, { ...tokens }));
});

const forgotPassword = catchAsync(async (req, res) => {
  const token = generateToken(process.env.TOTP_SECRET);
  logger.info(process.env.TOTP_SECRET);
  await emailService.sendResetPasswordEmail(req.body.email, token);
  res.status(httpStatus.OK).send(RES(httpStatus.OK, '', true, null));
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.body.email, req.body.password);
  res.status(httpStatus.OK).send(RES(httpStatus.OK, '', true, null));
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const timeOTP = totp.generate(req.user.email + process.env.TOTP_SECRET);
  await emailService.sendVerificationEmail(req.user.email, timeOTP);
  res.status(httpStatus.OK).send(RES(httpStatus.OK, '', true, null));
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.body.otp);
  res.status(httpStatus.OK).send(RES(httpStatus.OK, '', true, null));
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
