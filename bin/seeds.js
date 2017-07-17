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
    ],
    whichTag: ["Which tag do you want to add?",
        "Choose a tag.",
        "Select a tag."
    ],
    otherThings: ["Alright, what would you like to do?",
        "What should we do then?",
        "Here is what we can do."
    ],
    inspireMe: ["Sure, here are some examples of positive self talk",
        "I'll give you some examples of positive self talk.",
        "Have a look at those examples of positive self talk, it might inspire you."
    ],
    inspireQuotes: ["I'm doing better everyday.",
        "I can handle this.",
        "I'll get it.",
        "I'm amazing at that",
        "I allow myself to fail as it allows me to improve.",
        "I love to take action.",
        "I like challenges and meet them head on.",
        "I never allow the word 'no' to stop me",
        "I live in the present moment"
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