const questions = [
  // Pasal 4
  {
    question: "Apa yang diatur dalam Pasal 4 Undang-Undang Hak Cipta?",
    answers: [
       { text: "Hak moral pencipta", correct: false },
      { text: "Sanksi pidana pelanggaran hak cipta", correct: false },
      { text: "Masa berlaku hak cipta", correct: false },
     { text: "Jenis ciptaan yang dilindungi", correct: true },
    ],
  },
  {
    question: "Contoh ciptaan yang dilindungi menurut Pasal 4 adalah...",
    answers: [
      { text: "Rumor publik", correct: false }, 
      { text: "Ide atau gagasan yang belum diwujudkan", correct: false },
      { text: "Konsep bisnis", correct: false },
     { text: "Musik, karya tulis, dan program komputer", correct: true },
    ],
  },
  // Pasal 5
  {
    question: "Pasal 5 Hak Cipta menjelaskan tentang...",
    answers: [
    { text: "Hak ekonomi pencipta", correct: false },
        { text: "Hak moral pencipta", correct: true },
      { text: "Prosedur pendaftaran ciptaan", correct: false },
      { text: "Ciptaan yang tidak dilindungi", correct: false },
    ],
  },
  {
    question: "Apa yang dimaksud dengan hak moral dalam Pasal 5?",
    answers: [
      { text: "Hak pencipta untuk tetap diakui sebagai pencipta ciptaan", correct: true },
      { text: "Hak untuk menjual ciptaan", correct: false },
      { text: "Hak untuk menggandakan ciptaan", correct: false },
      { text: "Hak untuk mencabut izin ciptaan", correct: false },
    ],
  },
  // Pasal 6
  {
    question: "Pasal 6 Hak Cipta menjelaskan tentang...",
    answers: [
    { text: "Lisensi hak cipta", correct: false },
      { text: "Pemindahan hak cipta", correct: false },
       { text: "Pencipta sebagai pemegang hak cipta pertama", correct: true }, 
      { text: "Ciptaan untuk pendidikan", correct: false },
    ],
  },
  {
    question: "Siapa pemegang hak cipta pertama menurut Pasal 6?",
    answers: [
      { text: "Penerbit", correct: false },
      { text: "Pencipta karya tersebut", correct: true },
      { text: "Negara", correct: false },
      { text: "Lembaga pendidikan", correct: false },
    ],
  },
  // Pasal 7
  {
    question: "Pasal 7 Hak Cipta mengatur tentang apa?",
    answers: [
     { text: "Hak moral pencipta", correct: false },
      { text: "Jenis ciptaan yang dilindungi", correct: false },
       { text: "Ciptaan yang dibuat dalam hubungan dinas atau pesanan", correct: true },
      { text: "Ciptaan yang sudah berakhir masa perlindungannya", correct: false },
    ],
  },
  {
    question: "Jika suatu karya dibuat dalam hubungan kerja, siapa pemegang hak cipta menurut Pasal 7?",
    answers: [
      { text: "Pihak pemberi kerja, kecuali diperjanjikan lain", correct: true },
      { text: "Pekerja secara mutlak", correct: false },
      { text: "Pemerintah", correct: false },
      { text: "Tidak ada yang berhak", correct: false },
    ],
  },
  {
    question: "Dalam Pasal 7, jika sebuah ciptaan dipesan oleh pihak lain, maka hak cipta ada pada...",
    answers: [
       { text: "Publik", correct: false },
      { text: "Pencipta tetap", correct: false },
      { text: "Pemerintah", correct: false },
     { text: "Pihak yang memesan, kecuali diperjanjikan lain", correct: true },
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
