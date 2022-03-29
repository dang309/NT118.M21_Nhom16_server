const { totp } = require('otplib');

totp.options = { step: 100 };

const generateUniqueSecret = () => {
  return totp.generateSecret();
};

const generateToken = (secret) => {
  return totp.generate(secret);
};

const verifyOTPToken = (token, secret) => {
  return totp.verify({ token, secret });
};

module.exports = {
  generateUniqueSecret,
  generateToken,
  verifyOTPToken,
};
