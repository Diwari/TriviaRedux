let quizArea = $("#quiz-screen");
let countStart = 30;
let timer;


let questions = [{
  question: "In 2018 Which famous wrestler protrayed Cody Travers in his Street Fighter 5 reveal trailer?",
  answers: ["Egde ", "Booker T", "Kenny Omega", " Kane"],
    correctAnswer: "Kenny Omega",
    image:"assets/images/Mayor.gif"
  }, {
    question: 'In the Show Only Fools and Horse, the line "You Plonker" was the catchphrase of which character ',
    answers: ["Simon Cowell", "Derrick (Del Boy) Trotter", "David Beckham", "Trigger"],
    correctAnswer: "Derrick (Del Boy) Trotter",
    image:"assets/images/hooray.gif"
  }, {
    question: '"You are the Weakest link" was the tag line of which person',
    answers: ["Sharon Osborne", "Troy Baker", "Anne Robinson", "Bill O'Reilly"],
    correctAnswer: "Anne Robinson",
    image:"assets/images/you-are-the-weakest-link-gif-3.gif"
  }, {
    question: 'Which actor played the 9th doctor when Dr.Who returned to tv in march of 2005?',
    answers: ["Carol Vordamen", "Chris Tarent", "Christopher Eccleston", "David Cage"],
    correctAnswer: "Christopher Eccleston",
    image:"assets/images/Fantastic.gif"
  }, {
    question: 'What are King DeeDeeDees Minions called',
    answers: ["Goombas", "Badnicks", "Waddle Dees", "Minions"],
    correctAnswer: "Waddle Dees",
    image:"assets/images/HappyDee.gif"
  }, {
    question: 'What is the name of the fictional nation ruled over by Dr. Victor Von Doom?',
    answers: ["Wakanda", "Turkmenistan", "Kurdistan", "Latveria"],
    correctAnswer: "Latveria",
    image:"https://media1.tenor.com/images/ee7e9cd02a5af61e06a08d5a085b2b18/tenor.gif?itemid=10415603"
  }, {
    question: "Which of these is not a Flying Wyvern",
    answers: ["Diablos", "Tigrex", "Brachydios", "Rathalos"],
    correctAnswer: "Brachydios",
    image:"assets/images/Brachy.gif"
  }, {
    question: "Megaman was created by who",
    answers: ["Shigeru Miyamoto", "Masahiro Sakurai", "Keiji Inafune", "Hideo Kojima"],
    correctAnswer: "Keiji Inafune",
    image:"assets/images/Megahappy.gif"
  }];
  
  let game = {
    questions:questions,
    currentQuestion:0,
    counter:countStart,
    correct:0,
    incorrect:0,
    countdown: function(){
      console.log(game.counter--)
      // game.counter--;
      $("#counter-num").text(game.counter);
      
      if (game.counter === 0){
        console.log("Time Up!");
        game.timeUp();
      }
    },
    loadQuestion: function(){

      setInterval(function(){}, 1000)
     setInterval(game.countdown, 1000);
      quizArea.html("<h2>" + questions[this.currentQuestion].question + "</h2>" );
      
      for(let i = 0; i<questions[this.currentQuestion].answers.length; i++){
        
        quizArea.append("<button class='answer-button' id='button'" + "data-name='" + questions[this.currentQuestion].answers[i] + "'>" + questions[this.currentQuestion].answers[i] + "</buttons>")
      }
    },
    nextQuestion: function(){
      game.counter = countStart;
      $("#counter-number").html(game.counter);
      game.currentQuestion++;
      game.loadQuestion();
    },
    timeUp: function(){
      clearInterval(timer);
      $("#counter-number").html(game.counter);

      quizArea.html("<h2>Out of Time!</h2>");
      quizArea.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
      

      if (game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 3 * 1000);
      }else{
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
    results: function(){
      clearInterval(timer);
      quizArea.html("<h2>Here's how you did</h2>")
      $("#counter-number").html(game.counter);
      quizArea.append("<h3>Right Answers: " + game.correct + "</h3>");
      quizArea.append("<h3>Wrong Answers: " + game.incorrect + "</h3>");
      quizArea.append("<h3>Skipped: " +(questions.length - (game.incorrect + game.correct)) + "</h3>");
      quizArea.append("<br><button id='restart'>Try Again?</button>");
      

      quizArea.html
    },

    clicked: function(e){
      clearInterval(timer);

      if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
        this.answeredCorrectly();
      } else{
        this.answeredIncorrectly();
      }
    },
    answeredIncorrectly: function(){
      game.incorrect++;
      clearInterval(timer);
      quizArea.html("<h2>Wrong!</h2>");
      // quizArea.append("<img src='" + questions[game.currentQuestion].image +"' />");

      if(game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 3 * 1000);
      } else{
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
    answeredCorrectly: function(){
      clearInterval(timer);
      game.correct++;
      quizArea.html("<h2>Right!</h2>");
      quizArea.append("<img src='" + questions[this.currentQuestion].image + "' />");
      // quizArea.append("img src'" + questions[game.currentQuestions].image + "' />");
      
      if(game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 3 * 1000);
        
      }else{
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
      reset: function(){
        this.currentQuestion = 0;
        this.correct = 0;
        this.incorrect = 0
        this.loadQuestion();
      }
  };
  $(document).on("click", ".answer-button", function(event){
    game.clicked(event);
  })
  $(document).on("click", "#restart", function(e){
    game.reset();
  });
  
  $(document).on("click", "#start", function(e){
    $("#subwrapper").prepend("<h2>Time Remaining: <span id='counter-num'>30</span> Seconds</h2>");
  
    game.loadQuestion();
  });

  
  