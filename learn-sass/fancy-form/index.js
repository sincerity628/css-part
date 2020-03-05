const formBox = document.getElementById('form-box');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const inputGroup = document.getElementById('input-group');
const inputField = document.getElementById('input-field');
const inputLabel = document.getElementById('input-label');
const inputProgress = document.getElementById('input-progress');
const progressBar = document.getElementById('progress-bar');

// color
const primaryColor = '#527318';
const errorColor = '#8b1b17';

// the questions
const questions = [
  { content: 'Enter your first name' },
  { content: 'Enter your last name' },
  { content: 'Enter your email', pattern: /\S+@\S+\.\S+/ },
  { content: 'Enter your password', type: 'password' }
];

// the input box shake time
const shakeTime = 100;
// transition between 2 questions
const switchTime = 300;

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
}

// show next question
function showNext() {
  questionIndex++;
  // check if it is the last question
  if(questionIndex === questions.length) {
    endInput();
    return;
  }

  showQuestion();
}

// make the form shake
function shake(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// finished the input progress
function finishInput() {
  console.log('finish');
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

// the input is invalid
function inputFail() {
  // set the error class
  formBox.classList.add('error');
  // set the background color into error color
  document.body.style.backgroundColor = errorColor;
  // get the form box shake
  for(let i = 0; i < 6; i++) {
    setTimeout(shake, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(shake, shakeTime * 6, 0, 0);
  }
}

// the input is valid
function inputPass() {
  // remove the error class
  formBox.classList.remove('error');
  // set background color to the original
  document.body.style.backgroundColor = primaryColor;
  // clear the input value
  inputField.value = '';

  // hide the questions
  hideQuestion();

  // show next question
  showNext();
}

// event listeners
document.addEventListener('DOMContentLoaded', getQuestion);

nextBtn.addEventListener('click', validate);
