$(document).ready(function () {
    $('select').formSelect();
    $("#mainWrap").css({
        display: "none"
    })
});

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

$("#submit").one("click", function (event) {
    event.preventDefault();
    console.log()
    if ($(".selected").text() === "Player 1") {
        var username = $("#username").val().trim();
        var userImage = $("#userImagePath").val().trim();
        var tagline = $("#tagline").val().trim()
        var userpick = $(".selected").text();
        console.log(username, userImage, tagline, userpick)
        database.ref(userpick).push({
            username: username,
            userImage: userImage,
            tagline: tagline,
            player: userpick,
        })
        $("#loadCont").css({
            display: "none",
        })
        $("#mainWrap").css({
            display: "block"
        })

    } else {

        var username2 = $("#username").val().trim();
        var userImage2 = $("#userImagePath").val().trim();
        var tagline2 = $("#tagline").val().trim()
        var userpick2 = $(".selected").text();
        console.log(username2, userImage2, tagline2, userpick2)
        database.ref(userpick2).push({
            username2: username2,
            userImage2: userImage2,
            tagline2: tagline2,
            player2: userpick2,
        })
        $("#loadCont").css({
            display: "none",
        })
        $("#mainWrap").css({
            display: "block"
        })
    }
    playerSet();
})
function player1set() {
    database.ref("Player 1").on("child_added", function (snapshot) {

    })
}
function player2set() {
    database.ref("Player 2").on("child_added", function (snapshot) {
        $("#p2Username").text(snapshot.val().username2)
        console.log(snapshot.val())
    })

}

function playerSet(snapshot) {
    var playerOne = snapshot.ref("Player 1").val().username
    var playerTwo = snapshot.ref("Player 2").val().username2
    $("#p1Username").text(playerOne)
    $("#p2Username").text(playerTwo)
}


