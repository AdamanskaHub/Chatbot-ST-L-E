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
     $.ajax({
         //get the route from route index.js chatbot
       url: "http://localhost:7777/chatbot",
       type: "get",
       success: function(response){
           chatBotGreetings = response.theSchemaOfTheChatBot[0].greeting;
           chatBotMessage = response.theSchemaOfTheChatBot[0].messages;
         console.log(response.theSchemaOfTheChatBot[0].greeting);         
       },
       error: function(error){console.log(error)}
     })


// =========================== DISPLAY THE TEXT ===========================

$(document).ready(function() {

    function a() {
        random(chatBotGreetings);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
    }

    function b() {
        random(chatBotMessage);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
    }

    function c() {
        $(".talk").append("<div class='buttons'></div>");
        $(".buttons").append("<div class='butts' id='pos'><p>YES</p></div>");
        $(".buttons").append("<div class='butts' id='neg'><p>Hell no!</p></div>");
    }

    $(document).on("click", "#pos", function() {
        console.log("button clicked");
        $(this).remove();
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'> Yes</p>");
        temps = 0;
        doItLAter(d, 2000);
    });

    function d() {
        random(chatBotMessage);
        $(".talk").append("<p class='user-answers'>" + selected + "</p>");
    }

    function e() {
        $(".talk").append('<div class="st-form"> <textarea type="text" class="st-box" id="st" placeholder="Your positive self talk" name="st"></textarea></div><button type="submit" class="btn btn-save">Save</button>');
    }

    doItLAter(a, 2000);
    doItLAter(b, 2000);
    doItLAter(c, 2000);
    doItLAter(d, 2000);
    
});
