// A list of the variables (mostly constants) to be referenced throughout the quiz code
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


function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}


//Array of questions and answers that can be referenced by the makeQuestion function to generate the quiz
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



function makeQuestion(){

    let q = questions[currentQuestion];

    question.innerHTML = "<p>"+ q.question +"</p";
    choice1.innerHTML = q.choice1;
    choice2.innerHTML = q.choice2;
    choice3.innerHTML = q.choice3;
    choice4.innerHTML = q.choice4;

    pAnswer.innerHTML = previousAnswer;
}

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
function answerIsCorrect(){
  //Might need to add HTML elements into this quotation (<p>correct</p>)
  previousAnswer =  "<div class=\"pAnswer\">Correct!</div>";

  console.log("correct");
}

function answerIsWrong(){
  console.log("wrong");
  previousAnswer = "<div class=\"pAnswer\">Incorrect!</div>";
  sec = sec - 10;

}

function showPlayerScore(){
  yourScore.style.display = "block";
  quiz.style.display = "none";
  scoreList.style.display = "none";
  highScoresNav.style.display = "inline";
  document.getElementById('score').innerHTML= 'Your score is: ' + sec + '!';

  
}


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

    location.reload();
  
  });


  
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

//retrieveHsLog();

/*
saveScoreButton.addEventListener("click", function(event) {
  event.preventDefault();

  var initials = document.querySelector("#initials").value;
  var score = document.querySelector("#score").value;

  if (initials === "") {
    displayMessage("error", "Initials cannot be left blank");
  } else {
    displayMessage("success", "Your score was saved!");

    localStorage.setItem("initials", JSON.stringify(initials));
    localStorage.setItem("score", JSON.stringify(sec));
    fetchPreviousScores();
    viewHighScores();
  }
});

function fetchPreviousScores() {
  var initials = JSON.parse(localStorage.getItem("initials"));
  console.log(initials);
  var score = JSON.parse(localStorage.getItem("score"));
  console.log(score);

*/

  /*
  if (!getInitials || !getScore) {
    return;
  }
*/

/*
  initialsSpan.textContent = initials;
  scoreSpan.textContent = score;
}

*/

function timer(){
  //sec = 70
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

function viewHighScores() {
  //fetchPreviousScores();
  
  document.getElementById("highscores").value = "";
  retrieveHsLog();
  start.style.display = "none";
  highScoresNav.style.display = "inline";
  container.style.display = "none";
  yourScore.style.display = "none";
  quiz.style.display = "none";
  scoreList.style.display = "block";
}

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

toclearLS.addEventListener("click", clearLS)

function clearLS(){
  localStorage.clear();
  location.reload();
}