
console.log("its working");

//we will use this variable to target the quiz area to dump info into
var quiz = $('#quiz-area');
// start count variable for each question
var countStartNumber = 30;


//our question data set
var questions = [{
    question: "In which state does Ben and Jerry's Company operate?",
    answers: ["New York", "Vermont", "California", "Texas"],
    correctAnswer: "Vermont", 
    image:".."
}, {
    question: "Which flavor of icecream was the first in existence?",
    answers: ["Vanilla", "Chocolate", "Strawberry/Cherry", "Honey"],
    correctAnswer: "Strawberry/Cherry",
    inmage: ".."
}, {
    question: "Which company created the flavor Bunny Tracks?",
    answers: ["Haagen Daas", "Blue Bunny", "Dryers", "Ben and Jerry's"],
    correctAnswer: "Blue Bunny",
    image: ".."
},
{
    question: "Which company was the first to sell Chocolate Chip Cookie Dough Icecream?",
    answers: ["Haagen Daas", "Ben and Jerry's", "Bryers", "Blue Bunny"],
    correctAnswer: "Ben and Jerry's",
    image: ".."

}];

//here we define our click events, some of these buttons will need to be created further down
$(document).on("click", "#start-over", function(a){
    game.reset();
});

$(document).on("click", ".answer-button", function(a){
    game.clicked(a);
});

$(document).on("click", "#start", function(a){
    $("#subwrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds<h2>");
    game.loadQuestion();
});


//game variable, starts game, defines beginning values, loads questions
var game = {
    questions:questions,
    currentQuestion:0,
    counter:countStartNumber,
    correct:0,
    incorrect:0,
    

    countdown:function(){
    game.counter--;
    $("#counter-number").html(game.counter);

    if (game.counter === 0){
        console.log("TIMES UP");
        game.timeUp();
    }
},
loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>" );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
        panel.append("<button class='answer-button' id='button'" + "data-name='" + questions[this.currentQuestion].answers[i] + "'>" + questions [this.currentQuestion].answers[i] + "</button>");
    }
},



};