console.log("the main.js is happening");

$(document).ready(function() {
    $(".talk").append("<p>Some text that has been appended</p>");
    console.log("the main.js is happening on document ready");
    setTimeout(function() {
        $(".talk").append("<p>Do you want work work work work work?</p>");
    }, 3000);

    setTimeout(function() {
        $(".talk").append("<button>YES</button>");
        $(".talk").append("<button>Hell no!</button>");
    }, 6000);
});