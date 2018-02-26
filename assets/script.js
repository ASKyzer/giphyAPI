$(document).ready(function(){

// create some preset buttons that will display at page load
var topics = ["winnie the pooh", "tweety bird", "animaniacs", "snow white", "charlie brown", "totoro", "sailor moon", "goofy dog", "eyor", "cinderella", "buzz lightyear", "woody", "garfield", "snoopy", "homer simpson", "roger the alien", "robot chicken"];

// function to render new buttons based on user userInput
function addButtons() {
  // make sure the cartoon buttons div is empty before adding new buttons
  $("#cartoonButtons").empty();
  // loop to go through the topics array and assign attributes to a newButton
  for (i = 0; i < topics.length; i++){
    // create a variable that will add a new button element with class newButton
    // assign a new button variable to an button element
    var newButton = $("<button>");
    // give the new button various attributes.
    newButton.addClass("characterButton button btn text-truncate"); // adds a class name of characterButton
    newButton.attr("data-name", topics[i]); // gives attribute data-name of the cartoonChar in the array
    newButton.text(topics[i]); // adds the string in the array to the text of the buttons
    // append the new button to the DOM div cartoonButtons
    $("#cartoonButtons").prepend(newButton);

  } // end of for loop add buttons to the DOM
} // end of addButtons Function

// tunction to read the value of the input the user enters and adds the new buttons to the cartoonButtons div
$("#submitButton").on("click", function(event){
  // prevent the page from reloading after entry of the input
  event.preventDefault();
  // make sure that the value of the user's input is not empty
  if ($("#userInput").val() == "") {
        return;
    }
  // reads user's input and assigns it to the variable characterInput
  var characterInput = $("#userInput").val().trim();
  // add the user input to the string of cartoonChar
  topics.push(characterInput);

  // when the submit button is clicked, it puts the button into the Dom with the item the user chose
  addButtons();
  // clear the input box after the user submit input
  $('#userInput').val('');

}); // end of on click event function for the submit button

// funtion to display the character gifs when the character buttons are pressed.
function displayCharacterGifs(){
  // clear the cartoonImages div before each button is pressed
  $("#cartoonImages").empty();
  // takes the data-name attribute of the particular button pressed
  var topics = $(this).attr("data-name");
  // sets variable queryURL to add the data-name (chosen cartoon character).
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=GhsnVBBwPn1KoNV1IAJLwXdN37LUEw7X&limit=10&rating=pg"
  // use ajox method to query giphy api for the desired cartoon character
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){

    // since the response we get is an array of data, we set response.data to the variable results
    var results = response.data;
    // alert user there are no gifs if the result not valid.
    if (results == ""){
      alert("There are no gifs for this search term.");
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
    var cartoonGifs = $("<img class='cartoonGifs img img-fluid img-responsive'>");
      // set the src atrributes of the cartoon gifs still images with fixed height
      cartoonGifs.attr("src", results[j].images.fixed_height_still.url);
      cartoonGifs.attr("data-still", results[j].images.fixed_height_still.url);
      // set cartoonGifs data-animate to the animate gif url
      cartoonGifs.attr("data-animate", results[j].images.fixed_height.url);
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

    // create a function to animate the gifs when character button is clicked.
    $(".cartoonGifs").on("click", function(){

      // sets a variable of state to the data-state of the chosen gif clicked
      var state = $(this).attr("data-state");
      // check the state of the gif
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

// run the function to add buttons of new cartoon characters to the DOM
addButtons();
// Listen for a click on the cartoon character button and runs the displayharacterGifs funciotn to display the character gifs.
$(document).on("click", ".characterButton", displayCharacterGifs);

}); // end of document.ready()
