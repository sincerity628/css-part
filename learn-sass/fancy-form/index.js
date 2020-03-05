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

// event listeners
document.addEventListener('DOMContentLoaded', getQuestion);
