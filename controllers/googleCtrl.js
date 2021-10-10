const passport = require("passport");
const dotenv = require("dotenv");
const strategy = require("passport-google-oauth20");

const userModel = require("../models/userModel");

const GoogleStrategy = strategy.Strategy;

dotenv.config();
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.callbackURL,
      profileFields: ["email", "name"],
    },
    function (accessToken, refreshToken, profile, done) {
      const { email, first_name, last_name } = profile._json;
      const userData = {
        email,
        firstName: first_name,
        lastName: last_name,
      };
      new userModel(userData).save();
      done(null, profile);
    }
  )
);
