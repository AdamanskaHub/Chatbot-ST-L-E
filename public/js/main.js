// =========================== APP LOGIC ===========================

var selected;

function random(param) {
    selected = param[Math.floor(Math.random() * param.length)];
}

var temps = 0;

function doItLAter(fct, time) {
    temps += time;
    console.log(temps);
    setTimeout(function() {
        fct();
    }, temps);
}

function chatTalk() {
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
//user calls
let userQuotes;
let userTags;

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
    },
    error: function(error) { console.log(error); }
});


$.ajax({
    //get the route from route index.js chatbot
    url: "http://localhost:7777/user",
    type: "get",
    success: function (response) {
        console.log('FRONT', response.userPrint.selfTalkMessages);
        userQuotes = response.userPrint.selfTalkMessages;
        userQuotes.forEach((quote)=>{
            if (quote.tag === "marc") {
                console.log("THIS IS THE MESSAGE", quote.message)
            }
        })
        // chatBotGreetings = response.bot[0].greeting;
        // chatBotMessage = response.bot[0].message;
        // chatBotOther = response.bot[0].otherThings;
        // chatBotLetsWrite = response.bot[0].letsWrite;
        // chatBotInspireMe = response.bot[0].inspireMe;
        // chatBotInspireQuotes = response.bot[0].inspireQuotes;
        // chatBotwhichTag = response.bot[0].whichTag;
        // chatBotPositive = response.bot[0].positiveM;
    },
    error: function (error) { console.log(error); }
});


// =========================== DISPLAY THE TEXT ===========================

$(document).ready(function() {

    var message = "initial value";

    $("#self").click(function(event) {
        console.log('form');
        event.preventDefault();
    });

    $(".talk").append(dotdot);
    // ========== GREETING
    function theGreeting() {
        $(".chatbox2").remove();
        random(chatBotGreetings);
        chatTalk();

    }
    doItLAter(theGreeting, 2000);

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
    doItLAter(theLetsWrite, 2000);

    // ======= THE TEXT BOX

    function theTextBox() {
        $(".buttons").remove();
        $(".talk").append('<div class="st-form"> <textarea type="text" class="st-box" id="st" placeholder="Your positive self talk" name="st"></textarea></div><div class="buttons"><button class="btn btn-save" id="inspireAction">I don\'t know what to write</button><button type="submit" class="btn btn-save" id="save">Save</button></div>');
        // AUTO SCROLL FOR CHAT
        scrollThatStuff();
    }

    //======== ON CLICK SAVE 
    $(document).on("click", "#save", function(e) {

        e.preventDefault();
        message = $("#st").val();
        console.log("MESSAGE", message);
        $.ajax({
            //get the route from route index.js chatbot
            url: "http://localhost:7777/comment",
            type: "POST",
            data: { message },
            success: function(response) {
                console.log(response);
            },
            error: function(error) { console.log(error) }
        });

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
        $(".chatbox2").remove();
        random(chatBotwhichTag);
        chatTalk();
        setTimeout(function() {
            $(".talk").append("<div class='buttons-tag'></div>");
            $(".buttons-tag").append("<div class='butts tags' id='tag1'><p>Tag1</p></div>");
            $(".buttons-tag").append("<div class='butts tags' id='new'><p>Add a new tag</p></div>");
            scrollThatStuff();
        }, 1000);
        scrollThatStuff();
        // IF NUMBER OF TAGS > 6 ===> fuck this no add
    }

    $(document).on("click", "#tag1", function() {
        $(".buttons-tag").remove();
        $(".talk").append("<p class='user-answers'>We need to grab the name of the tag and put it here!</p>");
        scrollThatStuff();
        random(chatBotPositive);
        chatTalk();
        scrollThatStuff();
        temps = 0;
        doItLAter(thePostTextBoxButtons, 2000);
    });

    $(document).on("click", "#new", function() {
        console.log("in new tag button", message)
        $(".buttons-tag").remove();
        // WAY TO ADD A NEW TAG GOES HERE!!!!!
        $(".talk").append('<div id="input-container"><input type="text" name="new-tag" id="new-tag" placeholder="Your new tag"><button type="submit" class="btn btn-save" id="add">Add</button></div>');
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

        e.preventDefault();
        //adding to message array the tag.


        $.ajax({
            url: "http://localhost:7777/comment",
            type: "POST",
            data: { message: message,
                    tag: $("#new-tag").val(),
                    date: new Date() },
            success: function (response) {
                console.log(response);
            },
            error: function(error) { console.log(error) }
        });
        // ADDING THE NEWLY GENERATED TAG
        $(".talk").append("<p class='user-answers'>" + $("#new-tag").val() + "</p>");
        $(".buttons-tag").remove();
        $("input").remove();
        $("#add").remove();

        setTimeout(function() {
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
        $(".buttons").append("<div class='butts' id='more'><p>One more</p></div>");
        $(".buttons").append("<div class='butts' id='ready'><p>I'm ready to write</p></div>");
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
        $(".talk").append("<div class='buttons'></div>");
        $(".buttons").append("<div class='butts' id='seeyou'><p>See you</p></div>");
        $(".buttons").append("<div class='butts' id='other'><p>I want to do something else</p></div>");
        $(".buttons").append("<div class='butts' id='write'><p>I'll write more</p></div>");
        scrollThatStuff();
    }

    $(document).on("click", "#seeyou", function() {
        $(".buttons").remove();
        random(chatBotBye);
        chatTalk();
        temps = 0;
        scrollThatStuff();
        // CLOSE THE APP SOMEHOW
    });

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
        chatTalk2("What do you want to do?", "chat");
        temps = 0;
        setTimeout(function() {
            $(".talk").append("<div class='buttons'></div>");
            $(".buttons").append("<div class='butts' id='tags'><p>See my entries by tags</p></div>");
            $(".buttons").append("<div class='butts' id='inspireAction'><p>Show example of self help</p></div>");
            $(".buttons").append("<div class='butts' id='write'><p>I'll write more</p></div>");
            scrollThatStuff();
        }, 1000);
        scrollThatStuff();
    });



    // // ======= THE BUTTONS
    // function theButtons() {
    //     $(".talk").append("<div class='buttons'></div>");
    //     $(".buttons").append("<div class='butts' id='pos'><p>YES</p></div>");
    //     $(".buttons").append("<div class='butts' id='neg'><p>Hell no!</p></div>");
    //     scrollThatStuff();
    // }
    // // doItLAter(theButtons, 2000);

    // $(document).on("click", "#pos", function() {
    //     console.log("button clicked");
    //     $(this).remove();
    //     $(".buttons").remove();
    //     $(".talk").append("<p class='user-answers'>Yes</p>");
    //     temps = 0;
    //     doItLAter(e, 2000);
    // });

    // $(document).on("click", "#neg", function() {
    //     console.log("button clicked");
    //     $(this).remove();
    //     $(".buttons").remove();
    //     $(".talk").append("<p class='user-answers'>Nope</p>");
    //     scrollThatStuff();
    //     temps = 0;
    //     doItLAter(theTextBox, 2000);
    // });

    // ====== OTHER THINGS
    // function d() {
    //     random(chatBotOther);
    //     chatTalk();
    //     scrollThatStuff();
    // }


    //add method post for all user data
    //when button saved prevents refreshing page and adds the value to message object,
    //created ajax method that will do post on /comment
    //sends message object val.
    // on click #save



    if (firstTime) {





    }

}); // end of doc ready