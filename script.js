let status;
let userScore = 0;
let generatedQues;
let timer;
let timerSec = 5;
let msg = "GAME OVER !!";


// ===== DISPLAY PAGE 2 & START GAME =====

function displayPage2(){
    document.querySelector('.page1').style.display = "none";
	document.querySelector('.page2').style.display = "flex";
    setUserName();
    setScore();
    generateQues();
}


// ===== SET USERNAME =====

function setUserName(){
    const userName = document.querySelector('.userName').value;
    document.querySelector('.setUserName').innerHTML += (userName+"👋");
}


// ===== SET SCOREBOARD =====

function setScore(){
    document.querySelector('.score').innerHTML = userScore;
}


// ===== GENERATE QUESTION =====

function generateQues(){
    let len = userScore.toString().length;
    timerSec = 5*len;
    generatedQues = "";

    const numbers = "0123456789";
    const symbols = "+-*/";
    let lenNum1 = 1;
    let lenNum2 = 1;

    // SET DIFFICULTY BY CHANGING LENGTH OF NUMBERS

    if(len > 1){
        if(len%2 == 0){
            lenNum1++;
        }else{
            lenNum2++;
        }
    }

    // GENERATE 1st NUMBER

    for(let i=0;i<lenNum1;i++){
       generatedQues += getNumber();
    }

    // GENERATE SYMBOL

    generatedQues += getSymbol();

    // GENERATE 2nd NUMBER

    for(let i=0;i<lenNum2;i++){

        // TO AVOID DIVIDE BY ZERO
        if(lenNum2 == 1 && generatedQues.charAt(generatedQues.length-1) === '/'){
            let tempNum2 = getNumber();
            while(tempNum2 == 0){
                tempNum2 = getNumber();
            }
            generatedQues += tempNum2;
        }
        else{
            generatedQues += getNumber();
        }
     }

    function getSymbol(){
        return symbols[Math.floor(Math.random()*symbols.length)];
    }

    function getNumber(){
        return numbers[Math.floor(Math.random()*numbers.length)];
    }

    setQues();
}

// ===== SET QUESTION ON SCREEN & START TIMER =====

function setQues(){
    document.querySelector('.ques').innerHTML = generatedQues;
    clearTimeout(timer);
    countDown(timerSec);
}

// ====== TIMER SETTINGS =====

function countDown(secs) {
	document.querySelector('.timer').innerHTML = "Time Left :  " + secs + " secs";

	if(status === 'end'){
		setMsgScoreOfPage3();
        	displayPage3();
	}else if(secs == 0) {
		msg = "OOPs, TIME's UP!!";
        	setMsgScoreOfPage3();
        	displayPage3();
	}else{
		secs--;
		timer = setTimeout('countDown('+secs+')',1000);
	}
}

// ===== CHECK USER INPUT =====

function checkResult(){
    let ans = parseInt(document.querySelector('.ans').value);

    if(ans === evaluateAns(generatedQues)){
        updateScore();
        resetAns();
        generateQues();
    }else{
        setMsgScoreOfPage3();
        displayPage3();
    }
}

// ===== GET CORRECT ANS =====

function evaluateAns(ques){
    return parseInt(eval(ques));
}

// ===== UPDATE SCORE =====

function updateScore(){
    userScore++;
    setScore();
}

// ===== RESET INPUT SECTION FOR NEXT ANSWER =====

function resetAns(){
    document.querySelector('.ans').value = "";
}


// ===== DISPLAY END PAGE =====

function displayPage3(){
	status = "end";
	document.querySelector('.page2').style.display = "none";
	document.querySelector('.page3').style.display = "flex";
}

// ===== SET DETAILS ON END PAGE =====

function setMsgScoreOfPage3(){
    document.querySelector('.msg').innerHTML = msg;
    document.querySelector('.displayScore').innerHTML = "Score : " + userScore + " ✨";
}