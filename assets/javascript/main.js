$(document).ready(function () {
    $('select').formSelect();
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
    var username = $("#username").val().trim();
    var userImage = $("#userImagePath").val().trim();
    var tagline = $("#tagline").val().trim()
    var userpick = $(".selected").text();
    console.log(username, userImage, tagline, userpick)
    database.ref().push({
        username: username,
        userImage: userImage,
        tagline: tagline,
        player: userpick,
    })
})