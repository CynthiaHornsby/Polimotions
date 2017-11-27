 //Image Search
 var firstRow;
 var imageArray = [];
 var topicImage;
 var imageResultsDisplay;
 $("#run-search").on("click", function() {

  $(".galleria").empty();

  event.preventDefault();

  var imageSearch = $("#searchTerm").val().trim();
  console.log("Your search is:" + imageSearch);

  var queryURL = "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + imageSearch + "&count=10";

  $.ajax({ //start ajax
    url: queryURL,
    beforeSend: function(xhrObj) {
     // Request headers
     xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "b8927aeb88e54d32a3c7bba435c9763e"); //replace value with your own key
    },
    method: "GET"
   })

   .done(function(response) {
    console.log(response);

    var results = response.value;
    console.log("results length" + results.length);

    for (var i = results.length - 1; i >= (results.length - 9); i--) {
     imageResultsDisplay = $('<img src="' + results[i].contentUrl + '"/>');
     imageArray.push(imageResultsDisplay);

    }

    function galleria() {
     Galleria.loadTheme('https://cdnjs.cloudflare.com/ajax/libs/galleria/1.5.7/themes/classic/galleria.classic.min.js');
     Galleria.run('.galleria');
     $(".galleria").append(imageArray);
    }

    galleria();

   }); //end ajax

 });
 