
var userScore = 0;
var generatedQues;

function displayPage2(){
    document.querySelector('.page1').style.display = "none";
	document.querySelector('.page2').style.display = "flex";
    setUserName();
    setScore();
    generateQues();
}

function setUserName(){
    var userName = document.querySelector('.userName').value;
    document.querySelector('.setUserName').innerHTML += (userName+"👋");
}

function setScore(){
    document.querySelector('.score').innerHTML = userScore;
}

function generateQues(){
    var len = userScore.toString().length;
    generatedQues = "";

    const numbers = "0123456789";
    const symbols = "+-*/";

    var i=len;
    while(i>0){
       generatedQues += getNumber();
        i--;
    }

    generatedQues += getSymbol();

    var j=len;
    while(j>0){
       generatedQues += getNumber();
        j--;
    }

    function getSymbol(){
        return symbols[Math.floor(Math.random()*symbols.length)];
    }

    function getNumber(){
        return numbers[Math.floor(Math.random()*numbers.length)];
    }

    setQues();
}

function setQues(){
    document.querySelector('.ques').innerHTML = generatedQues;
}

function checkResult(){
    var ans = parseInt(document.querySelector('.ans').value);

    if(ans === evaluateAns(generatedQues)){
        updateScore();
        resetAns();
        generateQues();
    }else{
        displayEndWin();
    }
}

function displayEndWin(){
    
    document.querySelector('.page2').style.display = "none";
	document.querySelector('.page3').style.display = "flex";
    setEndPage();
}

function evaluateAns(ques){
    return parseInt(eval(ques));
}

function updateScore(){
    userScore++;
    setScore();
}

function resetAns(){
    document.querySelector('.ans').value = "";
}

function setEndPage(){
    document.querySelector('.displayScore').innerHTML += (userScore+" ✨");
}
