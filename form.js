"use strict";
// DOM ELEMENTS
const questionField = document.querySelector("#addQuestion");
const answerField_1 = document.querySelector("#addAnswer1");
const answerField_2 = document.querySelector("#addAnswer2");
const answerField_3 = document.querySelector("#addAnswer3");
const answerField_4 = document.querySelector("#addAnswer4");
const correctAnswerField = document.querySelector("#correctAnswer");

const addQuestionBtn = document.querySelector(".submit");

/// STORING DATA IN Array -> Object -> Array -> Object
const quesAnsHard = [
  {
    question: `Why so JavaScript and Java have similar name?`,
    answer: [
      { text: `JavaScript is a stripped-down version of Java`, correct: false },
      { text: `JavaScript's syntax is loosely based on Java's`, correct: true },
      { text: `They both originated on the island of Java`, correct: false },
      { text: `None of the above`, correct: false },
    ],
  },
  {
    question: `When a user views a page containing a JavaScript program, which machine actually executes the script?`,
    answer: [
      { text: `The User's machine running a Web browser`, correct: true },
      { text: `The Web server`, correct: false },
      {
        text: `A central machine deep within Netscape's corporate offices`,
        correct: false,
      },
      { text: `D.  None of the above`, correct: false },
    ],
  },
  {
    question: `______ JavaScript is also called client-side JavaScript.`,
    answer: [
      { text: ` Microsoft`, correct: false },
      { text: ` Navigator`, correct: true },
      { text: ` LiveWire`, correct: false },
      { text: ` Native`, correct: false },
    ],
  },
  {
    question: `__________ JavaScript is also called server-side JavaScript.`,
    answer: [
      { text: ` Microsoft`, correct: false },
      { text: ` Navigator`, correct: false },
      { text: ` LiveWire`, correct: true },
      { text: ` Native`, correct: false },
    ],
  },
  {
    question: ` What are variables used for in JavaScript Programs?`,
    answer: [
      { text: ` Storing numbers, dates, or other values`, correct: true },
      { text: `  Varying randomly`, correct: false },
      { text: ` Causing high-school algebra flashbacks`, correct: false },
      { text: ` None of the above`, correct: false },
    ],
  },
  {
    question: ` _____ JavaScript statements embedded in an HTML page can respond to user events such as mouse-clicks, form input, and page navigation.`,

    answer: [
      { text: ` Client-side`, correct: true },
      { text: `  Server-side`, correct: false },
      { text: ` Local`, correct: false },
      { text: ` Native`, correct: false },
    ],
  },
  {
    question: ` Which of the following attribute can hold the JavaScript version?`,

    answer: [
      { text: ` LANGUAGE`, correct: true },
      { text: `  SCRIPT`, correct: false },
      { text: ` VERSION`, correct: false },
      { text: ` None of the above`, correct: false },
    ],
  },
  {
    question: ` Which of the following can't be done with client-side JavaScript?`,

    answer: [
      { text: `Validating a form`, correct: false },
      { text: `Sending a form's contents by email`, correct: false },
      {
        text: `Storing the form's contents to a database file on the server`,
        correct: true,
      },
      { text: `None of the above`, correct: false },
    ],
  },
  {
    question: `Which of the following are capabilities of functions in JavaScript?`,
    answer: [
      { text: `Return a value`, correct: false },
      { text: `Accept parameters and Return a value`, correct: false },
      { text: `Accept parameters`, correct: true },
      { text: ` None of the above`, correct: false },
    ],
  },
  {
    question: `Which of the following is not a valid JavaScript variable name?`,
    answer: [
      { text: `2names`, correct: true },
      { text: ` _first_and_last_names`, correct: false },
      { text: `FirstAndLast`, correct: false },
      { text: `None of the above`, correct: false },
    ],
  },
];

// Storing all the data in the local storage
function render() {
  if (localStorage.quesAns) {
    return;
  } else {
    const JStrquestions = JSON.stringify(quesAnsHard);
    localStorage.setItem(`quesAns`, JStrquestions);
  }
}
render();
////////////////////////////////////////////////////////
////    ADDING QUESTIONS TO LOCAL STORAGE

addQuestionBtn.addEventListener(`click`, function (e) {
  e.preventDefault();
  let truth;
  switch (correctAnswerField.value) {
    case answerField_1.value:
      console.log(`1 is true`);
      break;
    case answerField_2.value:
      console.log(`2 is true`);
      break;
    case answerField_3.value:
      console.log(`3 is true`);
      break;
    case answerField_4.value:
      console.log(`4 is true`);
      break;

    default:
      console.log(`nothing is true`);
      break;
  }
  const newQuestion = {
    question: questionField.value,
    answer: [
      {
        text: answerField_1.value,
        correct:
          answerField_1.value === correctAnswerField.value ? true : false,
      },
      {
        text: answerField_2.value,
        correct:
          answerField_2.value === correctAnswerField.value ? true : false,
      },
      {
        text: answerField_3.value,
        correct:
          answerField_3.value === correctAnswerField.value ? true : false,
      },
      {
        text: answerField_4.value,
        correct:
          answerField_4.value === correctAnswerField.value ? true : false,
      },
    ],
  };

  // Saving data in local storage depending on situations
  let quesAns;
  if (
    questionField.value != `` &&
    answerField_1.value != `` &&
    answerField_2.value != `` &&
    answerField_3.value != `` &&
    answerField_4.value != `` &&
    correctAnswerField.value != ``
  ) {
    if (localStorage.quesAns) {
      quesAns = JSON.parse(localStorage.getItem(`quesAns`));
      quesAns.push(newQuestion);
      const quesAnsStringify = JSON.stringify(quesAns);
      localStorage.setItem(`quesAns`, quesAnsStringify);
    } else {
      quesAnsHard.push(newQuestion);
      const JStrquestions = JSON.stringify(quesAnsHard);
      localStorage.setItem(`quesAns`, JStrquestions);
    }

    // RESETTING ALLL FIELDS
    questionField.value = ``;
    answerField_1.value = ``;
    answerField_2.value = ``;
    answerField_3.value = ``;
    answerField_4.value = ``;
    correctAnswerField.value = ``;

    console.log(quesAns);
  }
});
