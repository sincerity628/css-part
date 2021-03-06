const formBox = document.getElementById('form-box');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const inputGroup = document.getElementById('input-group');
const inputField = document.getElementById('input-field');
const inputLabel = document.getElementById('input-label');
const inputProgress = document.getElementById('input-progress');
const progressBar = document.getElementById('progress-bar');

// the questions
const questions = [
  { content: 'Enter your first name' },
  { content: 'Enter your last name' },
  { content: 'Enter your email', pattern: /\S+@\S+\.\S+/ },
  { content: 'Enter your password', type: 'password' }
];

// the input box shake time
const shakeTime = 100;
// transition before the result
const switchTime = 600;

// the problem start index
let questionIndex = 0;

// get the question from the questions array and set it to the DOM
function getQuestion() {
  // get the current question
  inputLabel.innerText = questions[questionIndex].content;
  // set the input type
  inputField.type = questions[questionIndex].type || 'text';
  // set the input answer
  inputField.value = questions[questionIndex].answer || '';

  inputField.focus();

  // set the progress bar
  progressBar.style.width = (questionIndex / questions.length) * 100 + '%';

  // set the top left corner icon
  prevBtn.className = questionIndex ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();
}

// show the question to the DOM
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
}

// hide the questions from theDOM
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
}

// show the previous question
function prevQuestion() {
  if(questionIndex === 0) {
    return;
  }
  // set the primary color
  document.body.classList.remove('error');

  // move to the previous question
  questionIndex --;

  // hide the current question
  hideQuestion();

  // show the question
  getQuestion();
}

// make the form shake
function shake(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// check if the value inside the input is valid
function validate() {
  // /.+/: tests for one or more characters.
  if(inputField.value.match(questions[questionIndex].pattern || /.+/)) {
    inputPass();
  } else {
    inputFail();
  }
}

// hide everything from the DOM
function hideEverything() {
  // hide the progress bar
  progressBar.style.display = 'none';

  // hide quesiotn
  hideQuestion();

  // hide the buttons
  prevBtn.style.display = 'none';
  nextBtn.style.display = 'none';

  // hide the whole form box
  formBox.style.transition = 'width 0.6s ease-in-out';
  formBox.style.width = '0';
}

// end the input process
function endInput() {
  // hide everything from the DOM
  hideEverything();

  setTimeout(showResult, switchTime)
}

// show the appreciation
function showResult() {
  document.body.innerHTML = `
    <div class="container">
      <h1 class="logo">Fancy Form</h1>
      <div class="result">
        Thanks ${ questions[0].answer } You are registered and will get an emial shortly.
      </div>
    </div>
  `;
}

// the input is invalid
function inputFail() {
  // set the error class
  document.body.classList.add('error');

  // get the form box shake
  for(let i = 0; i < 6; i++) {
    setTimeout(shake, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(shake, shakeTime * 6, 0, 0);
  }
}

// the input is valid
function inputPass() {
  // shake the form box
  setTimeout(shake, shakeTime * 0, 0, 10);
  setTimeout(shake, shakeTime * 1, 0, 0);

  // set the primary color
  document.body.classList.remove('error');

  // store the value in the questions array
  questions[questionIndex].answer = inputField.value;

  // move to the next question
  questionIndex++;

  if(questions[questionIndex]) {
    hideQuestion();
    getQuestion();
  } else {
    endInput();
  }
}

// event listeners
document.addEventListener('DOMContentLoaded', getQuestion);

nextBtn.addEventListener('click', validate);
prevBtn.addEventListener('click', prevQuestion);
