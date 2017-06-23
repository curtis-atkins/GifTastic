$(document).ready(function(){


topics = ["Basketball", "Baseball", "Football", "NASCAR", "Hockey", "Soccer", "MMA", "Boxing", "Lacrosse", "Golf", "Tennis", 
			"Swimming", "Track & Field"];

function sports(){
	for(var i=0; i < topics.length; i++){
		var buttons = $("<button>");
		buttons.addClass("sports");
		buttons.css("background-color","#ff0000");
		buttons.attr("data-name", topics[i]);
		buttons.text(topics[i]);
		$("#buttons").append(buttons);

	}
}

sports();

var apiKey = "45657ac5520149fb807bcf8f97c84b60";
var type = "matrix";

// "http://api.giphy.com/v1/gifs/search?q=" + type + "&" + apiKey;

var queryURL= "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=" + apiKey;

	$.ajax({url: queryURL, method: 'GET'})
		.done(function(response){
			console.log(response)
});
	


});