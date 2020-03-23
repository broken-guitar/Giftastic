// VARIABLES

var myApiKey = "y5fd6BmElSM3UPPatTgJh0kmpD3Ug60X";
var arrTopics = ["cat", "dog", "bunny", "bird", "social distancing"];
const $buttonSection = $("#button-container");
const $gifSection = $("#gif-container");

// FUNCTIONS

function makeButtons() {
    // create a button for each string in topic array
    for (topic of arrTopics) {
        $buttonSection.append($("<button>").attr({
            class: "gif-btn btn btn-lg btn-outline-light px-3 m-2",
            id: arrTopics.indexOf(topic)
        }).text(topic));
    }
}

function addButton(newButtonText) {
    $buttonSection.append($("<button>").attr({
        class: "gif-btn btn btn-lg btn-outline-light px-3 m-2",
        id: "added-" + newButtonText + Date().toString()
    }).text(newButtonText));
};

function getGifs(searchTerm) {
    let dynamicRating = "g";
    if (searchTerm == "bunny") {
        dynamicRating = "pg-13";
    } else {
        dynamicRating = "g";
    };
    let queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" + searchTerm +
        "&api_key=" + myApiKey +
        "&rating=" + dynamicRating +
        "&limit=5";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
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

            $gifWrapper.append($("<p>").attr("class", "pb-1").text("Rating: " + gif.rating.toUpperCase()));
            $gifWrapper.append($img);
            $gifSection.prepend($gifWrapper);
        }
    });
}


// INITIALIZE

makeButtons();

$("#main-container").on("click", ".gif-btn", function () {

    let buttonText = $(this).text();

    getGifs(buttonText)

});

$("#gif-container").on("click", ".gif", function (event) {
    event.preventDefault();
    let state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate-url"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).attr("data-still-url"));
        $(this).attr("data-state", "still");
    }

});

$("#add-button").on("click", function (event) {
    event.preventDefault();
    // console.log("add-button was clicked");
    let inputText = $("#input-topic").val().trim();
    if (inputText == null || inputText == "") {
        // console.log("empty! ", inputText)
    } else {
        // console.log("not empty: ", inputText)

        addButton(inputText);
        $("#input-topic").val("");
    }
});