const bcrypt = require("bcrypt");
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const FbStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

require("dotenv").config();
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENTSECRET = process.env.FACEBOOK_CLIENTSECRET;


passport.serializeUser((user, cb) => { cb(null, user) });
passport.deserializeUser((user, cb) => { cb(null, user) });

passport.use(new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, next) => {
    User.findOne({ username }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(null, false, { message: "It seems your username is not correct" });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return next(null, false, { message: "Apparently the password is wrong" });
        }

        return next(null, user);
    });
}));

module.exports = passport;