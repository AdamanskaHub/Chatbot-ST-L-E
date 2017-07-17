var express = require('express');
var router  = express.Router();
var auth    = require('../helpers/auth');
//call the model
const chatBot = require('../models/chatbot');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chatbot' });
});
//go to this route
router.get('/chatbot', function(req, res, next) {
//get all info from chatbot collection, finds and prints all info
  chatBot.find({}, (err, bot) =>{
    if(err){return next(err)}
    console.log('chatbotFrase');
    //data transformed to json
    res.json({bot})   
  }) 
});

router.get('/secret', auth.checkLoggedIn('You must be login', '/login'), function(req, res, next) {
  res.render('secret', { user: JSON.stringify(req.user) });
});

router.get('/admin', auth.checkLoggedIn('You must be login', '/login'), auth.checkCredentials('ADMIN'), function(req, res, next) {
	// console.log(req.user);
  res.render('admin', { user: JSON.stringify(req.user) });
});

module.exports = router;
