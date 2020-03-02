// VARIABLES

var myApiKey = "y5fd6BmElSM3UPPatTgJh0kmpD3Ug60X";
var arrTopics = ["cat", "dog", "bunny", "bird"];
const $buttonDiv = $("#button-container");

// FUNCTIONS

function makeButtons() {
    // create a button for each string in topic array
    for (topic of arrTopics) {
        $buttonDiv.append($("<button>").attr({
            class: "btn btn-primary px-3 m-2",
            id: arrTopics.indexOf(topic)
        }).text(topic));
    }
}

// INITIALIZE

makeButtons();
console.log($buttonDiv);

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
        // do stuff after getting back response 
        console.log(response);
    });
});