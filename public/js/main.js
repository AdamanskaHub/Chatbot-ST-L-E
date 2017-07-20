// =========================== APP LOGIC ===========================
let test;
let selected;
let firstTime;
let userNamePrint;
let temps = 0;

function random(param) {
    selected = param[Math.floor(Math.random() * param.length)];
}

function doItLAter(fct, time) {
    temps += time;
    console.log(temps);
    setTimeout(function() {
        fct();
    }, temps);
}

function chatTalk() {
    console.log('UNDEFINED????', selected);
    $(".talk").append("<div class='chatbox'><img src='../img/tinyhead.png'><p class='chat-answers'>" + selected + "</p></div>");
}

function chatTalk2(param, who) {
    $(".talk").append("<div class='chatbox'><img src='../img/tinyhead.png'><p class='" + who + "-answers'>" + param + "</p></div>");
}

function scrollThatStuff() {
    $('.talk').animate({
        scrollTop: $('.talk').get(0).scrollHeight
    }, 2000);
}

let dotdot = "<div class='chatbox2'><img src='../img/tinyhead.png'><div class='threedotloader'><div class='dot'></div><div class='dot'></div><div class='dot'></div></div></div>";

//chatbot call
let chatBotGreetings;
let chatBotMessage;
let chatBotOther;
let chatBotLetsWrite;
let chatBotInspireMe;
let chatBotInspireQuotes;
let chatBotwhichTag;
let chatBotPositive;
let chatBotBye;
//user calls
let userQuotes;
let userTags = [];
let userName;

// ============= AJAX CALL FOR CHATBOT =============
$.ajax({
    //get the route from route index.js chatbot
    url: "http://localhost:7777/chatbot",
    type: "get",
    success: function(response) {
        chatBotGreetings = response.bot[0].greeting;
        chatBotMessage = response.bot[0].message;
        chatBotOther = response.bot[0].otherThings;
        chatBotLetsWrite = response.bot[0].letsWrite;
        chatBotInspireMe = response.bot[0].inspireMe;
        chatBotInspireQuotes = response.bot[0].inspireQuotes;
        chatBotwhichTag = response.bot[0].whichTag;
        chatBotPositive = response.bot[0].positiveM;
        chatBotBye = response.bot[0].goodbye;
    },
    error: function(error) { console.log(error); }
});

// ============== AJAX CALL FOR USER =============
$.ajax({
    //get the route from route index.js chatbot
    url: "http://localhost:7777/user",
    type: "get",
    success: function(response) {
        console.log('FRONT', response.userPrint.selfTalkMessages);
        console.log('First Time Get user', response.userPrint.firstTime);
        firstTime = response.userPrint.firstTime;
        userQuotes = response.userPrint.selfTalkMessages;
        userNamePrint = response.userPrint.name;
        userQuotes.forEach((quote) => {
            userTags.push(quote.tag);
            userTags = userTags.filter(function(item, index, inputArray) {
                return inputArray.indexOf(item) == index;
            });
        });
    },
    error: function(error) { console.log(error); }
});

// ========================================================================
// =========================== DISPLAY THE TEXT ===========================
// ========================================================================

$(document).ready(function() {

    var message = "initial value";

    $("#self").click(function(event) {
        console.log('form');
        event.preventDefault();
    });
    // ========================================================================
    // ========================================================================
    // ======================== FIRST TIME PATH ===============================
    // ========================================================================
    // ========================================================================


    $(".talk").append(dotdot);

    // ========== GREETING FIRST TIME =============
    function theFirstGreeting0() {
        temps = 0;
        $(".chatbox2").remove();
        $(".talk").append(dotdot);
        setTimeout(function() {
            $(".chatbox2").remove();
            chatTalk2("Hello there!", "chat");
            scrollThatStuff();
            setTimeout(function() {
                $(".talk").append(dotdot);
                doItLAter(theFirstGreeting1, 2000);
            }, 1000);
        }, 700);

    }
    if (firstTime) { doItLAter(theFirstGreeting0, 2000); }


    function theFirstGreeting1() {
        $(".chatbox2").remove();
        $(".talk").append(dotdot);
        setTimeout(function() {
            $(".chatbox2").remove();
            chatTalk2("It's great to see you.", "chat");
            scrollThatStuff();
            setTimeout(function() {
                $(".talk").append(dotdot);
                doItLAter(theFirstGreeting2, 2000);
            }, 500);
        }, 100);
    }

    function theFirstGreeting2() {
        $(".chatbox2").remove();
        chatTalk2("Let's develop positive self talk habits.</br> But before that, do you know what self talk is?", "chat");
        setTimeout(function() {
            $(".talk").append("<div class='buttons'></div>");
            $(".buttons").append("<div class='butts btn-hover' id='iknow'><p>I know about it</p></div>");
            $(".buttons").append("<div class='butts btn-hover' id='idont'><p>I dont, explain</p></div>");
            scrollThatStuff();
        }, 800);
    }

    $(document).on("click", "#idont", function() {
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'>I dont, explain</p>");
        $(".talk").append(dotdot);
        setTimeout(function() {
            $(".chatbox2").remove();
            chatTalk2("Self-talk is basically your inner voice, the voice in your mind that says the things you don’t necessarily say out loud. We often don’t even realise that this running commentary is going on in the background, but our self-talk can have a big influence on how we feel about who we are.", "chat");
            $(".talk").append(dotdot);
            scrollThatStuff();
            setTimeout(function() {
                $(".chatbox2").remove();
                chatTalk2("For instance, when you thing 'I'm too lazy', you're doing negative self talk. It's harmful, especially if you repeat it often as you'll start believing it and it will define you.</br> On the contrary, if you often think 'I'm great at cooking', you will become even greater, somehow tricking your brain that will in turn make sure you are as great as you say.", "chat");
                $(".talk").append(dotdot);
                scrollThatStuff();
            }, 5500);
        }, 3000);

        temps = 0;
        scrollThatStuff();
        doItLAter(theNameGetting, 12000); // 2500 + 3000 + 1000
    });

    $(document).on("click", "#iknow", function() {
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'>I know about it</p>");
        $(".talk").append(dotdot);
        setTimeout(function() {
            $(".chatbox2").remove();
            chatTalk2("That's great.", "chat");
            $(".talk").append(dotdot);
            scrollThatStuff();
        }, 1000);
        temps = 0;
        scrollThatStuff();
        doItLAter(theNameGetting, 1800);
    });

    function theNameGetting() {
        $(".chatbox2").remove();
        chatTalk2("By the way, how are you called?", "chat");
        temps = 0;
        setTimeout(function() {
            // $(".talk").append(dotdot);
            scrollThatStuff();
            doItLAter(theNameGrabbing, 2000);
        }, 1000);
    }

    // THIS IS WHERE WE GET THE NAME OF THE USER
    function theNameGrabbing() {
        $(".chatbox2").remove();
        scrollThatStuff();
        $(".talk").append('<div id="input-container"><input type="text" name="new-name" id="new-name" placeholder="How should I call you"><button type="submit" class="btn btn-save btn-hover" id="savename">Save</button></div>');
        scrollThatStuff();
    }

    $(document).on("click", "#savename", function() {
        userName = $("#new-name").val();
        $("#input-container").remove();
        // WE NEED THE USER NAME TO APPEAR HERE, THIS SHOULD WORK
        $(".talk").append("<p class='user-answers'>" + userName + "</p>");
        console.log('name saved', userName);
        $(".talk").append(dotdot);
        scrollThatStuff();

        setTimeout(function() {
            $(".chatbox2").remove();
            chatTalk2("You can call me Zenyatta.", "chat");
            $(".talk").append(dotdot);
            scrollThatStuff();

            setTimeout(function() {
                $(".chatbox2").remove();
                // ======= LETS WRITE
                $(".talk").append(dotdot);
                setTimeout(function() {
                    $(".chatbox2").remove();
                    chatTalk2("Let's write your first entry. It can be something like 'I'm stronger than I think', 'I am creating a bright, successful future for myself', 'I am confident, self-assured and in control of my life'", "chat");
                    scrollThatStuff();
                    temps = 0;
                    doItLAter(theTextBoxIni, 3000);
                }, 3000);
            }, 1000);
        }, 800);
    });

    function theTextBoxIni() {
        $(".buttons").remove();
        $(".talk").append('<div class="st-form"> <textarea type="text" class="st-box" id="st" placeholder="Your positive self talk" name="st"></textarea></div><div class="buttons"><button type="submit" class="btn btn-save btn-hover" id="save2">Save</button></div>');
        // AUTO SCROLL FOR CHAT
        scrollThatStuff();
    }

    // ======== ON CLICK SAVE =============
    $(document).on("click", "#save2", function(e) {

        e.preventDefault();
        message = $("#st").val();
        console.log("MESSAGE", message);

        // ============== DISPLAYING ST ===============
        $(".talk").append("<p class='user-answers'>" + $("#st").val() + "</p>");
        $("#inspireAction").remove();
        $("#st").remove();
        $(".st-form").remove();
        $(this).remove();
        scrollThatStuff();
        $(".talk").append(dotdot); // #1
        setTimeout(function() {
            $(".chatbox2").remove();
            chatTalk2("Your first self talk is saved, I'll keep it preciously! An amazing first step.", "chat");
            scrollThatStuff();
            $(".talk").append(dotdot); // #2
        }, 2000);
        temps = 0;
        $.ajax({
            url: "http://localhost:7777/user",
            type: "POST",
            data: { name: userName },
            success: function(response) {
                console.log('First Time Post user', firstTime);
                firstTime = response.userUpdate.firstTime;
                console.log('First Time Post user', firstTime);
            },
            error: function(error) { console.log(error); }
        });
        doItLAter(theAddTag, 2000);

    });



    // ========================================================================
    // ========================================================================
    // ========================== STANDARD PATH ===============================
    // ========================================================================
    // ========================================================================
    // ========================================================================


    // ========== GREETING
    function theGreeting() {
        $(".chatbox2").remove();
        random(chatBotGreetings);
        // chatTalk();
        $(".talk").append("<div class='chatbox'><img src='../img/tinyhead.png'><p class='chat-answers'>" + selected[0] + " " + userNamePrint + " " + selected[1] + "</p></div>");

    }
    // ======= LETS WRITE
    function theLetsWrite() {
        $(".talk").append(dotdot);
        setTimeout(function() {
            $(".chatbox2").remove();
            random(chatBotLetsWrite);
            chatTalk();
            scrollThatStuff();
            temps = 0;
            doItLAter(theTextBox, 1000);
        }, 3000);
    }

    if (firstTime == false) {
        doItLAter(theGreeting, 2000);
        doItLAter(theLetsWrite, 2000);
    }


    // ======= THE TEXT BOX

    function theTextBox() {
        $(".buttons").remove();
        $(".talk").append('<div class="st-form"> <textarea type="text" class="st-box" id="st" placeholder="Your positive self talk" name="st"></textarea></div><div class="buttons"><button class="btn btn-save btn-hover" id="inspireAction">I don\'t know what to write</button><button type="submit" class="btn btn-save btn-hover" id="save">Save</button></div>');
        // AUTO SCROLL FOR CHAT
        scrollThatStuff();
    }

    //======== ON CLICK SAVE 
    $(document).on("click", "#save", function(e) {

        e.preventDefault();
        message = $("#st").val();
        console.log("MESSAGE", message);

        // ============== THE FRONT END STUFF ===============
        $(".talk").append("<p class='user-answers'>" + $("#st").val() + "</p>");
        $("#inspireAction").remove();
        $("#st").remove();
        $(".st-form").remove();
        $(this).remove();
        scrollThatStuff();
        $(".talk").append(dotdot); // #1
        setTimeout(function() {
            $(".chatbox2").remove();
            chatTalk2("It's saved!", "chat");
            scrollThatStuff();
            $(".talk").append(dotdot); // #2
        }, 1000);
        temps = 0;
        doItLAter(theAddTag, 2000);

    });


    $(document).on("click", "#inspireAction", function() {
        $(".buttons").remove();
        $("#save").remove();
        $("#st").remove();
        $(".st-form").remove();
        $(this).remove();
        $(".chatbox2").remove();
        $(".talk").append("<p class='user-answers'>I don't know what to write, help me</p>");
        scrollThatStuff();
        $(".talk").append(dotdot);
        setTimeout(function() {
            $(".chatbox2").remove();
            random(chatBotInspireMe);
            chatTalk();
            temps = 0;
            $(".talk").append(dotdot);
            scrollThatStuff();
            doItLAter(theInspireQuotes, 2000);
        }, 2000);

    }); // on click #save

    // ======= INSPIRE QUOTE
    function theInspireQuotes() {
        $(".chatbox2").remove();
        random(chatBotInspireQuotes);
        chatTalk();
        scrollThatStuff();
        doItLAter(theMoreButtons, 600);
    }

    // ======= THE ADD TAG
    function theAddTag() {
        console.log('TAGSSSS', userTags);

        $(".chatbox2").remove();
        random(chatBotwhichTag);
        chatTalk();
        setTimeout(function() {
            $(".talk").append("<div class='buttons-tag'></div>");
            // DANGER ZONE DANGER ZONEDANGER ZONE　DANGER ZONE　
            // $(".buttons-tag").append("<div class='butts tags' id='tag1'><p>" + userTags[0] + "</p></div>");
            for (var i = 0; i < userTags.length; i++) {
                $(".buttons-tag").append("<div class='butts tags firsTag' id='firsTag" + (i + 1) + "'><p>" + userTags[i] + "</p></div>");
            }
            $(".buttons-tag").append("<div class='butts tags' id='new'><p>Add a new tag</p></div>");
            scrollThatStuff();
        }, 1000);
        scrollThatStuff();
    }

    $(document).on("click", ".firsTag", function() {
        var myTag = $(this).text();
        console.log("tag was undefined", myTag);
        $(".buttons-tag").remove();
        $(".talk").append(`<p class='user-answers'>${myTag}</p>`);
        $.ajax({
            url: "http://localhost:7777/comment",
            type: "POST",
            data: {
                message: message,
                tag: myTag,
                date: new Date()
            },
            success: function(response) {
                console.log("NEW TAGS ADDED", response);
                userQuotes = "";
                userTags = [];
                userQuotes = response.listUpdated.selfTalkMessages;
                userQuotes.forEach((quote) => {
                    userTags.push(quote.tag);
                    userTags = userTags.filter(function(item, index, inputArray) {
                        return inputArray.indexOf(item) == index;
                    });
                });
                console.log("NEW TAGS ADDED for real", userTags);
            },
            error: function(error) { console.log(error); }
        });
        scrollThatStuff();
        $(".talk").append(dotdot);
        setTimeout(function() {
            $(".chatbox2").remove();
            random(chatBotPositive);
            chatTalk();
            scrollThatStuff();
            temps = 0;
            doItLAter(thePostTextBoxButtons, 2000);
        }, 1000);
    });

    $(document).on("click", "#new", function() {
        console.log("in new tag button", message)
        $(".buttons-tag").remove();
        scrollThatStuff();
        // WAY TO ADD A NEW TAG GOES HERE!!!!!
        $(".talk").append('<div id="input-container"><input type="text" name="new-tag" id="new-tag" placeholder="Your new tag"><button type="submit" class="btn btn-save btn-hover" id="add">Add</button></div>');
        scrollThatStuff();
        temps = 0;
    });

    //======== ON CLICK ADD NEW TAG AJAX CALL
    $(document).on("click", "#add", function(e) {
        //add method post for all user data
        //when button saved prevents refreshing page and adds the value to message object,
        //created ajax method that will do post on /comment
        //sends message object val.
        console.log('MESSAGE AGAIN', message);
        console.log('MY MESSAGES!!!!', userQuotes);

        e.preventDefault();
        //adding to message array the tag.


        //============ AJAX CALL FOR FIRST TAG
        $.ajax({
            url: "http://localhost:7777/comment",
            type: "POST",
            data: {
                message: message,
                tag: $("#new-tag").val(),
                date: new Date()
            },
            success: function(response) {
                console.log("NEW TAGS ADDED", response);
                userQuotes = "";
                userTags = [];
                userQuotes = response.listUpdated.selfTalkMessages;

                userQuotes.forEach((quote) => {
                    userTags.push(quote.tag)
                    userTags = userTags.filter(function(item, index, inputArray) {
                        return inputArray.indexOf(item) == index;
                    });
                });
                console.log("NEW TAGS ADDED for real", userTags);
            },
            error: function(error) { console.log(error) }
        });
        // ADDING THE NEWLY GENERATED TAG
        $(".talk").append("<p class='user-answers'>" + $("#new-tag").val() + "</p>");
        $(".buttons-tag").remove();
        $("input").remove();
        $("#add").remove();
        $(".talk").append(dotdot);

        setTimeout(function() {
            $(".chatbox2").remove();
            chatTalk2("Your new tag has been saved.", "chat");
            scrollThatStuff();
        }, 1000);
        // SAYING IT'S DONE
        scrollThatStuff();
        doItLAter(thePostTextBoxButtons, 2000);
    });

    // ======= THE ONE MORE BUTTONS
    function theMoreButtons() {
        $(".talk").append("<div class='buttons'></div>");
        $(".buttons").append("<div class='butts btn-hover' id='more'><p>One more</p></div>");
        $(".buttons").append("<div class='butts btn-hover' id='ready'><p>I'm ready to write</p></div>");
        scrollThatStuff();
    }

    $(document).on("click", "#ready", function() {
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'>I'm ready to write</p>");
        temps = 0;
        scrollThatStuff();
        // $(".talk").append(dotdot);
        doItLAter(theLetsWrite, 2000);
        // Or it0s theTextBox
    });

    $(document).on("click", "#more", function() {
        $(".buttons").remove();
        $(".chatbox2").remove();
        $(".talk").append("<p class='user-answers'>One more</p>");
        scrollThatStuff();
        temps = 0;
        $(".talk").append(dotdot);
        doItLAter(theInspireQuotes, 1000);
    });

    // ======= THE POST TEXT BOX BUTTONS
    function thePostTextBoxButtons() {

        $(".buttons").remove();
        $(".chatbox2").remove();
        $(".talk").append("<div class='buttons'></div>");
        $(".buttons").append("<div class='butts btn-hover' id='seeyou'><p>See you</p></div>");
        $(".buttons").append("<div class='butts btn-hover' id='other'><p>I want to do something else</p></div>");
        $(".buttons").append("<div class='butts btn-hover' id='write'><p>I'll write more</p></div>");
        scrollThatStuff();
    }

    $(document).on("click", "#seeyou", function() {
        $(".buttons").remove();
        random(chatBotBye);
        chatTalk();
        temps = 0;
        scrollThatStuff();
        setTimeout(function() {
            $(".talk").append("<div class='buttons'></div>");
            $(".buttons").append("<div class='butts btn-hover' id='changemind'><p>Actually I still need you</p></div>");

            $(document).on("click", "#changemind", function() {
                $(".buttons").remove();
                $(".talk").append("<p class='user-answers'>Actually I still need you</p>");
                temps = 0;
                scrollThatStuff();
                $(".talk").append(dotdot);
                doItLAter(theLetsReconnect, 2500);
            });

        }, 1500);
    });

    function theLetsReconnect() {
        $(".chatbox2").remove();
        chatTalk2("Of course, what do you need?", "chat");
        scrollThatStuff();
        doItLAter(theOtherThing, 1000);
    }

    $(document).on("click", "#write", function() {
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'>I'll write more</p>");
        setTimeout(function() {
            random(chatBotLetsWrite);
            chatTalk();
            scrollThatStuff();
        }, 1000);
        temps = 0;
        scrollThatStuff();
        doItLAter(theTextBox, 1500);
    });

    $(document).on("click", "#other", function() {
        $(".buttons").remove();
        $(".talk").append(dotdot);
        setTimeout(function() {
            theOtherThing();
        }, 1000);
        scrollThatStuff();
    });

    function theOtherThing() {
        $(".chatbox2").remove();
        chatTalk2("What do you want to do?", "chat");
        temps = 0;
        setTimeout(function() {
            $(".talk").append("<div class='buttons'></div>");
            $(".buttons").append("<div class='butts btn-hover' id='tags'><p>See my entries by tags</p></div>");
            $(".buttons").append("<div class='butts btn-hover' id='inspireAction'><p>Show example of self help</p></div>");
            $(".buttons").append("<div class='butts btn-hover' id='write'><p>I'll write more</p></div>");
            scrollThatStuff();
        }, 1000);
    }


    // ======== TAGS SELECTION ============
    $(document).on("click", "#tags", function() {
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'>I want to see my entries by tags</p>");
        setTimeout(function() {
            $(".talk").append(dotdot);
            setTimeout(function() {
                $(".chatbox2").remove();
                chatTalk2("Choose the one you want to see", "chat");
                scrollThatStuff();
            }, 1000);
        }, 1000);

        temps = 0;
        scrollThatStuff();
        doItLAter(theTagsButtons, 3000); // it needs to be 3000 cause we already take 2000 with the others things and I wouldn't want 
    });

    function theTagsButtons() {
        $(".talk").append("<div class='buttons'></div>");
        for (var i = 0; i < userTags.length; i++) {
            $(".buttons").append("<div class='butts btn-hover tag' id='tag" + (i + 1) + "'><p>" + userTags[i] + "</p></div>");
            console.log("At least we get to thtagsbuttons", userTags[i]);
        }
        $(".buttons").append("<div class='butts btn-hover' id='forget'><p>Forget that</p></div>");
        scrollThatStuff();
    }



    // ======== TAGS DISPLAY ============

    // HERE I'M GRABBING BY ID THAT NEED TO BE DYNAMICALLY GENERATED
    $(document).on("click", ".tag", function() {
        $(".buttons").remove();
        $("#list-st").remove();
        $("#list-head").remove();

        console.log('TAGGGGG', $(this)[0]);
        $(".talk").append("<p class='user-answers'>" + $(this)[0].innerText + "</p>");
        //$(".talk").append(dotdot);
        //setTimeout(function() {
        //setTimeout(function() {
        $(".talk").append(dotdot);
        $(".talk").append("<div class='chatbox' id='list-head'><img src='../img/tinyhead.png'><p class='chat-answers' id='list-st'></p></div>");
        userQuotes.forEach((quote) => {
            console.log(quote);
            if (quote.tag === $(this)[0].innerText) {
                $(".chatbox2").remove();
                console.log(quote.message);
                // chatTalk2(quote.message, "chat");
                $("#list-st").append(quote.message + "</br>");
                scrollThatStuff();
            }
        });
        //}, 1000);
        //}, 1000);
        temps = 0;
        scrollThatStuff();
        doItLAter(thePostTextBoxButtons, 1500);
    });

    // ======== TAGS Cancel ============
    $(document).on("click", "#forget", function() {
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'>Forget that</p>");
        $(".talk").append(dotdot);
        setTimeout(function() {
            $(".chatbox2").remove();
            chatTalk2("Ok", "chat");
            scrollThatStuff();
        }, 1000);
        temps = 0;
        scrollThatStuff();
        doItLAter(thePostTextBoxButtons, 1500);
    });
    // } // closing the firsttime == false if statement




});