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

let chatBotGreetings;
let chatBotMessage;
let chatBotOther;
let chatBotLetsWrite;

$.ajax({
    //get the route from route index.js chatbot
    url: "http://localhost:7777/chatbot",
    type: "get",
    success: function(response) {
        chatBotGreetings = response.bot[0].greeting;
        chatBotMessage = response.bot[0].message;
        console.log(response.bot[0].letsWrite);
        chatBotOther = response.bot[0].otherThings;
        chatBotLetsWrite = response.bot[0].letsWrite;
    },
    error: function(error) { console.log(error); }
});


// =========================== DISPLAY THE TEXT ===========================

$(document).ready(function() {

    // ========== GREETING
    function theGreeting() {
        random(chatBotGreetings);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
    }
    doItLAter(theGreeting, 2000);

    // ======= LETS WRITE
    function theLetsWrite() {
        random(chatBotLetsWrite);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
    }
    doItLAter(theLetsWrite, 2000);

    // ======= THE TEXT BOX

    function theTextBox() {
        $(".talk").append('<div class="st-form"> <textarea type="text" class="st-box" id="st" placeholder="Your positive self talk" name="st"></textarea></div><button class="btn btn-save" id="inspireAction">I don\'t know what to write</button><button type="submit" class="btn btn-save" id="save">Save</button>');
    }

    $(document).on("click", "#save", function() {
        console.log($("#st").val());
        $("#inspireAction").remove();
        $("#st").remove();
        $(this).remove();
        $(".talk").append("<p class='chat-answers'>It's saved!</p>");
        temps = 0;
        doItLAter(theAddTags, 2000);
    }); // on click #save

    $(document).on("click", "#inspireAction", function() {
        $("#save").remove();
        $("#st").remove();
        $(this).remove();
        random(chatBotInspireMe);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
        temps = 0;
        doItLAter(theInspireQuotes, 2000);
    }); // on click #save

    // ======= INSPIRE QUOTE
    function theInspireQuotes() {
        random(chatBotInspireQuotes);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
        doItLAter(theMoreButtons, 2000);
    }

    // ======= THE ADD TAG
    function theAddTag() {
        random(chatBotLetsTag);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
        $(".talk").append("<div class='buttons'></div>");
        $(".buttons").append("<div class='tags' id='1'><p>Tag1</p></div>");
        $(".buttons").append("<div class='tags' id='2'><p>tag2</p></div>")
    }

    $(document).on("click", "#1", function() {
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'>Tagged as THE TAG DYNAMICALLY GENERATED</p>");
        temps = 0;
        doItLAter(thePostTextBoxButtons, 2000);
    });

    $(document).on("click", "#2", function() {
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'>Tagged as THE TAG DYNAMICALLY GENERATED</p>");
        temps = 0;
        doItLAter(thePostTextBoxButtons, 2000);
    });


    // ======= THE ONE MORE BUTTONS
    function theMoreButtons() {
        $(".talk").append("<div class='buttons'></div>");
        $(".buttons").append("<div class='butts' id='more'><p>One more</p></div>");
        $(".buttons").append("<div class='butts' id='ready'><p>I'm ready to write</p></div>");
    }

    $(document).on("click", "#ready", function() {
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'>I'm ready to write</p>");
        temps = 0;
        doItLAter(theTextBox, 2000);
    });

    $(document).on("click", "#more", function() {
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'>One more</p>");
        temps = 0;
        doItLAter(theInspireQuotes, 2000);
    });

    // ======= THE POST TEXT BOX BUTTONS
    function thePostTextBoxButtons() {
        $(".talk").append("<div class='buttons'></div>");
        $(".buttons").append("<div class='butts' id='seeyou'><p>See you</p></div>");
        $(".buttons").append("<div class='butts' id='other'><p>I want to do something else</p></div>");
        $(".buttons").append("<div class='butts' id='write'><p>I'll write more</p></div>");
    }

    $(document).on("click", "#seeyou", function() {
        $(".buttons").remove();
        random(chatBotBye);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
        temps = 0;
        // doItLAter(e, 2000);
    });

    $(document).on("click", "#write", function() {
        $(".buttons").remove();
        random(chatBotLetsWrite);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
        temps = 0;
        doItLAter(theTextBox, 2000);
    });



    // ======= THE BUTTONS
    function theButtons() {
        $(".talk").append("<div class='buttons'></div>");
        $(".buttons").append("<div class='butts' id='pos'><p>YES</p></div>");
        $(".buttons").append("<div class='butts' id='neg'><p>Hell no!</p></div>");
    }
    doItLAter(theButtons, 2000);

    $(document).on("click", "#pos", function() {
        console.log("button clicked");
        $(this).remove();
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'> Yes</p>");
        temps = 0;
        doItLAter(e, 2000);
    });

    $(document).on("click", "#neg", function() {
        console.log("button clicked");
        $(this).remove();
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'> NOPE</p>");
        temps = 0;
        doItLAter(theTextBox, 2000);
    });

    // ====== OTHER THINGS
    function d() {
        random(chatBotOther);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
    }
    //doItLAter(d, 2000);

}); // document ready closing