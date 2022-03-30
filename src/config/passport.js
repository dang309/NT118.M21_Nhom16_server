const { Strategy, ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config');
const { tokenTypes } = require('./tokens');
const { User } = require('../models');
const { userService } = require('../services');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

const ggStrategy = new GoogleStrategy(
  {
    clientID: '722296285669-b4k36580dj7n2s95vlsqcdr9tta8fca0.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback',
  },
  async (profile, done) => {
    try {
      console.log('profile', profile);
      let user;
      user = await User.findOne({ email: profile.email });
      if (user) {
        return done("Email's already existed!", false);
      }
      user = await User.create({ email: profile.email });
    } catch (err) {
      done(err, false);
    }
  }
);

module.exports = {
  jwtStrategy,
  ggStrategy,
};
