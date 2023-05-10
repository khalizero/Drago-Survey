`use strict`;
// DOM ELEMENTS

const questAnsContainer = document.querySelector(`.all_quesAns_container`);
const answersContainer = document.querySelector(".survey__Ans");
const nextBtn = document.querySelector(".next_btn");
const finishBtn = document.querySelector(".finish_btn");
const headerPara = document.querySelector(".headerPara");
const answersTable = document.querySelector(".answers_table");
const percent = document.querySelector(".percent");
const timer = document.querySelector(".timer");

// Getting data from local Storage
const quesAns = JSON.parse(localStorage.getItem(`quesAns`));

// Making some global variables
let targetEl;
let current;
let secs = 10;
// Correct answers Array
let correctAnswers = [];
let selectedAnswers = [];
let play;
/////////////////////////////////////////
// Changing the look of selected answer
function answerSelect(container) {
  container.addEventListener(`click`, function (e) {
    targetEl = e.target.closest(`.survey__Btn`);
    if (!targetEl) return;
    let buttons = document.querySelectorAll(".survey__Btn");
    buttons.forEach((el) => el.classList.remove(`btnGreen`));
    targetEl.classList.add(`btnGreen`);

    // Showing next btn
    if (current < quesAns.length - 1) {
      nextBtn.classList.remove(`hidden`);
    }
  });
}

/////////////////////////////////////////////
// Adding questions and answers
function startQuestions() {
  current = 0;
  let html = ``;
  html = `
   <section class="survey__quesAns">
        <div class="survey__Ques">
          <p>${current + 1} - ${quesAns[current].question}</p>
        </div>
        <div class="survey__Ans">
          <button class="survey__Btn">${
            quesAns[current].answer[0].text
          }</button>
          <button class="survey__Btn">${
            quesAns[current].answer[1].text
          }</button>
          <button class="survey__Btn">${
            quesAns[current].answer[2].text
          }</button>
          <button class="survey__Btn">${
            quesAns[current].answer[3].text
          }</button>
        </div>
      </section>
  `;
  if (questAnsContainer) {
    questAnsContainer.innerHTML = ``;
    questAnsContainer.innerHTML = html;
  }

  // Moving to the next question
  nextBtn.addEventListener(`click`, nextBtnFun);

  /// Next Btn function
  function nextBtnFun() {
    current++;
    secs = 10;
    html = `
   <section class="survey__quesAns">
        <div class="survey__Ques">
          <p>${current + 1} - ${quesAns[current].question}</p>
        </div>
        <div class="survey__Ans">
          <button class="survey__Btn">${
            quesAns[current].answer[0].text
          }</button>
          <button class="survey__Btn">${
            quesAns[current].answer[1].text
          }</button>
          <button class="survey__Btn">${
            quesAns[current].answer[2].text
          }</button>
          <button class="survey__Btn">${
            quesAns[current].answer[3].text
          }</button>
        </div>
      </section>
  `;
    questAnsContainer.innerHTML = html;

    // Pushing selcted answers into the array
    selectedAnswers.push(targetEl.textContent);

    // Changing the next button to finish button
    if (current === quesAns.length - 1) {
      nextBtn.classList.add(`hidden`);
      finishBtn.classList.remove(`hidden`);
    }

    if (nextBtn) {
      this.classList.add(`hidden`);
    }
  }

  // setting the finish button
  finishBtn.addEventListener(`click`, function () {
    selectedAnswers.push(targetEl.textContent);
    compareAnswers(selectedAnswers, correctAnswers);
    this.classList.add(`hidden`);
    timer.classList.add(`hidden`);
  });
}

// Getting the correct answers in an array from local storage
quesAns.forEach((obj1) => {
  let answers = obj1.answer;
  answers.forEach((obj2) => {
    if (obj2.correct === true) {
      correctAnswers.push(obj2.text);
    }
  });
});

// Comparring selected and correct answers
function compareAnswers(selected, correct) {
  correctCount = 0;
  let table = `
      <table>
        <thead>
          <th>Question NO.</th>
          <th>Selected Answer</th>
          <th>Correct Answer</th>
        </thead>
        <tbody>
        `;
  for (let i = 0; i < correct.length; i++) {
    if (selected[i] === correct[i]) {
      table += `
          <tr>
            <td>${i + 1}</td>
            <td>${selected[i]}</td>
            <td>${correct[i]}</td>
          </tr>
     `;
      correctCount++;
    } else if (selected != correct) {
      table += `
          <tr>
            <td>${i + 1}</td>
            <td>${selected[i]}</td>
            <td>${correct[i]}</td>
          </tr>
     `;
    }
  }
  table += `
    </tbody>
      </table>
  `;
  headerPara.textContent = `Your Result`;
  questAnsContainer.classList.add(`hidden`);
  answersTable.classList.remove(`hidden`);
  percent.classList.remove(`hidden`);
  answersTable.innerHTML = table;
  percent.textContent = `You Got ${correctCount} out of ${
    quesAns.length
  } , PERCENTAGE : ${(correctCount / quesAns.length) * 100}%`;
}

/////////////////////////////////
// Calling the functions here
startQuestions();
answerSelect(questAnsContainer);

// The seconds function (TIMER) is here
counter();
let theTime = setInterval(counter, 1000);

////////////////////
//COUNTER FUNCTION
function counter() {
  play = selectedAnswers.length <= correctAnswers.length - 1 ? true : false;

  if (secs < 0) {
    if (current === quesAns.length) {
      compareAnswers(selectedAnswers, correctAnswers);
    }
    if (play === true) {
      timeOutFun();
      clearInterval(theTime);
    }
  } else {
    timer.textContent = `${secs} seconds left`;
    secs--;
  }
}

// Adding enter key to click nextbtn
document.addEventListener(`keydown`, function (e) {
  if (e.key === `Enter`) {
    console.log(`Enter is pressed`);
    if (!nextBtn.classList.contains(`hidden`)) {
      nextBtn.click();
    }
  }
});

// Function to change questions on timeOut
function timeOutFun() {
  selectedAnswers.push(`❌`);
  console.log(quesAns.length, selectedAnswers.length);
  console.log(selectedAnswers);

  // Repeating timeouts
  if (current > quesAns.length - 2) {
    clearInterval(theTime);
    compareAnswers(selectedAnswers, correctAnswers);
  } else {
    secs = 10;
    theTime = setInterval(counter(), 1000);
  }

  // REMOVING THE NEXT BUTTON IF PRESENT
  if (!nextBtn.classList.contains(`hidden`)) {
    nextBtn.classList.add(`hidden`);
  }

  // Increasing the question number
  if (current < quesAns.length - 1) {
    current++;
    html = `
   <section class="survey__quesAns" data-ques="${current}">
        <div class="survey__Ques">
          <p>${current + 1} - ${quesAns[current].question}</p>
        </div>
        <div class="survey__Ans">
          <button class="survey__Btn">${
            quesAns[current].answer[0].text
          }</button>
          <button class="survey__Btn">${
            quesAns[current].answer[1].text
          }</button>
          <button class="survey__Btn">${
            quesAns[current].answer[2].text
          }</button>
          <button class="survey__Btn">${
            quesAns[current].answer[3].text
          }</button>
        </div>
      </section>
  `;
    questAnsContainer.innerHTML = html;
  }
}
