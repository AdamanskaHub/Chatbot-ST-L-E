// =========================== APP LOGIC ===========================


var thefuckingtext = {
    greeting: ["13413", "rr43532r4", "r43ur827093", "43829743981"],
    sentenceTwo: ["DDDDDDDD", "GGGGGGGGG", "FFFFFFFF", "Laura"],
    aaa: ["D.va", "Sombra", "Tracer"]
};


var selected;

function random(param) {
    selected = param[Math.floor(Math.random() * param.length)];
}

var temps = 0;

function doItLAter(fct, time) {
    temps += time;
    setTimeout(function() {
        fct();
    }, temps);
}



// =========================== DISPLAY THE TEXT ===========================

$(document).ready(function() {

    function a() {
        random(thefuckingtext.greeting);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
    }

    function b() {
        random(thefuckingtext.sentenceTwo);
        $(".talk").append("<p class='chat-answers'>" + selected + "</p>");
    }

    function c() {
        $(".talk").append("<div class='buttons'></div>");
        $(".buttons").append("<div class='butts'>YES</div>");
        $(".buttons").append("<div class='butts'>Hell no!</div>");
    }

    function d() {
        random(thefuckingtext.aaa);
        $(".talk").append("<p class='user-answers'>" + selected + "</p>");
    }

    doItLAter(a, 2000);
    doItLAter(b, 2000);
    doItLAter(c, 2000);
    doItLAter(d, 2000);
    // random(thefuckingtext.greeting);
    // $(".talk").append("<p>" + selected + "</p>");


    // setTimeout(function() {
    //     random(thefuckingtext.sentenceTwo);
    //     $(".talk").append("<p>" + selected + "</p>");
    // }, 3000);


    // setTimeout(function() {
    //     $(".talk").append("<button>YES</button>");
    //     $(".talk").append("<button>Hell no!</button>");
    // }, 4500);

    // Callback hell working just fine

    // function1 = function(cb) {
    //     random(thefuckingtext.greeting);
    //     $(".talk").append("<p>" + selected + "</p>");
    //     cb();
    // };

    // function2 = function() {
    //     random(thefuckingtext.sentenceTwo);
    //     $(".talk").append("<p>" + selected + "</p>");
    // };

    // setTimeout(function() {
    //     function1(function2);
    // }, 6000);

    // var d1 = $.Deferred();
    // var d2 = $.Deferred();
    // var d3 = $.Deferred();

    // $.when(d1, d2, d3).done(function(v1, v2, v3) {
    //     random(thefuckingtext.aaa);
    //     setTimeout(function() {
    //         $(".talk").append("<p>" + selected + "</p>");
    //     }, 4500);
    //     console.log(v2); // v2 is "abc"
    //     console.log(v3); // v3 is an array [ 1, 2, 3, 4, 5 ]
    // });


    // d1.resolve();

    // d2.resolve();
    // d3.resolve("1, 2, 3, 4, 5");




    // function x() {
    //     setTimeout(function() {
    //         console.log("this is x");
    //     }, 5000);
    // }
    // x();

    // $.when(x).then(function(x) {
    //     random(thefuckingtext.aaa);
    //     setTimeout(function() {
    //         //$(".talk").append("<p>" + selected + "</p>");
    //         console.log("the thing that should resolve");
    //     }, 3000);
    // });




    // var r;
    // var s = setTimeout(function s() {
    //     r = function a() {
    //         console.log("this is a");
    //     }
    //     r();
    // }, 4000);

    // $.when(r).then(function c() {
    //     console.log("UUUUUUUU");
    // });



    // function a() {
    //     console.log("this is a");
    // }

    // function b() {
    //     console.log("this is b");
    // }

    // function c() {
    //     console.log("this is c");
    // }

    // doItLAter(a, 2000);
    // doItLAter(b, 2000);
    // doItLAter(c, 2000);

});