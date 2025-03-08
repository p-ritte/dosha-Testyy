const questions = [
    { 
        question: "Wie ist deine Körperstruktur?", 
        answers: ["Schlank und leicht", "Muskulös und athletisch", "Stabil und kräftig"], 
        dosha: ["va", "pi", "ka"]
    },
    { 
        question: "Wie ist dein Hauttyp?", 
        answers: ["Trocken und rau", "Empfindlich und rötlich", "Weich und ölig"], 
        dosha: ["va", "pi", "ka"]
    }
];

let currentQuestionIndex = 0;
let answersSelected = [];

document.getElementById("start-test").addEventListener("click", () => {
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("question-container").classList.remove("hidden");
    showQuestion();
});

function showQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question-title").textContent = questionData.question;
    
    const answerButtons = document.getElementById("answer-buttons");
    answerButtons.innerHTML = "";

    questionData.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => selectAnswer(index));
        answerButtons.appendChild(button);
    });

    updateSidebar();
}

function selectAnswer(index) {
    answersSelected[currentQuestionIndex] = questions[currentQuestionIndex].dosha[index];
    document.getElementById("next-question").classList.remove("hidden");
}

document.getElementById("next-question").addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        document.getElementById("next-question").classList.add("hidden");
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById("question-container").classList.add("hidden");
    document.getElementById("result-container").classList.remove("hidden");

    const doshaCounts = { va: 0, pi: 0, ka: 0 };
    answersSelected.forEach(dosha => doshaCounts[dosha]++);
    
    let dominantDosha = Object.keys(doshaCounts).reduce((a, b) => doshaCounts[a] > doshaCounts[b] ? a : b);

    const doshaNames = { va: "Vata", pi: "Pitta", ka: "Kapha" };
    document.getElementById("result-text").textContent = `Dein dominantes Dosha ist: ${doshaNames[dominantDosha]}`;
}

function updateSidebar() {
    const questionList = document.getElementById("question-list");
    questionList.innerHTML = "";

    questions.forEach((q, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Frage ${index + 1}`;
        listItem.classList.toggle("active", index === currentQuestionIndex);
        questionList.appendChild(listItem);
    });
}
