var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

// If we click start/reset button
document.getElementById("startreset").onclick = function(){
    
    // If we are playing
    if(playing == true){
        // Reload the page
        location.reload();
    }
    // If we are not playing
    else{
        // Game mode change by playing
        playing = true;
        // At the begining score will be 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        // Show timer
        show("timeremaining");
        // The duration of the timer will be 60s
        timeremaining = 60;
        // We don't need gameOver box yet, hence we hide that
        hide("gameOver");
        // Instead of "Start Game" name start/reset button name will be "Reset Game"
        document.getElementById("startreset").innerHTML = "Reset Game";
        // Start countdown
        startCountdown();
        // Next every correct answer generate new Q&A
        generateQA();
    }
}

// Box clicking function
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
        // Check if we are playing     
        if(playing == true){ // Definetely, yes
            if(this.innerHTML == correctAnswer){
            // Correct answer, ncrease score by 1 score
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                // Answer is correct, hence hide wrong window and show correct window
                hide("wrong");
                show("correct");
                // After one second the function will hide both windows
                setTimeout(function(){
                    hide("correct");   
                }, 1000);
                // Generate new Q&A
                generateQA();
            }
            // If answer will be wrong 
            else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");   
                }, 1000);
            }
        }
    }   
}
// All function name definition

// Start countdown
function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        // If 
        if(timeremaining == 0){
            stopCountdown();
            show("gameOver");
         document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";   
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);    
}

// Stop countdown
function stopCountdown(){
    clearInterval(action);   
}

// Hide function
function hide(Id){
    document.getElementById(Id).style.display = "none";   
}

// Show function
function show(Id){
    document.getElementById(Id).style.display = "block";   
}

// Generate new question with multiple answers
function generateQA(){
    var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    // Fill boxes with the random number(correct and wrongs)
    var correctPosition = 1+ Math.round(3*Math.random());
    // Fill one box with the correct answer
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;    
    // Fill other boxes with wrong answers
    var answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if(i != correctPosition) {
            var wrongAnswer;
            do{
                wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); //a wrong answer
            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}


// animation

// function showText() {
//     timeremaining.style.backgroundColor = "red"
// }

// const btn = document.getElementById('startreset');

// timeremaining.addEventListener('click', function onClick() {
//   timeremaining.style.backgroundColor = 'salmon';
//   timeremaining.style.color = 'white';
// });
