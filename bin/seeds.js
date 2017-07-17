const mongoose = require('mongoose');
const chatBot = require('../models/chatbot');

mongoose.connect('mongodb://localhost/Chatbot');

const bot = new chatBot({
    greeting: ["Emilie", "Laura", "Popular Laura", "Shy Emilie"],
    messages: ["Dislikes", "Hates", "Can't stand", "Vomits thinking about"]
})

chatBot.create(bot,(err,chatBot) =>{
    if(err){
        throw err;
    }
    console.log(chatBot);
    mongoose.connection.close();
})
//grabing info from models and insert them to the database
