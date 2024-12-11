
const btnChoices = document.querySelectorAll(".btnChoice")
const userChoiceElement = document.getElementById("user-choice")
const computerChoiceElement = document.getElementById("computer-choice")
const gameResultElement = document.getElementById("game-result")
const computerPointElement = document.getElementById("computer-point")
const userPointElement = document.getElementById("user-point")
const timeCountElement = document.getElementById("timeCount")

let computerPoint = 0, userPoint = 0

btnChoices.forEach(choice => choice.addEventListener('click', () => onClickButtunChoice(choice)))
var time = 10
const setCountDown = () => {

    if (time > 0) time--
    else {
        finishGame()
        clearInterval(gameTime)
    }

    timeCountElement.textContent = `Kalan Zaman: ${time}`
}

const gameTime = setInterval(setCountDown, 1000)

const onClickButtunChoice = (choice) => {
    const selectedKey = choice.getAttribute("key")
    const computerChoice = getComputerChoice()
    const result = findWinner(selectedKey, computerChoice)

    updateScore(result)
    updateGameResultText(result)

    userChoiceElement.textContent = selectedKey
    computerChoiceElement.textContent = computerChoice
    btnChoices.forEach(x => x.disabled = true)

    setTimeout(() => {
        btnChoices.forEach(x => x.disabled = false)
    }, 2000);


}

const getComputerChoice = () => {
    const keys = ['Taş', 'Kağıt', 'Makas'];
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
}

const findWinner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) return "draw"

    if (
        (userChoice == "Taş" && computerChoice == "Makas") ||
        (userChoice == "Makas" && computerChoice == "Kağıt") ||
        (userChoice == "Kağıt" && computerChoice == "Taş")
    ) return "win"
    else {
        return "lose"
    }
}

const updateScore = (result) => {
    if (result === 'win') {
        userPoint++;
    } else if (result === 'lose') {
        computerPoint++;
    }
    userPointElement.textContent = userPoint
    computerPointElement.textContent = computerPoint
}

const updateGameResultText = (result) => {
    switch (result) {
        case "win":
            gameResultElement.className = "winStyle"
            gameResultElement.textContent = "KAZANDINIZ"
            break;
        case "lose":
            gameResultElement.className = "lostStyle"
            gameResultElement.textContent = "KAYBETTİNİZ"
            break;

        default:
            gameResultElement.className = "drawStyle"
            gameResultElement.textContent = "BERABERE"
            break;
    }
}

const finishGame = () => {
    const computerPoint = parseInt(computerPointElement.textContent)
    const userPoint = parseInt(userPointElement.textContent)

    if (computerPoint > userPoint) {
        document.getElementById("finishGameResult").textContent = "Kaybettin"

    }
    else if (userPoint > computerPoint) {
             document.getElementById("finishGameResult").textContent = "Kazandın"
    }
    else {
             document.getElementById("finishGameResult").textContent = "Bereabere"
    }
    document.getElementById("finish").style.display = "block"
    document.getElementById("game").style.display = "none"
}

const restartGame = () => {
    document.getElementById("game").style.display = "block"
    document.getElementById("finish").style.display = "none"
}
