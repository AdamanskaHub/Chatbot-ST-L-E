const mongoose = require('mongoose');
const chatBot = require('../models/chatbot');

mongoose.connect('mongodb://localhost/Chatbot');

const bot = new chatBot({

    greeting: ["Hello " + theUser + ", glad to see you.",
        "Hey " + theUser + ", you're back.",
        "I'm happy to see you " + theUser + ".",
        theUser + " are you ready to write?",
        "Hello" + theUser + ", ready to writer some positive self talk?"
    ],

    writeMessage: ["Awesome, you're on the right path.",
        "Great self talk.",
        "Improving step by step.",
        "You're doing well ;)"
    ]
})

chatBot.create(bot, (err, chatBot) => {
        if (err) {
            throw err;
        }
        console.log(chatBot);
        mongoose.connection.close();
    })
    //grabing info from models and insert them to the database