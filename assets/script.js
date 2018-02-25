$(document).ready(function(){

// create some preset buttons that will display at page load
var cartoonChar = ["bugs bunny", "tweety bird", "mickey mouse"];

// funtion to display the character gifs when the character buttons are pressed.
function displayCharacterGifs(){

  // var GphApiClient = require('giphy-js-sdk-core')
  // client = GphApiClient("GhsnVBBwPn1KoNV1IAJLwXdN37LUEw7X");

  /// Gif Search
  // client.search('gifs', {"q": "cats"})
  //   .then((response) => {
  //     response.data.forEach((gifObject) => {
  //       console.log(gifObject)
  //     })
  //   })
  //   .catch((err) => {
  //
  // })

  // takes the data-name attribute of the particular button pressed
  var cartoonChar = $(this).attr("data-name");
  // sets variable queryURL to add the data-name (chosen cartoon character).
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cartoonChar + "&api_key=GhsnVBBwPn1KoNV1IAJLwXdN37LUEw7X&limit=15"
  // use ajox method to query giphy api for the desired cartoon character
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){

    // since the response we get is an array of data, we set response.data to the variable results
    var results = response.data;
    // logs the results
    console.log(results);
    // we then loop through the results array to get our properties
    for (j = 0; j < results.length; j++){
      //log results[j]
      console.log(results[j].title);
    // get the rating for the gif
    var ratings = $("<p class='rating'>").text("Rating: " + results[j].rating);
    // log the rating for the results
    console.log(ratings);
    // appends the rating to the DOM in the dive cartoonImages
    $("#cartoonImages").append(ratings)


    }




  })



}


// function to render new buttons based on user userInput
function renderButtons() {

  // make sure the cartoon buttons div is empty before adding new buttons
  $("#cartoonButtons").empty();


  for (i = 0; i < cartoonChar.length; i++){

    // create a variable that will add a new button element with class newButton
    // assign a new button variable to an button element
    var newButton = $("<button>");
    // give the new button various attributes.
    newButton.addClass("characterButton"); // adds a class name of characterButton
    newButton.attr("data-name", cartoonChar[i]); // gives attribute data-name of the cartoonChar in the array
    newButton.text(cartoonChar[i]); // adds the string in the array to the text of the buttons
    // append the new button to the DOM div cartoonButtons
    $("#cartoonButtons").append(newButton);

  }
}

  // read the value of the input the user enters and adds the new buttons to the cartoonButtons div
  $("#submitButton").on("click", function(event){
    event.preventDefault();
    // reads user's input and assigns it to the variable characterInput
    var characterInput = $("#userInput").val().trim();
    console.log(characterInput);
    // add the user input to the string of cartoonChar
    cartoonChar.push(characterInput);
    // when the submit button is clicked, it puts the button into the Dom with the item the user chose
    renderButtons();

  });

// add event listener for a click on the cartoon character button and display the character gifs.
$(document).on("click", ".characterButton", displayCharacterGifs);

// renders the buttons in the DOM
renderButtons();



// we need to query the URL for giphy to get the response object with our search criteria
// var newGif = [];
//
// /// Gif Search
// client.search('gifs', {"q": "cats"})
//   .then((response) => {
//     response.data.forEach((gifObject) => {
//       console.log(gifObject)
//     })
//   })
//   .catch((err) => {
//
//   })
//
// //javascript, jQuery
// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
// xhr.done(function(data) { console.log("success got data", data); });
//

// function to render new button onto the buttons-row in the dom using the id tag cartoon Buttons.

// start with data-state attr being still and then change to animate when gif is clicked

// when the new buttons with the user entered character is clicked, then we query the gifs.

}); // end of document.ready()
