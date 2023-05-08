import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";
import { findOrCreate } from "../services/user.service";
dotenv.config();

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: any, done) => {
  done(null, id);
});

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_OAUTH_REDIRECT!,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const user = await findOrCreate({
          name: profile.displayName,
          email: profile.emails?.[0].value,
          photo: profile.photos?.[0].value,
        });

        cb(null, user);
      } catch (err: any) {
        cb(err);
      }
    }
  )
);
