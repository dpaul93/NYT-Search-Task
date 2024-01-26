let search = $("#search");
let searchText;
let searchOption;
let startYear;
let endYear;

const apiKey = "YA63OHIJtMSxV7cGZoqyIpz9ryegDipd";


$("#search").on("click", function (event) {
    event.preventDefault();

    searchText = $("#search-text").val();
    searchOption = $("#select-option").val();
    startYear = $("#start-year").val();
    endYear = $("#end-year").val();

    displayNews();
})

$("#clear").on("click", function (event) {
    event.preventDefault();
    $("#articles").empty();
})



function displayNews() {
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchText + "&api-key=" + apiKey;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            $("#articles").empty();

            for (var i = 0; i < data.response.docs.length; i++) {

                $("#articles").append('<a href="' + data.response.docs[i].web_url + '">' + data.response.docs[i].headline.main + '</a>');
                $("#articles").append('<br>');
            }
        });

}

