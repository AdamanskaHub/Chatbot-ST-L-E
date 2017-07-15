const express = require('express');
const bcrypt = require("bcrypt");
const User = require("../models/user");
const passport = require("../helpers/passport");

const router = express.Router();
const bcryptSalt = 10;

/* GET users listing. */
router.get('/signup', function(req, res, next) {
    res.render('auth/signup', { "message": req.flash("error") });
});

router.post("/signup", (req, res, next) => {
    console.log("arriving at sign up");
    var username = req.body.username;
    var password = req.body.password;

    if (username === "" || password === "") {
        req.flash('error', 'Indicate username and password');
        res.render("auth/signup", { "message": req.flash("error") });
        console.log("consider the stuff empty");
        return;
    }

    User.findOne({ username }, "username", (err, user) => {
        if (user !== null) {
            req.flash('error', 'The username already exists');
            console.log("already user");
            res.render("auth/signup", { message: req.flash("error") });
            return;
        }

        var salt = bcrypt.genSaltSync(bcryptSalt);
        var hashPass = bcrypt.hashSync(password, salt);

        var newUser = User({
            username,
            password: hashPass
        });

        newUser.save((err) => {
            if (err) {
                req.flash('error', 'The username already exists');
                console.log("error of newUser");
                res.render("auth/signup", { message: req.flash('error') });
                return res.send(); // I?VE ADDED THAT RANDOMLY
            } else {
                passport.authenticate("local")(req, res, function() {
                    //console.log("successful signup of " + user.username);
                    console.log("redirecting at full power to the main page");
                    res.redirect('/');

                    // JE REDIRIGE VERS UN ENDROIT DONT JE NE SUIS PAS SURE!
                });
            }
        });
    });
});

router.get("/login", (req, res, next) => {
    res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    // OH MY GODE !!! CHANGING STUFF
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}));

router.get("/logout", (req, res) => {
    req.logout();
    delete res.locals.currentUser;
    delete req.session.passport;
    // delete currentUser and passport properties 
    // becasuse when we calling req.logout() is leaving an empty object inside both properties.
    res.redirect('/');


});

// router.get("/auth/facebook", passport.authenticate("facebook"));
// router.get("/auth/facebook/callback", passport.authenticate("facebook", {
//     successRedirect: "/",
//     // SUCCESS REDIRECT NOT TO THE SECRET
//     failureRedirect: "/"
// }));

module.exports = router;