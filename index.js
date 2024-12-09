
const btnChoices = document.querySelectorAll(".btnChoice")
const userChoiceElement = document.getElementById("user-choice")
const computerChoiceElement = document.getElementById("computer-choice")
const gameResultElement = document.getElementById("game-result")
const computerPointElement = document.getElementById("computer-point")
const userPointElement = document.getElementById("user-point")

let computerPoint = 0, userPoint = 0

btnChoices.forEach(choice => choice.addEventListener('click', () => onClickButtunChoice(choice)))

const onClickButtunChoice = (choice) => {
    const selectedKey = choice.getAttribute("key")
    const computerChoice = getComputerChoice()
    const result = findWinner(selectedKey, computerChoice)

    updateScore(result)

    userChoiceElement.textContent = `Senin seçimin: ${selectedKey}`
    computerChoiceElement.textContent = `Bilgisayar seçimi: ${computerChoice}`
    gameResultElement.textContent = `Oyun Sonucu: ${result}`

}

const getComputerChoice = () => {

    const keys = ['tas', 'kagit', 'makas'];
    const randomIndex = Math.floor(Math.random() * keys.length);

    return keys[randomIndex];
}

const findWinner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) return 'Berabere!'

    if (
        (userChoice == "tas" && computerChoice == "makas") ||
        (userChoice == "makas" && computerChoice == "kagit") ||
        (userChoice == "kagit" && computerChoice == "tas")
    ) return 'Kazandınız!'
    else {
        return 'Kaybettin!'
    }

}

const updateScore = (result) => {
    if (result === 'Kazandınız!') {
        userPoint++;
    } else if (result === 'Kaybettin!') {
        computerPoint++;
    }
    userPointElement.textContent = userPoint
    computerPointElement.textContent = computerPoint

}