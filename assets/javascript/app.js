// VARIABLES

var myApiKey = "y5fd6BmElSM3UPPatTgJh0kmpD3Ug60X";
var arrTopics = ["cat", "dog", "bunny", "bird"];
const $buttonSection = $("#button-container");
const $gifSection = $("#gif-container");

// FUNCTIONS

function makeButtons() {
    // create a button for each string in topic array
    for (topic of arrTopics) {
        $buttonSection.append($("<button>").attr({
            class: "btn btn-lg btn-primary px-3 m-2",
            id: arrTopics.indexOf(topic)
        }).text(topic));
    }
}


// INITIALIZE
// $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
// })

makeButtons();

$("#main-container").on("click", ".btn", function () {

    let $buttonText = $(this).text();

    let queryURL =
        "http://api.giphy.com/v1/gifs/search?q=" + $buttonText +
        "&api_key=" + myApiKey +
        "&limit=5";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // do stuff after getting back response 
        for (gif of response.data) {
            let $gifWrapper = $("<div>").attr({
                "class": "d-inline-block text-left p-1"
            });
            let $img = $("<img/>").attr({
                "id": response.data.indexOf(gif),
                "class": "gif rounded",
                "src": gif.images.fixed_height.url,
                "alt": gif.title,
                "giphy-rating": gif.rating,
                "data-animate-url": gif.images.fixed_height.url,
                "data-still-url": gif.images.fixed_height_still.url,
                "data-state": "animated",
                "title": gif.rating
            });

            $gifWrapper.append($("<p>").attr("class", "pb-1").text("Rating: " + gif.rating));
            $gifWrapper.append($img);
            $gifSection.prepend($gifWrapper);
        }
    });
});

$("#gif-container").on("click", ".gif", function () {
    let state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate-url"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).attr("data-still-url"));
        $(this).attr("data-state", "still");
    }

});