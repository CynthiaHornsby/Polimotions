//IMAGE SEARCH
$(document).on("mouseover", function() {
    $("img").attr("draggable", "true");
    $("img").attr("ondragstart", "drag(event)");
    console.log("Dragged");
});
$(document).on("mousedown", function() {
    $("img").attr("id", "drag1");
    console.log("where is the picture")

});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log("Hey");
}


function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    console.log("Hi");
}


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

    });
// });
