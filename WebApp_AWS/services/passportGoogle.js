const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("googleUsers");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne(id.objectId).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // console.log("we already have a record with the given profile ID");
        return done(null, existingUser);
      }

      // console.log("we dont have a user record with this ID, make a new record");
      const user = await new User({
        googleId: profile.id,
        googleEmail: profile._json.email,
        googlePic: profile._json.picture,
        googleName: profile._json.name,
        googleGivenName: profile._json.given_name,
        googleFamilyName: profile._json.family_name,
        googleLocale: profile._json.locale
      }).save();
      done(null, user);
    }
  )
);
