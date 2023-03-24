var level = 0;
var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$("body").on("keydown", function (e) {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function (e) {
  // var userChosenColour= e.attr("id");
  // var userChosenColour= (e.target.id); //selecting id attribute using Javascript methods
  var userChosenColour = $(this).attr("id"); //selecting id attribute easily using jQuery methods 
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //userClickedPattern array is emptied everytime a new level starts.
  var lastIndex = userClickedPattern.length - 1;
  checkAnswer(lastIndex);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#" + "level-title").html("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  // var buttonSelector = "#"+randomChosenColour;
  $("#" + randomChosenColour) //selecting button with the id red/blue/green/yellow
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var soundSelector = "sounds/" + name + ".mp3";
  var audio = new Audio(soundSelector);
  audio.play();
}

function animatePress(currentColour) {
  var selector = $("#" + currentColour);
  selector.addClass("pressed");
  setTimeout(function () {
    selector.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("fail");
    var gameOverAudio = new Audio("sounds/wrong.mp3");
    gameOverAudio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#" + "level-title").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
