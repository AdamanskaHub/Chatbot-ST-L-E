const mongoose = require('mongoose');
const chatBot = require('../models/chatbot');
const user = require('../models/user');

mongoose.connect('mongodb://localhost/Chatbot');

const bot = new chatBot({

    greeting: ["Hello  + theUser + , glad to see you.",
        "Hey  + theUser + , you're back.",
        "I'm happy to see you  + theUser + .",
        "theUser +  are you ready to write?",
        "Hello + theUser + , ready to write some positive self talk?"
    ],
    letsWrite: ["Let's write your positive self talk of the day.",
        "Time to write some positive self talk.",
        "Think about positive self talk that you currently need, then write it.",
        "What do you want to write today?"
    ],
    message: ["Awesome, you're on the right path.",
        "Great self talk.",
        "Improving step by step."
    ],
    whichTag: ["Now we just need a tag.",
        "Adding the tag and we're done.",
        "What's the tag for this entry?"
    ],
    letsTag: ["Now we just need a tag.",
        "Adding the tag and we're done.",
        "What's the tag for this entry?"
    ],
    otherThings: ["Alright, what would you like to do?",
        "What should we do then?",
        "Here is what we can do."
    ],
    inspireMe: ["Sure, here are some examples of positive self talk",
        "I'll give you some examples of positive self talk.",
        "Have a look at those examples of positive self talk, it might inspire you."
    ],
    inspireQuotes: ['"I\'m doing better everyday."',
        '"I can handle this."',
        '"I\'ll get it."',
        '"I\'m amazing at that"',
        '"I allow myself to fail as it allows me to improve."',
        '"I love to take action."',
        '"I like challenges and meet them head on."',
        '"I never allow the word "no" to stop me"',
        '"I live in the present moment"'
    ]

});

chatBot.create(bot, (err, chatBot) => {
        if (err) {
            throw err;
        }
        console.log(chatBot);
        mongoose.connection.close();
    })

//grabing info from models and insert them to the database