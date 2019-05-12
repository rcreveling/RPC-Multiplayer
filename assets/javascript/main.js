$(document).ready(function () {
    $('select').formSelect();
    $('.modal').modal();
    $("#mainWrap").css({
        display: "none"
    })
});
var icons = ["airport_shuttle", "album", "all_inclusive", "audiotrack", "beach_access", "blur_circular", "border_outer", "brightness_4", "brightness_7", "bubble_chart", "brush", "camera", "color_lens", "code", "details", "directions_bike", "directions_boat", "directions_car", "euro_symbol", "event_seat", "face", "favorite_border", "filter_b_and_w", "filter_hdr", "filter_drama", "filter_vintage", "fingerprint", "flash_on", "fitness_center", "functions", "gesture", "headset", "hourglass_empty", "leak_remove", "lightbulb_outline", "local_bar", "local_dining", "local_florist", "local_pizza", "loyalty", "memory", "map", "monetization_on", "multiline_chart", "motorcycle", "mouse", "pan_tool", "public", "radio", "save", "security"
]
$(".modal-trigger").one("click", function () {
    for (g = 0; g < icons.length; g++) {
        var newIcon = $("<button>", { id: "ibtn", class: "material-icons" })
        newIcon.attr('type', "button");
        newIcon.attr('onclick', "iconPick($(this).text())")
        newIcon.text(icons[g])
        newIcon.css({
            border: "2px solid black",
            borderRadius: "10px",
            fontSize: "2em",
            padding: "3px 3px 3px 3px",
            marginTop: "2px",
        })
        $(".modal-content").append(newIcon)

    }
})
var userIcon;
function iconPick(icon) {
    event.preventDefault();
    userIcon = icon
    console.log(userIcon)

}


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

$("#submit").one("click", function (event) {
    event.preventDefault();

    if ($(".selected").text() === "Player 1") {
        var username = $("#username").val().trim();
        var tagline = $("#tagline").val().trim()
        userpick = $(".selected").text();
        console.log(username, tagline, userpick, userIcon)
        database.ref("Player 1").set({
            username: username,
            userIcon: userIcon,
            tagline: tagline,
            submitted: "true",
        })
        $("#loadCont").css({
            display: "none",
        })

        $("#p1Username").text(username)
    } else {

        var username2 = $("#username").val().trim();
        var tagline2 = $("#tagline").val().trim();

        userpick2 = $(".selected").text();
        console.log(username2, tagline2, userpick2, userIcon)
        database.ref("Player 2").set({
            username: username2,
            userIcon: userIcon,
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
    var p1icon;
    var p2icon;
    database.ref("Player 1").on("value", function (p1) {
        p1tagline = p1.val().tagline
        p1submit = p1.val().submitted
        p1username = p1.val().username
        p1icon = p1.val().userIcon
    })
    database.ref("Player 2").on("value", function (p2) {
        p2tagline = p2.val().tagline
        p2submit = p2.val().submitted
        p2username = p2.val().username
        p2icon = p2.val().userIcon
    })
    console.log(p1submit, p2submit)
    if (p1submit === "true" && p2submit === "true") {
        $("#p1tagline").text('"' + p1tagline + '"')
        $("#p2tagline").text('"' + p2tagline + '"')
        $("#p1username").text(p1username)
        $("#p2username").text(p2username)
        $("#p1icon").text(p1icon)
        $("#p2icon").text(p2icon)

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

database.ref().on("child_changed", function (snapshot) {
    var loadOne = database.ref("Reload").val().readyOne
    var loadTwo = database.ref("Reload").val().readyTwo
    if (loadOne === "ready" && loadTwo === "ready") {
        $("#mainWrap").css({
            display: "block"
        })
    }
})


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