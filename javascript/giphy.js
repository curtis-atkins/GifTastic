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

//when button is clicked return 10 hits from giphy search search including still gif and rating
    function sportButtonClick(){
        $(".sports").click(function() {
            var sport = $(this).attr("data-name");
            var apiKey = "45657ac5520149fb807bcf8f97c84b60";
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=" + apiKey + "&limit=10";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
                var results = response.data;
                console.log(results);

    //            var still = results[i].images.fixed_height_still.url;
    //            var animate = results[i].images.fixed_height.url;


                for (var i = 0; i < results.length; i++) {
                    var giphyDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var sportImage = $("<img>").addClass("soloGif");
                    sportImage.attr("src", results[i].images.fixed_height.url);
                    sportImage.attr({
                        "data-still": results[i].images.fixed_height_still.url
                    });

                    


                  sportImage.attr({
                        "data-animate": results[i].images.fixed_height.url
                    });
                    

                   sportImage.attr({
                        "data-state": "animate"
                    });
                    
                    giphyDiv.prepend(sportImage);
                    giphyDiv.prepend(p);
                    $("#sport-gifs-here").prepend(giphyDiv);
                };
                console.log("each");
                $(".soloGif").each(function () {
                    still2Animate(this);
                });
                console.log("click");
                $(".soloGif").click(function () {
                    still2Animate(this);
                });
            });
        });
    };
    sportButtonClick();

    function still2Animate(obj){
                    console.log("What is this?");
                    console.log(obj);
                    var state = $(obj).attr("data-state");
                    console.log(state);
                    if (state === "still") {
                        $(obj).attr("src", $(obj).attr("data-animate"));
                        $(obj).attr("data-state", "animate");
                    } else {
                        $(obj).attr("src", $(obj).attr("data-still"));
                        $(obj).attr("data-state", "still");
                    }
                };
//when there is a value in the input field, once you click submit, the value will be placed at the  
//top in a new button which can be clicked and will return 10 results with a still gif and rating
    $("#searchButton").click(function(){
       var addTopic =  $("#search").val().trim();
       topics.push(addTopic);
       sports();
       sportButtonClick();
//each time the submit button is clicked, clear the text input field
       $("#form").each(function(){
    this.reset();
});
    });






});