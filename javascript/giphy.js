$(document).ready(function() {
    //array of sports
    topics = ["Basketball", "Baseball", "Football", "NASCAR", "Hockey", "Soccer", "MMA", "Boxing", "Lacrosse", "Golf", "Tennis", "Swimming", "Track & Field"];
    //creates buttons by looping throughusing the strings from the topics array
    function sports() {
        // clears the array before adding new strings to it
        $("#buttons").empty();
        // loops through topics array
        for (var i = 0; i < topics.length; i++) {
            var buttons = $("<button>");
            buttons.addClass("sports");
            buttons.attr("data-name", topics[i]);
            buttons.text(topics[i]);
            $("#buttons").append(buttons);
        }
    };
    sports();
    //when button is clicked return 10 hits from giphy API search including still gif and rating
    $(".sports").click(function() {
        var sport = $(this).attr("data-name");
        var apiKey = "45657ac5520149fb807bcf8f97c84b60";
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=" + apiKey + "&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var giphyDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var sportImage = $("<img>");
                sportImage.attr("src", results[i].images.fixed_height_still.url);
                sportImage.attr({
                    "data-animate": results[i].images.fixed_height.url
                });
                sportImage.attr({
                    "data-state": "still"
                });
                sportImage.attr({
                    "data-still": results[i].images.fixed_height_still.url
                });
                giphyDiv.prepend(sportImage);
                giphyDiv.prepend(p);
                $("#sport-gifs-here").prepend(giphyDiv);
            };
        });
    });
    $(".item").click(function() {
        var state = $(this).attr('data-state');
        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});