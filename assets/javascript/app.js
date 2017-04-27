var config = {
  apiKey: "AIzaSyC70CNIbUl7qfRxTHMxniq2Xr2Urtqqk-Q",
  authDomain: "my-app-c960e.firebaseapp.com",
  databaseURL: "https://my-app-c960e.firebaseio.com",
  storageBucket: "my-app-c960e.appspot.com",
  messagingSenderId: "97762507020"
};
firebase.initializeApp(config);

var database = firebase.database();

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

      //convert first time to determine when the next time will be
      //subtract a year to work with the times
      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
      //format the current time 
      var currentTime = moment().format("HH:mm");
      //find the differenence in now and the first train time in minutes
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      // find the remainder of the difference in now and first time 
      var tRemainder = diffTime % frequency;
      //subtract remainder from the frequency. 
      var minutesTillTrain = frequency - tRemainder;
      //add mintuestill next train to the current time in minutes
      var nextTrain = moment().add(minutesTillTrain, "minutes");
      //format 
      var nextTrainFormatted = moment(nextTrain).format("HH:mm");

  // Code for "Setting values in the database"
  database.ref().push({
    name: name,
    destination: destination,
    time: time,
    frequency: frequency,
    nextTrainFormatted: nextTrainFormatted,
    minutesTillTrain: minutesTillTrain,
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
console.log(childSnapshot.val().nextTrainFormatted);
console.log(childSnapshot.val().minutesTillTrain);

// full list of items to the well
$("#table").append('<tr><th>' + childSnapshot.val().name + '</th><th>' + childSnapshot.val().destination +
  '</th><th>' + childSnapshot.val().frequency + '</th><th>' + childSnapshot.val().nextTrainFormatted + '</th><th>' +
  childSnapshot.val().minutesTillTrain + '</th><th>');

   // Handle the errors
 }, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});