//IMAGE DROPBOX
var dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", noopHandler, false);
dropbox.addEventListener("dragexit", noopHandler, false);
dropbox.addEventListener("dragover", noopHandler, false);
dropbox.addEventListener("drop", drop, false);

function noopHandler(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    console.log("Handler working")
}

function drop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var imageLink = evt.dataTransfer.getData('URL');
    console.log(imageLink);
    $("#dropbox").prepend('<img src="' + imageLink + '">');
    console.log('<img src="' + imageLink + '">');
}

//Clear Image Div

$("#resetDiv").on("click", function() {
    $("#dropbox").empty();
});



// Initialize Firebase
/* global firebase */

var config = {
    apiKey: "AIzaSyA04Li4Y2BJ6O54i1Tm3VgZx6XX1JibX1c",
    authDomain: "polimotions.firebaseapp.com",
    databaseURL: "https://polimotions.firebaseio.com",
    projectId: "polimotions",
    storageBucket: "polimotions.appspot.com",
    messagingSenderId: "920170050300"
};

firebase.initializeApp(config);

var db = firebase.database();
$("#run-search").on("click", function(event) {
    event.preventDefault();

    var recentSearch = $("#searchTerm").val().trim();
    $("#name").text(recentSearch);
    db.ref().push({
        recentSearch: recentSearch,
    });

    console.log(recentSearch);

    $("#searchTerm").val("");
});

db.ref().limitToLast(6).on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var recentSearch = childSnapshot.val().recentSearch;
    var newDiv = $('<div>');
    newDiv.append($('<p>').text(recentSearch));

    $("#searches").prepend(newDiv);
});


//FACE++ API

var imageURL = "http://epilepsyu.com/wp-content/uploads/2014/01/happy-people-1050x600.jpg";

// $(".analysisButton").on("click", function() {
//     $("#analysisDiv").empty();

var imageURL = "http://cdn.history.com/sites/2/2013/11/George_Washington-AB.jpeg";

console.log(imageURL);

var queryURL = "https://api-us.faceplusplus.com/facepp/v3/detect";

var params = {
    "api_key": "AKof96jqIYUIqbmI2TaF3-AJcURETpor",
    "api_secret": "WbNCep4Ml1Ad_wTiItDTq7QhTEskPUYT",
    "image_url": imageURL,
    "return_attributes": "gender,age,emotion",
};

$.ajax({ url: queryURL, method: "POST", data: params })

    .done(function(response) {
        var results = response;
        console.log(results);

        var analysis = $("#analysisDiv");

        // variables to catch emotions
        var sadness = results.faces[0].attributes.emotion.sadness;
        var neutral = results.faces[0].attributes.emotion.neutral;
        var disgust = results.faces[0].attributes.emotion.disgust;
        var anger = results.faces[0].attributes.emotion.anger;
        var surprise = results.faces[0].attributes.emotion.surprise;

        // variables to catch age and gender
        var age = results.faces[0].attributes.age.value;
        var gender = results.faces[0].attributes.gender.value;

        // create paragraph elements for each emotion, age, and gender
        var p1 = $("<p>").text("Emotion: ");
        var p2 = $("<p>").text("Sadness: " + sadness);
        var p3 = $("<p>").text("Neutral: " + neutral);
        var p4 = $("<p>").text("Disgust: " + disgust);
        var p5 = $("<p>").text("Anger: " + anger);
        var p6 = $("<p>").text("Surprise: " + surprise);
        // age and gender
        var p7 = $("<p>").text("Age: " + age);
        var p8 = $("<p>").text("Gender: " + gender);


        // append paragraphs into analysisDiv
        analysis.append(p1);
        analysis.append(p2);
        analysis.append(p3);
        analysis.append(p4);
        analysis.append(p5);
        analysis.append(p6);
        analysis.append(p7);
        analysis.append(p8);

        var image = $("<img>").attr("src", imageURL);
        var imagePlace = $("#div1");

        imagePlace.append(image);

        $("#sad").text(sadness);
        $("#neutral").text(neutral);
        $("#disgust").text(disgust);
        $("#anger").text(anger);
        $("#surprise").text(surprise);

    });
// });
