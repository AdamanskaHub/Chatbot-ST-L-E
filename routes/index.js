var express = require('express');
var router = express.Router();
var auth = require('../helpers/auth');
//call the model
const chatBot = require('../models/chatbot');
const User = require('../models/user');
/* GET home page. */
router.get('/', auth.checkLoggedIn('Sorry, please log in to access to the app', '/login'), function(req, res, next) {
    res.render('index', { title: 'The fucking awesome Chatbot' });
});



//go to this route
router.get('/chatbot', function(req, res, next) {
    //get all info from chatbot collection, finds and prints all info
    chatBot.find({}, (err, bot) => {
        if (err) { return next(err) }
        console.log('chatbotFrase');
        //data transformed to json
        res.json({ bot })
    })
});

router.get('/user', function(req, res, next) {
    //get all info from chatbot collection, finds and prints all info
    let userLogged = req.session.passport.user._id
    User.findById({ _id: userLogged }, (err, userPrint) => {
        console.log('finds user by id');
        if (err) {
            console.log("there is an error")
            next(err);
        }
        console.log("OBJECT", userPrint);

        res.json({ userPrint })
    });
});

router.get('/secret', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
    res.render('secret', { user: JSON.stringify(req.user) });
});

router.get('/admin', auth.checkLoggedIn('You must be login', '/login'), auth.checkCredentials('ADMIN'), function(req, res, next) {
    // console.log(req.user);
    res.render('admin', { user: JSON.stringify(req.user) });
});

router.post("/comment", (req, res, next) => {
    console.log("ID OF USER ON COMMENT", req.session);

    console.log(req.session.passport.user._id);
    console.log("post");
    console.log(req.body);
    //takes current id user
    let userLogged = req.session.passport.user._id
        //takes current message
    let message = req.body;
    //finds user by id and inserts message object (main.js) to user model key.
    User.findByIdAndUpdate({ _id: userLogged }, { $push: { selfTalkMessages: message } }, { new: true }, (err, listUpdated) => {
        console.log('finds user by id and updates');
        if (err) {
            console.log("there is an error")
            next(err);
        }
        res.json({ listUpdated })
    });
});

router.post("/user", (req, res, next) => {
    console.log("post ON /USER");
    console.log(req.body);
    //takes current id user
    let userLogged = req.session.passport.user._id
    let userName = req.body.name
        //finds user by id and inserts message object (main.js) to user model key.
    User.findByIdAndUpdate({ _id: userLogged }, { "firstTime": false, "name": userName }, { new: true }, (err, userUpdate) => {
        console.log('find and update user firstime');
        if (err) {
            console.log("there is an error")
            next(err);
        }
        res.json({ userUpdate })
    });
});

module.exports = router;