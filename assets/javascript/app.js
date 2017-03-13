var config = {
  apiKey: "AIzaSyC70CNIbUl7qfRxTHMxniq2Xr2Urtqqk-Q",
  authDomain: "my-app-c960e.firebaseapp.com",
  databaseURL: "https://my-app-c960e.firebaseio.com",
  storageBucket: "my-app-c960e.appspot.com",
  messagingSenderId: "97762507020"
};
firebase.initializeApp(config);

var database = firebase.database();

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Initial Values
var name = "";
var destination = "";
var time = 0;
var frequency = 0;

// Capture Button Click
$("#add-user").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text-boxes
  name = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  time = $("#train-time").val().trim();
  frequency = $("#frequency").val().trim();

  // Code for "Setting values in the database"
  database.ref().push({
    name: name,
    destination: destination,
    time: time,
    frequency: frequency,
    dateAdded : firebase.database.ServerValue.TIMESTAMP
  });
});
var dataRef = firebase.database();
dataRef.ref().on("child_added", function(childSnapshot) {

// Log everything that's coming out of snapshot
console.log(childSnapshot.val().name);
console.log(childSnapshot.val().destination);
console.log(childSnapshot.val().time);
console.log(childSnapshot.val().frequency);
// console.log(childSnapshot.val().monthsworked);
// console.log(childSnapshot.val().totalpaid);

// full list of items to the well
$("#table").append('<tr><th>' + childSnapshot.val().name + '</th><th>' + childSnapshot.val().destination +
  '</th><th>' + childSnapshot.val().frequency + '</th><th>' + childSnapshot.val().NextArrival + '</th><th>' +
  childSnapshot.val().MinutesAway + '</th><th>');

   // Handle the errors
 }, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});