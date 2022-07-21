var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function(){
  if(!started){
    started = true;
    nextSequence();
  }  //console.log(gamePattern);
})


function startOver(){
  started = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    $("h1").text("SUCCESS!!!");
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000)
    }
    }
    else{
      $("h1").text("Game Over,press any key to try again!!!");
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200)
      startOver();
      //userClickedPattern = [];

    }
  }



function nextSequence(){
  userClickedPattern = [];
  $("h1").text("Level " + parseInt(level));
  level += 1;
  let randomChosenColor = Math.floor(Math.random()*4);
  gamePattern.push(buttonColors[randomChosenColor]);
  playSound(buttonColors[randomChosenColor]);
  $("#" + buttonColors[randomChosenColor]).fadeOut(100).fadeIn(100);
}

//$("#" + buttonColors[randomChosenColor]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  //$("#" + userChosenColor).fadeOut(100).fadeIn(100);
})

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){$("#" + currentColor).removeClass("pressed");},100);
}

function playSound(name){
  var audio = new Audio("sounds\\" + name + ".mp3");
  audio.play();
}
