// DOM Elementleri
const btnChoiceElements = document.querySelectorAll(".btnChoice");
const gameContainer = document.getElementById("gameContainer");
const timeCountElement = document.getElementById("timeCount");
const computerScoreElement = document.getElementById("computerScore");
const userScoreElement = document.getElementById("userScore");
const userChoiceElement = document.getElementById("user-choice");
const computerChoiceElement = document.getElementById("computer-choice");
const playResultElement = document.getElementById("playResult");
const finishContainerElement = document.getElementById("finishContainer");
const computerFinishScoreElement = document.getElementById("computerFinishScore");
const userFinishScoreElement = document.getElementById("userFinishScore");
const finishGameResultElement = document.getElementById("finishGameResult");

// Oyun Değişkenleri
let computerPoint = 0;
let userPoint = 0;
let time = 30;
let gameTime;

// Oyun Başlatma
const initializeGame = () => {
    btnChoiceElements.forEach(choice =>
        choice.addEventListener("click", () => handleChoice(choice))
    );
};

// Zamanlayıcı
const startCountDown = () => {
    gameTime = setInterval(() => {
        if (time > 0) {
            time--;
            updateTimeDisplay();
        } else {
            finishGame();
        }
    }, 1000);
};

const updateTimeDisplay = () => {
    timeCountElement.textContent = `Kalan Zaman: ${time}`;
};

// Oyuncunun Seçimi
const handleChoice = (choice) => {
    const userChoice = choice.getAttribute("key");
    const computerChoice = getRandomChoice();
    const result = determineWinner(userChoice, computerChoice);

    updateChoices(userChoice, computerChoice);
    updateScore(result);
    updateResultMessage(result);

    disableButtonsTemporarily();
};

// Bilgisayarın Seçimi
const getRandomChoice = () => {
    const choices = ["Taş", "Kağıt", "Makas"];
    return choices[Math.floor(Math.random() * choices.length)];
};

// Kazananı Belirleme
const determineWinner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) return "draw";
    if (
        (userChoice === "Taş" && computerChoice === "Makas") ||
        (userChoice === "Makas" && computerChoice === "Kağıt") ||
        (userChoice === "Kağıt" && computerChoice === "Taş")
    ) return "win";
    return "lose";
};

// Skoru Güncelleme
const updateScore = (result) => {
    if (result === "win") userPoint++;
    if (result === "lose") computerPoint++;
    userScoreElement.textContent = userPoint;
    computerScoreElement.textContent = computerPoint;
};

// Seçimleri Güncelleme
const updateChoices = (userChoice, computerChoice) => {
    userChoiceElement.textContent = userChoice;
    computerChoiceElement.textContent = computerChoice;
};

// Sonuç Mesajını Güncelleme
const updateResultMessage = (result) => {
    const resultMessages = {
        win: { text: "KAZANDINIZ", className: "winStyle", icon: "fa fa-smile-o" },
        lose: { text: "KAYBETTİNİZ", className: "lostStyle", icon: "fa fa-frown-o" },
        draw: { text: "BERABERE", className: "drawStyle", icon: "fa fa-meh-o" },
    };
    const { text, className, icon } = resultMessages[result];
    playResultElement.innerHTML = `${text} <i class="${icon}" style="margin-left: 8px;font-size:24px;"></i>`;
    playResultElement.className = className;
};

// Butonları Geçici Olarak Devre Dışı Bırakma
const disableButtonsTemporarily = () => {
    btnChoiceElements.forEach(button => (button.disabled = true));
    setTimeout(() => {
        btnChoiceElements.forEach(button => (button.disabled = false));
        resetRound();
    }, 2000);
};

// Raundu Sıfırlama
const resetRound = () => {
    userChoiceElement.textContent = "-";
    computerChoiceElement.textContent = "-";
    playResultElement.textContent = "";
};

// Oyunu Bitirme
const finishGame = () => {
    clearInterval(gameTime);

    const resultMessage =
        computerPoint > userPoint
            ? { text: "Maalesef Oyunu Kaybettiniz", className: "lostStyle" }
            : userPoint > computerPoint
                ? { text: "Tebrikler Oyunu Kazandınız", className: "winStyle" }
                : { text: "Oyun Berabere Bitti.", className: "drawStyle" };

    finishGameResultElement.textContent = resultMessage.text;
    finishGameResultElement.className = resultMessage.className;

    computerFinishScoreElement.textContent = computerPoint;
    userFinishScoreElement.textContent = userPoint;

    toggleGameVisibility(false);
};

// Oyunu Yeniden Başlatma
const playGame = () => {
    computerPoint = 0;
    userPoint = 0;
    time = 30;

    userScoreElement.textContent = userPoint;
    computerScoreElement.textContent = computerPoint;
    updateTimeDisplay();

    toggleGameVisibility(true);
    startCountDown();
};

// Görünürlüğü Değiştirme
const toggleGameVisibility = (isGameVisible) => {
    gameContainer.style.display = isGameVisible ? "block" : "none";
    finishContainerElement.style.display = isGameVisible ? "none" : "flex";
};

// Oyunu Başlat
initializeGame();
