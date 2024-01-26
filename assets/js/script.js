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
    startYear = startYear.replace(/-/g, '')
    endYear = $("#end-year").val();
    endYear = endYear.replace(/-/g, '')

    displayNews();
})

$("#clear").on("click", function (event) {
    event.preventDefault();
    $("#articles").empty();
})



function displayNews() {

    if (startYear !== "")
    {
        searchText=searchText + "&begin_date=" + startYear;      
    }
    
    if (endYear !== "")
    {
        searchText=searchText + "&end_date=" + endYear;      
    }    
    
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchText + "&api-key=" + apiKey;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            $("#articles").empty();

            for (var i = 0; i < data.response.docs.length; i++) {

                // if max no articles displayed, then exit loop        
                if (searchOption !== "")
                {
                    if (i == searchOption)
                    {
                        break;
                    }
                }
                
                $("#articles").append('<a href="' + data.response.docs[i].web_url + '">' + data.response.docs[i].headline.main + '</a>');
                $("#articles").append('<br>');

            }
        });

}

