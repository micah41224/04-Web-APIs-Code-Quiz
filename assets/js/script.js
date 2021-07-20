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
var yourScore = document.getElementById("yourScore")

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
  makeQuestion();
  quiz.style.display = "block";
  timer();
}

function checkAnswer(answer){
  if( answer == questions[currentQuestion].answer){
      console.log(questions[currentQuestion].answer)
      console.log(answer)
      //score++;
      answerIsCorrect();
  }else{
      answerIsWrong();
  }
  count = 0;
  if(currentQuestion < lastQuestion){
      currentQuestion++;
      makeQuestion();
  }else{
    yourScore.style.display = "block";
    quiz.style.display = "none";
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
}

function showHighScores(){
  yourScore.style.display = "block";
  quiz.style.display = "none";
}

function timer(){
  var sec = 70;
  var timer = setInterval(function(){
      document.getElementById('timerDisplay').innerHTML='00:'+sec;
      sec--;
      if (sec < 0) {
          clearInterval(timer);
      }
      /*if (previousAnswer == "<div class=\"pAnswer\">Incorrect!</div>") {
      document.getElementById('timerDisplay').innerHTML='00:'+ (sec - 10000);
      } */
  }, 1000);
}


























/*
setTimeout(
    () => {
        console.log('Hello after 4 seconds');
    },
    4 * 1000
);
*/
