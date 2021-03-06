// A list of the variables (mostly constants) to be referenced throughout the quiz javascript code.
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choice1 = document.getElementById("1")
const choice2 = document.getElementById("2")
const choice3 = document.getElementById("3")
const choice4 = document.getElementById("4")
const score = document.getElementById("score");
var previousAnswer = "";
const pAnswer = document.getElementById("pAnswer");
const container = document.getElementById("container");
var yourScore = document.getElementById("yourScore");
var timerStart = 00;
var sec = 70;
var initialsSpan = document.getElementById("user-initials");
var scoreSpan = document.getElementById("user-score");
var saveScoreButton = document.getElementById("save-score");
var msgDiv = document.getElementById("msg")
var initialInput = document.getElementById("initials")
var scoreInput = sec
var quizRestart = document.getElementById("restartQuiz");
var toclearLS = document.getElementById("clearLS");
var resetHsList = document.getElementById("highscores")

// Enables message to display while entering your intials to store score (if initials field blank alerts you, if score successfully saved also alerts).
function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}


// Array of questions and answers that can be referenced by the makeQuestion function to generate the quiz.
let questions = [
    {
    question: "Commonly used data types DO NOT include:",
    answer: "3",
    choice1 : "1. strings",
    choice2 : "2. booleans",
    choice3 : "3. alerts",
    choice4 : "4. numbers"
    
  },
    {
    question: "The condition in an if/else statement is enclosed within _____.",
    answer: "3",
    choice1 :  "1. quotes",
    choice2 :  "2. curly brackets",
    choice3 :  "3. parentheses",
    choice4 :  "4. square brackets"
    
  },
    {
    question: "Arrays in JavaScript can be used to store _____.",
    answer: "4",
    choice1 : "1. numbers and strings",
    choice2 : "2. other arrays",
    choice3 : "3. booleans",
    choice4 : "4. all of the above"
    
  },
    {
    question: "String values must be enclosed within _____ when being assigned to variables.",
    answer: "3",
    choice1 : "1. commas",
    choice2 : "2. curly brackets",
    choice3 : "3. quotes",
    choice4 : "4. parentheses"
    
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer: "4",
    choice1 : "1. JavaScript",
    choice2 : "2. terminal/bash",
    choice3 : "3. for loops",
    choice4 : "4. console.log"
    
  },
  {
    question: " ",
  },
]


const lastQuestion = questions.length -1;
let currentQuestion = 0;


// Function to create the quiz questions and display whether or not the last answer was correct.
function makeQuestion(){

    let q = questions[currentQuestion];

    question.innerHTML = "<p>"+ q.question +"</p";
    choice1.innerHTML = q.choice1;
    choice2.innerHTML = q.choice2;
    choice3.innerHTML = q.choice3;
    choice4.innerHTML = q.choice4;

    pAnswer.innerHTML = previousAnswer;
}

// Code behind the start quiz button that actually starts the quiz and hides the opening card, also starts the timer function.
start.addEventListener("click", startQuiz);

function startQuiz(){
  start.style.display = "none";
  container.style.display = "none";
  scoreList.style.display = "none";
  highScoresNav.style.display = "none";
  pAnswer.style.display = "block";
  makeQuestion();
  quiz.style.display = "block";
  timer();
}

// Function that checks whether or not the answer you clicked was correct. Also checks to see if you just completed the last question.
// If you have completed the last question the function will push the user to the player score screen and hide the quiz.
function checkAnswer(answer){
  if( answer == questions[currentQuestion].answer){
      console.log(questions[currentQuestion].answer)
      console.log(answer)
      answerIsCorrect();
  }else{
      answerIsWrong();
  }
  count = 0;
  if(currentQuestion < lastQuestion){
      currentQuestion++;
      makeQuestion();
  if(currentQuestion >= questions.length -1){
    quiz.style.display = "none";
    showPlayerScore();
  }

  } 
}

// If the user answered the previous question correctly this function will display "Correct!" under the next question.
function answerIsCorrect(){
  previousAnswer =  "<div class=\"pAnswer\">Correct!</div>";
}

// If the user answered the previous question incorrectly this function will display "Incorrect!" under the next question and deduct 10 seconds from the timer.
function answerIsWrong(){
  previousAnswer = "<div class=\"pAnswer\">Incorrect!</div>";
  sec = sec - 10;

}

// This function hides the quiz card and shows the user their final score (based on time taken to complete the quiz minus 10 sec for each incorrect answer).
// The user can also enter their initials and save their score to local storage.
function showPlayerScore(){
  yourScore.style.display = "block";
  quiz.style.display = "none";
  scoreList.style.display = "none";
  highScoresNav.style.display = "inline";
  document.getElementById('score').innerHTML= 'Your score is: ' + sec + '!';

  
}

// This is the function that actually saves the player's initials/score to local storage.
// Contains code that will notify the user if their score was saved or if they left the initials field blank.
saveScoreButton.addEventListener("click", function(event) {
  event.preventDefault();

  var initials = document.querySelector("#initials").value;
  var score = document.querySelector("#score").value;

  if (initials === "") {
    displayMessage("error", "Initials cannot be left blank");
  } else {
    displayMessage("success", "Your score was saved!");
    var hsLog = JSON.parse(window.localStorage.getItem("hsLog")) || [];
    var newEntry = {
      score: sec,
      initials: initials
    };
  }

    hsLog.push(newEntry);
    window.localStorage.setItem("hsLog", JSON.stringify(hsLog));
    console.log(hsLog);

    // Added this page reload command to force the page to clear previous high score entries.
    location.reload();
  
  });
  
  // This function pulls previous high scores from the local storage and creates list items to display them in.
  // It also orders them from highest to lowest score.
  function retrieveHsLog(){

    var hsLog = JSON.parse(window.localStorage.getItem("hsLog")) || [];

    hsLog.sort(function(a, b) {
      return b.score - a.score
    });
    
    
    hsLog.forEach(function(score) {
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }

  // This function sets up the quiz timer by setting its interval (by the second).
  // It also causes the timer to stop and the quiz to end/kick the user to the score page once the timer hits 0 seconds remaining.
  // Lastly this function tops the timer once the user completes question 5.
function timer(){
  var timer = setInterval(function(){
      document.getElementById('timerDisplay').innerHTML= sec;
      sec--;
      if (sec < 0) {
          clearInterval(timer);
          showPlayerScore();
      }

      if (currentQuestion == 5) {
        clearInterval(timer);
      }

  }, 1000);
}

// This function causes the high score screen to display.
function viewHighScores() {
  retrieveHsLog();
  start.style.display = "none";
  highScoresNav.style.display = "inline";
  container.style.display = "none";
  yourScore.style.display = "none";
  quiz.style.display = "none";
  scoreList.style.display = "block";
}

// Javascript to cause the quiz to restart when the quizRestart button is clicked.
// Resets the quiz timer to 70 seconds and reverts the quiz to question 0 (the first question)
quizRestart.addEventListener("click", restartQuiz);

function restartQuiz(){
  container.style.display = "block";
  scoreList.style.display = "none";
  quiz.style.display = "none";
  start.style.display = "block";
  yourScore.style.display = "none";
  pAnswer.style.display = "none";
  highScoresNav.style.display = "inline";
  sec = 70;
  currentQuestion = 0;
  
}

// Supports the "clear local storage" button and reloads the page so all previous high scores printed to the High Score page are cleared.
toclearLS.addEventListener("click", clearLS)

function clearLS(){
  localStorage.clear();
  location.reload();
}