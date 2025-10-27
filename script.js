const questions = [
  {
    question: "Apa yang diatur dalam Pasal 4 Undang-Undang Hak Cipta?",
    answers: [
      { text: "Jenis ciptaan yang dilindungi", correct: true },
      { text: "Sanksi pidana pelanggaran hak cipta", correct: false },
      { text: "Masa berlaku hak cipta", correct: false },
      { text: "Hak moral pencipta", correct: false },
    ],
  },
  {
    question: "Pasal 5 Hak Cipta menjelaskan tentang...",
    answers: [
      { text: "Hak moral pencipta", correct: true },
      { text: "Hak ekonomi pencipta", correct: false },
      { text: "Prosedur pendaftaran ciptaan", correct: false },
      { text: "Ciptaan yang tidak dilindungi", correct: false },
    ],
  },
  {
    question: "Pasal 6 Hak Cipta menjelaskan tentang...",
    answers: [
      { text: "Pencipta sebagai pemegang hak cipta pertama", correct: true },
      { text: "Pemindahan hak cipta", correct: false },
      { text: "Lisensi hak cipta", correct: false },
      { text: "Ciptaan untuk pendidikan", correct: false },
    ],
  },
  {
    question: "Menurut Pasal 4, apa contoh ciptaan yang dilindungi?",
    answers: [
      { text: "Program komputer dan musik", correct: true },
      { text: "Ide yang belum diwujudkan", correct: false },
      { text: "Metode bisnis", correct: false },
      { text: "Rumor publik", correct: false },
    ],
  },
  {
    question: "Apa yang menjadi hak moral utama dalam Pasal 5?",
    answers: [
      { text: "Hak untuk tetap mencantumkan nama pencipta", correct: true },
      { text: "Hak untuk menjual ciptaan", correct: false },
      { text: "Hak untuk memodifikasi ciptaan orang lain", correct: false },
      { text: "Hak untuk mencabut izin publikasi", correct: false },
    ],
  },
  {
    question: "Siapa pemegang hak cipta pertama menurut Pasal 6?",
    answers: [
      { text: "Pencipta karya tersebut", correct: true },
      { text: "Penerbit", correct: false },
      { text: "Negara", correct: false },
      { text: "Lembaga pendidikan", correct: false },
    ],
  },
  {
    question: "Ciptaan seperti lagu dan puisi termasuk dalam pasal berapa?",
    answers: [
      { text: "Pasal 4", correct: true },
      { text: "Pasal 5", correct: false },
      { text: "Pasal 6", correct: false },
      { text: "Pasal 7", correct: false },
    ],
  },
  {
    question: "Hak moral dalam Pasal 5 berarti pencipta memiliki hak untuk?",
    answers: [
      { text: "Dihargai dan diakui sebagai pencipta", correct: true },
      { text: "Menjual ciptaannya", correct: false },
      { text: "Memberikan lisensi pada pihak lain", correct: false },
      { text: "Menggandakan ciptaan", correct: false },
    ],
  },
];

const startScreen = document.getElementById("start-screen");
const nameInput = document.getElementById("name-input");
const startButton = document.getElementById("start-btn");

const quizBox = document.getElementById("quiz-box");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

const resultContainer = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;
let userName = "";

startButton.addEventListener("click", () => {
  const nameValue = nameInput.value.trim();
  if (nameValue === "") {
    alert("Masukkan namamu dulu ya!");
    return;
  }
  userName = nameValue;
  startScreen.classList.add("hidden");
  quizBox.classList.remove("hidden");
  startQuiz();
});

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Pertanyaan Selanjutnya";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(button, correct) {
  if (correct) {
    button.style.backgroundColor = "#4caf50";
    score++;
  } else {
    button.style.backgroundColor = "#f44336";
  }

  Array.from(answerButtons.children).forEach((btn) => (btn.disabled = true));
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  resultContainer.innerHTML = `
    <p>🎉 Kuis selesai, <strong>${userName}</strong>!</p>
    <p>Skor kamu: <strong>${score}</strong> dari <strong>${questions.length}</strong></p>
    <button class="btn" onclick="location.reload()">Main Lagi</button>
  `;
}
