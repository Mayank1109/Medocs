const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleEmail = profile.emails[0].value;
        const googleId = profile.id;
        let user = await User.findOne({ email: googleEmail });

        if (user) {
          if (!user.googleId) {
            user.googleId = googleId;
            user.authProviders.google = true;
          }
          user.lastLogin = new Date();
          await user.save();
        } else {
          user = await User.create({
            email: googleEmail,
            userName: profile.displayName,
            googleId,
            authProviders: { google: true },
            lastLogin: new Date(),
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;
