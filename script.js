const questions = [
    { question: "Wie ist dein Körperbau?", answers: ["Schlank (va)", "Muskulös (pi)", "Stark & robust (ka)"], type: ["va", "pi", "ka"] },
    { question: "Wie ist dein Energielevel?", answers: ["Unbeständig (va)", "Mittelmäßig (pi)", "Stabil (ka)"], type: ["va", "pi", "ka"] },
    { question: "Wie reagierst du auf Stress?", answers: ["Ängstlich (va)", "Wütend (pi)", "Gelassen (ka)"], type: ["va", "pi", "ka"] },
];

let currentQuestion = 0;
let scores = { va: 0, pi: 0, ka: 0 };

function startTest() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }
    document.getElementById("question-text").innerText = questions[currentQuestion].question;
    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";
    
    questions[currentQuestion].answers.forEach((answer, index) => {
        let button = document.createElement("button");
        button.innerText = answer;
        button.onclick = () => {
            scores[questions[currentQuestion].type[index]]++;
            currentQuestion++;
            showQuestion();
        };
        answersContainer.appendChild(button);
    });
}

function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";

    let highestDosha = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    let doshaText = highestDosha === "va" ? "Vata" : highestDosha === "pi" ? "Pitta" : "Kapha";
    
    document.getElementById("dosha-result").innerText = `Dein dominantes Dosha ist: ${doshaText}`;
}
