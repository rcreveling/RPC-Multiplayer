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
var ref = database.ref();
database.ref().on("child_changed", function (snapshot) {
    ref = snapshot.getRef()

})
ref.child("Player 1").on("child_changed", function (p1change) {

    console.log(p1change)
})
ref.child("Player 2").on("child_changed", function (p2change) {

    console.log(p2change)
})
// database.ref("Player 1").on("child_changed", function (snapshot) {
//     var newName = snapshot.val().username
//     var newTagline = snapshot.val().tagline
//     $("#p1tagline").text(newTagline)
//     $("#p1Username").text(newName)
// })
// database.ref("Player 2").on("child_changed", function (snapshot) {
//     var newName = snapshot.val().username
//     var newTagline = snapshot.val()
//     $("#p2tagline").text(newTagline)
//     $("#p2Username").text(newName)
// })

$("#submit").one("click", function (event) {
    event.preventDefault();
    var previousP1
    var previousP2
    console.log()
    if ($(".selected").text() === "Player 1") {
        var username = $("#username").val().trim();
        var tagline = $("#tagline").val().trim()
        var userImage = $("#userImagePath").val().trim();
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
        var tagline2 = $("#tagline").val().trim()

        var userImage2 = $("#userImagePath").val().trim();
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
    var identifier = $(".selected").text()
    playerSet(identifier);
})


function playerSet(identifier) {
    var p1submit = "";
    var p2submit = "";
    var p1tagline;
    var p2tagline;
    var p1username;
    var p2username;
    var p1image;
    var p2image;
    database.ref("Player 1").on("value", function (p1) {
        p1tagline = p1.val().tagline
        p1submit = p1.val().submitted
        p1username = p1.val().username
        p1image = p1.val().userImage
    })
    database.ref("Player 2").on("value", function (p2) {
        p2tagline = p2.val().tagline
        p2submit = p2.val().submitted
        p2username = p2.val().username
        p2image = p2.val().userImage
    })
    console.log(p1submit, p2submit)
    if (p1submit === "true" && p2submit === "true") {
        $("#p1tagline").text('"' + p1tagline + '"')
        $("#p2tagline").text('"' + p2tagline + '"')
        $("#p1username").text(p1username)
        $("#p2username").text(p2username)
        $("#p1image").attr('src', p1image)
        $("#p2image").attr('src', p2image)
        $("h5").css({
            fontFamily: "Georgia, serif",
            fontSize: "1.5em",
            textAlign: "center"
        })
        $("#mainWrap").css({
            display: "block"
        })
        if (identifier === "Player 1") {
            database.ref("Reload").set({
                readyOne: "ready"
            })
        } else {
            database.ref("Reload").set({
                readyTwo: "ready"
            })
        }
    } else {
        database.ref("Reload").on("value", function (snapshot) {
            console.log(snapshot.val())
        })
    }
}


function completed() {
    database.ref("Ready").set({
        readyOne: "",
        readyTwo: ""
    })
    database.ref("Player 1").set({
        username: "",
        tagline: "",
        userImage: "",
        submitted: "",
    })
    database.ref("Player 2").set({
        username: "",
        tagline: "",
        userImage: "",
        submitted: "",
    })
    database.ref("Reload").set({
        readyTwo: "",
        readyOne: "",
    })
    console.log("reset done")
}

$("#resetdata").on("click", function () {
    completed();
})