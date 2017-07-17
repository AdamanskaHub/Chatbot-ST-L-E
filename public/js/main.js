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
//chatbot call
let chatBotGreetings;
let chatBotMessage;
$.ajax({
    //get the route from route index.js chatbot
    url: "http://localhost:7777/chatbot",
    type: "get",
    success: function (response) {
        chatBotGreetings = response.bot[0].greeting;
        chatBotMessage = response.bot[0].writeMessage;
        console.log(response.bot[0].writeMessage);
    },
    error: function (error) { console.log(error) }
});

// =========================== DISPLAY THE TEXT ===========================

$(document).ready(function () {


    $("#self").click(function (event) {
        console.log('form');
        event.preventDefault();
    });
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

    $(document).on("click", "#pos", function () {
        console.log("button clicked");
        $(this).remove();
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'> Yes</p>");
        temps = 0;
        doItLAter(e, 2000);
    });

    $(document).on("click", "#pos", function () {
        console.log("button clicked");
        $(this).remove();
        $(".buttons").remove();
        $(".talk").append("<p class='user-answers'> NOPE</p>");
        temps = 0;
        doItLAter(e, 2000);
    });

    function d() {
        random(chatBotMessage);
        $(".talk").append("<p class='user-answers'>" + selected + "</p>");
    }
    //doItLAter(d, 2000);

    function e() {
        //add method post for all user data
        $(".talk").append('<form id="self" action="/comment" method="POST"> <div class="st-form"><textarea type="text" class="st-box" id="selfTalk" placeholder="Your positive self talk" name="selfTalk"></textarea></div><button type="button" id="addComment" class="btn btn-save">Save</button></form>');
        //when button saved prevents refreshing page and adds the value to message object,
        //created ajax method that will do post on /comment
        //sends message object val.
        $(".btn-save").click(function (e) {
            console.log('wgsggwgwgwg');

            e.preventDefault();
            e.stopPropagation()
            var message = {
                text: $("#selfTalk").val(),
                tag: "TEST-TAG",
                date: Date
            }
            console.log("MESSAGE", message);
            $.ajax({
                //get the route from route index.js chatbot
                url: "http://localhost:7777/comment",
                type: "POST",
                data: { message },
                success: function (response) {
                    //remove text area add text
                    $("#selfTalk").val("");
                    console.log(response);
                },
                error: function (error) { console.log(error) }
            });
        })
    }






});