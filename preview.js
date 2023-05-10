`use strict`;

////////////////////////////////////////////////////////////////////////s
// DOM ELEMENTS
const questionSection = document.querySelector(".Questions_Container");

// GETTING DATA FROM THE LOCAL STORAGE
const JParquestions = JSON.parse(localStorage.getItem(`quesAns`));

// Function for adding the questions to UI from localStorage

// function addQuestionsUI(questions) {
//   questionSection.innerHTML = ``;
//   for ([key, value] of Object.entries(questions)) {
//     questionSection.innerHTML += `
//     <div class="Question_Container">
//         <p class="question">
//          ${Number(key) + 1} - ${value.question}
//         </p>
//     </div>`;
//   }
// }

// addQuestionsUI(JParquestions);
questionSection.innerHTML = ``;
for (i = 0; i < JParquestions.length; i++) {
  questionSection.innerHTML += `
    <div class="Question_Container">
         <p class="question">
         ${i + 1} - ${JParquestions[i].question}
       </p>
   </div>`;
}
