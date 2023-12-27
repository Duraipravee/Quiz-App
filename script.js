//createing array for questions data
const QuestionsData = [
    {
        Question:'which is largest animal in the world',
        answers:[
            {text: 'shark',correct:false},
            {text: 'blue whale',correct:true},
            {text: 'Ele',correct:false},
            {text: 'Giraffe',correct:false}
        ]
    },
    {
        Question:'which is best programming langage',
        answers:[
            {text: 'java',correct:false},
            {text: 'C++',correct:false},
            {text: 'Python',correct:true},
            {text: 'PHP',correct:false}
        ]
    },
    {
        Question:'which is the best database',
        answers:[
            {text: 'mysql',correct:false},
            {text: 'mangoDB ',correct:true},
            {text: 'NOsql',correct:false},
            {text: 'Ms xl',correct:false}
        ]
    },
    {
        Question:'which is the best framework',
        answers:[
            {text: 'React Js',correct:false},
            {text: 'Express Js',correct:false},
            {text: 'Node Js',correct:true},
            {text: 'springBoot',correct:false}
        ]
    }
    
]

const Question = document.getElementById('question');
const answerButton = document.querySelector('.ans-button');
const nextButton = document.getElementById('next-btn');


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = QuestionsData[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    Question.innerHTML = `${questionNo} . ${currentQuestion.Question}`

    currentQuestion.answers.forEach(answers =>{
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add('btn');
        answerButton.append(button);

        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener('click',selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }

}

function selectAnswer(a){
    const selectBtn = a.target;//button
    const isCorrect = selectBtn.dataset.correct === 'true';
    if(isCorrect){
        selectBtn.classList.add('correct');
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct== 'true'){
            button.classList.add("correct");
        }
        button.disabled= true;
    });
    nextButton.style.display = 'block'
}


function handleNextButton(){
    currentQuestionIndex ++;
    if(currentQuestionIndex<QuestionsData.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    Question.innerHTML = `you scored ${score} out of ${QuestionsData.length}`
    nextButton.innerHTML= "play Again"
    nextButton.style.display ="block"
}




//main function
nextButton.addEventListener('click',function(){
    if(currentQuestionIndex<QuestionsData.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz()