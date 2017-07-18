// =========================== APP LOGIC ===========================

var selected;

function random(param) {
    selected = param[Math.floor(Math.random() * param.length)];
}

var temps = 0;

function doItLAter(fct, time) {
    temps += time;
    console.log(temps);
    setTimeout(function () {
        fct();
    }, temps);
}

function scrollThatStuff() {
    $('.talk').animate({
        scrollTop: $('.talk').get(0).scrollHeight
    }, 2000);
}
//chatbot call
let chatBotGreetings;
let chatBotMessage;
let chatBotOther;
let chatBotLetsWrite;
let chatBotInspireMe;
let chatBotInspireQuotes;
let chatBotwhichTag;
let chatBotPositive;

$.ajax({
    //get the route from route index.js chatbot
    url: "http://localhost:7777/chatbot",
    type: "get",
    success: function (response) {
        chatBotGreetings = response.bot[0].greeting;
        chatBotMessage = response.bot[0].message;
        chatBotOther = response.bot[0].otherThings;
        chatBotLetsWrite = response.bot[0].letsWrite;
        chatBotInspireMe = response.bot[0].inspireMe;
        chatBotInspireQuotes = response.bot[0].inspireQuotes;
        chatBotwhichTag = response.bot[0].whichTag;
        chatBotPositive = response.bot[0].positiveM;
    },
    error: function (error) { console.log(error); }
});

// =========================== DISPLAY THE TEXT ===========================

$(document).ready(function () {

    var message = "initial value";

    $("#self").click(function (event) {
        console.log('form');
        event.preventDefault();
    });

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
        scrollThatStuff();
        temps = 0;
        doItLAter(theTextBox, 2000);
    }
    doItLAter(theLetsWrite, 2000);

    // ======= THE TEXT BOX

    function theTextBox() {
        $(".buttons").remove();
        $(".talk").append('<div class="st-form"> <textarea type="text" class="st-box" id="st" placeholder="Your positive self talk" name="st"></textarea></div><div class="buttons"><button class="btn btn-save" id="inspireAction">I don\'t know what to write</button><button type="submit" class="btn btn-save" id="save">Save</button></div>');
        // AUTO SCROLL FOR CHAT
        scrollThatStuff();
    }
    //======== ON CLICK SAVE TEXTAREA 
    $(document).on("click", "#save", function (e) {
        e.preventDefault();
        message = {
            text: $("#st").val(),
            date: new Date()
        };
        console.log("MESSAGE", message);
      
        $(".talk").append("<p class='user-answers'>" + $("#st").val() + "</p>");
        $("#inspireAction").remove();
        $("#st").remove();
        $(".st-form").remove();
        $(this).remove();
        scrollThatStuff();
        setTimeout(function () {
            $(".talk").append("<p class='chat-answers'>It's saved!</p>");
            scrollThatStuff();
        }, 1000);
        temps = 0;
        doItLAter(theAddTag, 2000);

    });


    $(document).on("click", "#inspireAction", function () {
        $(".buttons").remove();
        $("#save").remove();
        $("#st").remove();
        $(".st-form").remove();
        $(this).remove();
        $(".talk").append("<p class='user-answers'>I don\'t know what to write</p>");
        scrollThatStuff();
        random(chatBotInspireMe);
        setTimeout(function () {
            $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
            temps = 0;
            scrollThatStuff();
            doItLAter(theInspireQuotes, 2000);
        }, 2000);

    }); // on click #save

    // ======= INSPIRE QUOTE
    function theInspireQuotes() {
        random(chatBotInspireQuotes);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
        scrollThatStuff();
        doItLAter(theMoreButtons, 2000);
    }

    // ======= THE ADD TAG
    function theAddTag() {
        console.log("add tag", message)
        random(chatBotwhichTag);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
        setTimeout(function () {
            $(".talk").append("<div class='buttons-tag'></div>");
            $(".buttons-tag").append("<div class='butts tags' id='tag1'><p>Tag1</p></div>");
            $(".buttons-tag").append("<div class='butts tags' id='tag2'><p>tag2</p></div>");
            $(".buttons-tag").append("<div class='butts tags' id='new'><p>Add a new tag</p></div>");
            scrollThatStuff();
        }, 1000);
        scrollThatStuff();
        // IF NUMBER OF TAGS > 6 ===> fuck this no add
    }

    $(document).on("click", "#tag1", function () {
        $(".buttons-tag").remove();
        $(".talk").append("<p class='user-answers'>We need to grab the name of the tag and put it here!</p>");
        scrollThatStuff();
        random(chatBotPositive);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
        scrollThatStuff();
        temps = 0;
        doItLAter(thePostTextBoxButtons, 2000);
    });

    $(document).on("click", "#tag2", function () {
        $(".buttons-tag").remove();
        $(".talk").append("<p class='user-answers'>We need to grab the name of the tag and put it here!</p>");
        scrollThatStuff();
        random(chatBotPositive);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
        scrollThatStuff();
        temps = 0;
        doItLAter(thePostTextBoxButtons, 2000);
    });

    $(document).on("click", "#new", function () {
        console.log("in new tag button", message)
        $(".buttons-tag").remove();
        // WAY TO ADD A NEW TAG GOES HERE!!!!!
        $(".talk").append('<div id="input-container"><input type="text" name="new-tag" id="new-tag" placeholder="Your new tag"><button type="submit" class="btn btn-save" id="add">Add</button></div>');
        scrollThatStuff();
        temps = 0;
    });

    //======== ON CLICK ADD NEW TAG AJAX CALL
    $(document).on("click", "#add", function (e) {
        //add method post for all user data
        //when button saved prevents refreshing page and adds the value to message object,
        //created ajax method that will do post on /comment
        //sends message object val.
        console.log('MESSAGE AGAIN', message);

        e.preventDefault();
        //adding to message array the tag.
        message.tag = $("#new-tag").val(),

            console.log("MESSAGE", message);

        $.ajax({
            url: "http://localhost:7777/comment",
            type: "POST",
            data: { message },
            success: function (response) {
                console.log(response);
            },
            error: function (error) { console.log(error) }
        });
        // ADDING THE NEWLY GENERATED TAG
        $(".talk").append("<p class='user-answers'>" + $("#new-tag").val() + "</p>");
        $(".buttons-tag").remove();
        $("input").remove();
        $("#add").remove();

        setTimeout(function () {
            $(".talk").append("<p class='chat-answers'>Your new tag has been saved.</p>");
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

    $(document).on("click", "#ready", function () {
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'>I'm ready to write</p>");
        temps = 0;
        scrollThatStuff();
        doItLAter(theTextBox, 2000);
    });

    $(document).on("click", "#more", function () {
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'>One more</p>");
        scrollThatStuff();
        temps = 0;
        doItLAter(theInspireQuotes, 0);
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

    $(document).on("click", "#seeyou", function () {
        $(".buttons").remove();
        random(chatBotBye);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
        temps = 0;
        scrollThatStuff();
        // CLOSE THE APP SOMEHOW
    });

    $(document).on("click", "#write", function () {
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'>I'll write more</p>");
        setTimeout(function () {
            random(chatBotLetsWrite);
            $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
            scrollThatStuff();
        }, 1000);
        temps = 0;
        scrollThatStuff();
        doItLAter(theTextBox, 1500);
    });

    $(document).on("click", "#other", function () {
        $(".buttons").remove();
        $(".talk").append("<p class='chat-answers'>What do you want to do?</p>");
        temps = 0;
        setTimeout(function () {
            $(".talk").append("<div class='buttons'></div>");
            $(".buttons").append("<div class='butts' id='tags'><p>See my entries by tags</p></div>");
            $(".buttons").append("<div class='butts' id='inspireAction'><p>Show example of self help</p></div>");
            $(".buttons").append("<div class='butts' id='write'><p>I'll write more</p></div>");
            scrollThatStuff();
        }, 1000);
        scrollThatStuff();
    });

    // ======= THE BUTTONS
    function theButtons() {
        $(".talk").append("<div class='buttons'></div>");
        $(".buttons").append("<div class='butts' id='pos'><p>YES</p></div>");
        $(".buttons").append("<div class='butts' id='neg'><p>Hell no!</p></div>");
        scrollThatStuff();
    }

    $(document).on("click", "#pos", function () {
        console.log("button clicked");
        $(this).remove();
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'> Yes</p>");
        temps = 0;
        doItLAter(e, 2000);
    });

    $(document).on("click", "#neg", function () {
        console.log("button clicked");
        $(this).remove();
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'> NOPE</p>");
        scrollThatStuff();
        temps = 0;
        doItLAter(theTextBox, 2000);
    });

    // ====== OTHER THINGS
    function d() {
        random(chatBotOther);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
        scrollThatStuff();
    }

});