$(document).ready(function(){

// create some preset buttons that will display at page load
var cartoonChar = ["bugs bunny", "tweety bird", "animaniacs", "snow white", "charlie brown"];

// funtion to display the character gifs when the character buttons are pressed.
function displayCharacterGifs(){

  // var GphApiClient = require('giphy-js-sdk-core')
  // client = GphApiClient("GhsnVBBwPn1KoNV1IAJLwXdN37LUEw7X");
  //
  // client.search('gifs', {"q": "cats"})
  //   .then((response) => {
  //     response.data.forEach((gifObject) => {
  //       console.log(gifObject)
  //     })
  //   })
  //   .catch((err) => {
  //
  // })
  // clear the cartoonImages div before each button is pressed
  $("#cartoonImages").empty();

  // takes the data-name attribute of the particular button pressed
  var cartoonChar = $(this).attr("data-name");
  // sets variable queryURL to add the data-name (chosen cartoon character).
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoonChar + "&api_key=GhsnVBBwPn1KoNV1IAJLwXdN37LUEw7X&limit=10"
  // use ajox method to query giphy api for the desired cartoon character
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){

    // since the response we get is an array of data, we set response.data to the variable results
    var results = response.data;

    if (results == ""){
      alert("There are no gif for this search term.");
      $(this).empty();
    }

    // we then loop through the results array to get our properties
    for (j = 0; j < results.length; j++){

    // creat a div for the results to go into
    var resultsDiv = $("<div class ='gifResult'>");
    // get the rating for the gif
    var ratings = $("<p class='gifRating'>");
      // sets the text of the ratings <p>
      ratings.text("Rated: " + results[j].rating);

    // grabs the images associated with the results
    var cartoonGifs = $("<img class='cartoonGifs'>");
      // set the src atrributes of the cartoon gifs still images with fixed height
      cartoonGifs.attr("src", results[j].images.fixed_width_still.url);
      cartoonGifs.attr("data-still", results[j].images.fixed_width_still.url);
      // set cartoonGifs data-animate to the animate gif url
      cartoonGifs.attr("data-animate", results[j].images.fixed_width.url);
      // set cartoonGifs data state attribute to still
      cartoonGifs.attr("data-state", "still");
      // set alt attribute to the image title
      cartoonGifs.attr("alt", results[j].title)

    // append the gifs to the resultsDiv
    resultsDiv.append(cartoonGifs);
    // appends the rating to the DOM in the dive cartoonImages
    resultsDiv.append(ratings);

    // appends the resultsDiv into the Dom of the cartoonImages div
    $("#cartoonImages").append(resultsDiv);


    } // end of for loop j looping through results

    // create a function to animate the gifs when clicked.
    $(".cartoonGifs").on("click", function(){

      // sets a variable of state to the data-state of the chosen gif clicked
      var state = $(this).attr("data-state");
      console.log(state);

      // if data state is still, then animate when clicked and vice versa
      if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

      } // end of if statement comparing data-state to still or animate

    }) // end of animate gif on click function

  }) // end of ajax query

} // end of displayCharacterGifs function

// function to render new buttons based on user userInput
function renderButtons() {

  // make sure the cartoon buttons div is empty before adding new buttons
  $("#cartoonButtons").empty();


  for (i = 0; i < cartoonChar.length; i++){

    // create a variable that will add a new button element with class newButton
    // assign a new button variable to an button element
    var newButton = $("<button>");
    // give the new button various attributes.
    newButton.addClass("characterButton button btn"); // adds a class name of characterButton
    newButton.attr("data-name", cartoonChar[i]); // gives attribute data-name of the cartoonChar in the array
    newButton.text(cartoonChar[i]); // adds the string in the array to the text of the buttons
    // append the new button to the DOM div cartoonButtons
    $("#cartoonButtons").prepend(newButton);

  }
}

  // tunction to read the value of the input the user enters and adds the new buttons to the cartoonButtons div
  $("#submitButton").on("click", function(event){
    event.preventDefault();
    // reads user's input and assigns it to the variable characterInput
    var characterInput = $("#userInput").val().trim();
    console.log(characterInput);
    // add the user input to the string of cartoonChar
    cartoonChar.push(characterInput);
    // when the submit button is clicked, it puts the button into the Dom with the item the user chose
    renderButtons();

  }); // end of on click event function for the submit button

// add event listener for a click on the cartoon character button and display the character gifs.
$(document).on("click", ".characterButton", displayCharacterGifs);

// renders the buttons in the DOM
renderButtons();

// function to render new button onto the buttons-row in the dom using the id tag cartoon Buttons.

// start with data-state attr being still and then change to animate when gif is clicked

// when the new buttons with the user entered character is clicked, then we query the gifs.

}); // end of document.ready()
