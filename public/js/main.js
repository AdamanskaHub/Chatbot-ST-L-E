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
$.ajax({
    //get the route from route index.js chatbot
    url: "http://localhost:7777/chatbot",
    type: "get",
    success: function(response) {
        chatBotGreetings = response.bot[0].greeting;
        chatBotMessage = response.bot[0].message;
        console.log(response.bot[0].message);
        chatBotOther = response.bot[0].otherThings;
    },
    error: function(error) { console.log(error) }
});


// =========================== DISPLAY THE TEXT ===========================

$(document).ready(function() {

    function a() {
        random(chatBotGreetings);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
    }
    doItLAter(a, 2000);

    function b() {
        random(chatBotMessage);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
    }
    doItLAter(b, 2000);

    function c() {
        $(".talk").append("<div class='buttons'></div>");
        $(".buttons").append("<div class='butts' id='pos'><p>YES</p></div>");
        $(".buttons").append("<div class='butts' id='neg'><p>Hell no!</p></div>");
    }
    doItLAter(c, 2000);

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
        doItLAter(e, 2000);
    });

    function d() {
        random(chatBotOther);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
    }
    //doItLAter(d, 2000);

    function e() {
        $(".talk").append('<div class="st-form"> <textarea type="text" class="st-box" id="st" placeholder="Your positive self talk" name="st"></textarea></div><button class="btn btn-save" id="inspireAction">I don\'t know what to write</button><button type="submit" class="btn btn-save" id="save">Save</button>');
    }

    $(document).on("click", "#save", function() {
        console.log($("#st").val());
        $("#inspireAction").remove();
        $("#st").remove();
        $(this).remove();
        $(".talk").append("<p class='chat-answers'> Yes I have saved the thing</p>");
        temps = 0;
        doItLAter(d, 2000);
    });


});