$(document).ready(function () {
    $('select').formSelect();
    $("#mainWrap").css({
        display: "none"
    })
});
var userpick;
var userpick2;

var firebaseConfig = {
    apiKey: "AIzaSyCRPSJdpNXRVd8rCKRyhqE6aIqQJ3pQ3IY",
    authDomain: "fir-5ceb2.firebaseapp.com",
    databaseURL: "https://fir-5ceb2.firebaseio.com",
    projectId: "fir-5ceb2",
    storageBucket: "fir-5ceb2.appspot.com",
    messagingSenderId: "804816779038",
    appId: "1:804816779038:web:a2793d97951aff02"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

function reloaded() {
    database.ref("Player 1").once("value", function (snapshot) {
        var usernameOne = snapshot.val().username
        console.log(usernameOne)
        $("#p1Username").text(usernameOne)
    })
    database.ref("Player 2").once("value", function (snapshot) {
        var usernameTwo = snapshot.val().username
        console.log(usernameTwo)
        $("#p2Username").text(usernameTwo)
    })
}
reloaded();

database.ref("Player 1").on("child_changed", function (snapshot) {
    var newName = snapshot.val().username
    $("#p1Username").text(newName)
})
database.ref("Player 1").on("child_changed", function (snapshot) {
    var newName = snapshot.val().username
    $("#p2Username").text(newName)
})

$("#submit").one("click", function (event) {
    event.preventDefault();
    console.log()
    if ($(".selected").text() === "Player 1") {
        var username = $("#username").val().trim();
        var userImage = $("#userImagePath").val().trim();
        var tagline = $("#tagline").val().trim()
        userpick = $(".selected").text();
        console.log(username, userImage, tagline, userpick)
        database.ref("Player 1").set({
            username: username,
            userImage: userImage,
            tagline: tagline,
            submitted: "true",

        })
        $("#loadCont").css({
            display: "none",
        })

        $("#p1Username").text(username)

    } else {

        var username2 = $("#username").val().trim();
        var userImage2 = $("#userImagePath").val().trim();
        var tagline2 = $("#tagline").val().trim()
        userpick2 = $(".selected").text();
        console.log(username2, userImage2, tagline2, userpick2)
        database.ref("Player 2").set({
            username: username2,
            userImage: userImage2,
            tagline: tagline2,
            submitted: "true",

        })
        $("#loadCont").css({
            display: "none",
        })

        $("#p2Username").text(username2)
    }
    playerSet();
})


function playerSet() {
    var p1submit = "";
    var p2submit = "";
    var p1tagline;
    var p2tagline;
    database.ref("Player 1").on("value", function (snapshot) {
        p1tagline = snapshot.val().tagline
        p1submit = snapshot.val().submitted
    })
    database.ref("Player 2").on("value", function (snapshot) {
        p2tagline = snapshot.val().tagline
        p2submit = snapshot.val().submitted
    })
    console.log(p1submit, p2submit)
    if (p1submit === "true" && p2submit === "true") {
        $("#p1tagline").text('"' + p1tagline + '"')
        $("#p2tagline").text('"' + p2tagline + '"')
        $("h5").css({
            fontFamily: "Georgia, serif",
            fontSize: "1.5em",
            textAlign: "center"
        })
        $("#mainWrap").css({
            display: "block"
        })
    }
}


