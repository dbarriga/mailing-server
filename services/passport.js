const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const outlookStrategy = require('passport-outlook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (!existingUser) {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        } else {
          done(null, existingUser);
        }
      });
    }
  )
);

passport.use(
  new outlookStrategy(
    {
      clientID: keys.outlookApplicationId,
      clientSecret: keys.outlookPassword,
      callbackURL: '/auth/outlook/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({ outlookId: profile.id }).then(existingUser => {
        if (!existingUser) {
          new User({ outlookId: profile.id })
            .save()
            .then(user => done(null, user));
        } else {
          done(null, existingUser);
        }
      });
    }
  )
);
