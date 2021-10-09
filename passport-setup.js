import passport from "passport";

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: "173575435972-tjl7omubeld31ggle0t6is9i12vqv67r.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://www.example.com/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
