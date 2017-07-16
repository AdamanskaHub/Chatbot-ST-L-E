// =========================== APP LOGIC ===========================


var thefuckingtext = {
    greeting: ["13413", "rr43532r4", "r43ur827093", "43829743981"],
    sentenceTwo: ["DDDDDDDD", "GGGGGGGGG", "FFFFFFFF", "Laura"]

};


var selected;

function random(param) {
    selected = param[Math.floor(Math.random() * param.length)];
}



// =========================== DISPLAY THE TEXT ===========================

$(document).ready(function() {

    random(thefuckingtext.greeting);
    $(".talk").append("<p>" + selected + "</p>");


    setTimeout(function() {
        random(thefuckingtext.sentenceTwo);
        $(".talk").append("<p>" + selected + "</p>");
    }, 3000);


    setTimeout(function() {
        $(".talk").append("<button>YES</button>");
        $(".talk").append("<button>Hell no!</button>");
    }, 4500);
});