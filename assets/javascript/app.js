//make sure it's connected
console.log("its working");

//we will use this variable to target the quiz area to dump info into
var quiz = $('#quiz-area');
// start count variable for each question
var countStartNumber = 30;
var vermont ='@Url.Content("../../assets/images/vermont.jpg")';

//our question data set
//define each questions, the possible answers, correct answer, and a picture to be displayed after answer is
var questions = [{
    question: "In which state does Ben and Jerry's Company operate?",
    answers: ["New York", "Vermont", "California", "Texas"],
    correctAnswer: "Vermont", 
    image: "./assets/images/vermont.jpg"
}, {
    question: "Which flavor of icecream was the first in existence?",
    answers: ["Vanilla", "Chocolate", "Strawberry/Cherry", "Honey"],
    correctAnswer: "Strawberry/Cherry",
    image: "./assets/images/strawberry.jpg"
}, {
    question: "Which company created the flavor Bunny Tracks?",
    answers: ["Haagen Daas", "Blue Bunny", "Dryers", "Ben and Jerry's"],
    correctAnswer: "Blue Bunny",
    image: "./assets/images/bunny.jpg"
},
{
    question: "Which company was the first to sell Chocolate Chip Cookie Dough Icecream?",
    answers: ["Haagen Daas", "Ben and Jerry's", "Bryers", "Blue Bunny"],
    correctAnswer: "Ben and Jerry's",
    image: "./assets/images/cookie.jpg"

}];

//here we define our click events
$(document).on("click", "#start-over", function(a){
    game.reset();
});

$(document).on("click", ".answer-button", function(a){
    game.clicked(a);
});

$(document).on('click', '#start', function(a) {
    $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    game.loadQuestion();
  });
  


//define our game variable, give us beginning values, start countdown, load questions

var game = {
    questions:questions,
    currentQuestion:0,
    counter:countStartNumber,
    correct:0,
    incorrect:0,
    
//create countdown function
    countdown:function(){
    game.counter--;
    $("#counter-number").html(game.counter);

    if (game.counter === 0){
        console.log("TIMES UP");
        game.timeUp();
    }

},
//create function that create html section to add in question data
loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    quiz.html("<h2>" + questions[this.currentQuestion].question + "</h2>" );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
        quiz.append("<button class='answer-button' id='button'" + "data-name='" + questions[this.currentQuestion].answers[i] + "'>" + questions [this.currentQuestion].answers[i] + "</button>");
    }
},
nextQuestion: function(){
    game.counter = countStartNumber;
    $("#counter-number").html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();

},

//time up function defines what happens when user runs out of 30 second, needs to alert user time is up and display correct answer
timeUp: function (){
    clearInterval(timer);
    $("#counter-number").html(game.counter);

    quiz.html("<h2>Times Up!</h2>");
    quiz.append("<h3>The Correct Answer Is: " + questions[this.currentQuestion].correctAnswer);
    quiz.append("<img src='" + questions[this.currentQuestion].image + "'/>");

if (game.currentQuestion === questions.length - 1){
    setTimeout(game.results, 3 * 1000);
} else {
    setTimeout(game.nextQuestion, 3 * 1000);
}
},
results: function() {
    clearInterval(timer);


quiz.html('<h2>Game Over! Your Score:</h2>');
$('#counter-number').html(game.counter);
quiz.append('<h3>Correct Ansers: ' + game.correct + '<h3>');
quiz.append('<h3>Incorrect Ansers: ' + game.incorrect + '<h3>');
quiz.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
quiz.append('<br><button id="start-over">Start Over?</button>');

},

clicked: function(a) {
    clearInterval(timer);
    if ($(a.target).data("name")=== questions[this.currentQuestion].correctAnswer)
    {
        this.answeredCorrectly();
    } else{
        this.answeredIncorrectly();
    }
},

answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    quiz.html('<h2>Sorry! Wrong Answer</h2>');
    quiz.append('<h3>The Correct Answer was: ' +questions[game.currentQuestion].correctAnswer + '</h3>');
    quiz.append("<img src='" + questions[this.currentQuestion].image + "'/>");

    if (game.currentQuestion === questions.length - 1) {
        setTimeout(game.results, 3 * 1000)
    } else {
        setTimeout(game.nextQuestion, 3* 1000);
    }
},
answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    quiz.html('<h2>Correct!</h2>');
    quiz.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};