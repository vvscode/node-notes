// @ts-check
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const KEYS = require("./config/keys");

const PORT = process.env.PORT || 5000;

const app = express();

passport.use(
  new GoogleStrategy(
    {
      // https://console.developers.google.com
      clientID: KEYS.googleClientID,
      clientSecret: KEYS.googleClientSecret,
      callbackURL: "http://localhost:5000/auth/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      console.log("profile", profile);
      cb(null, profile);
    }
  )
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(passport.initialize());
app.use(passport.session());
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/googe" }),
  (req, res) => res.redirect("/")
);

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("isAuthenticated user");
  } else {
    res.send("unknown user");
  }
});

app.listen(PORT, () => console.log(`Go to http://0.0.0.0:${PORT}`));
