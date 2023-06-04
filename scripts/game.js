let playerPoints = 0;
let computerPoints = 0;

let messageField;
let playerPointField;
let computerPointField;

let victoryLevel;
let gameActive = false;

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("rock-button").addEventListener("click", doRound);
    document.getElementById("paper-button").addEventListener("click", doRound);
    document.getElementById("scissors-button").addEventListener("click", doRound);
    messageField = document.getElementById("message-field");
    playerPointField = document.getElementById("player-score");
    computerPointField = document.getElementById("computer-score");
});

function getComputerChoice() {
    let choice = getRandomInt(3);

    switch (choice) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function uppercaseFirstLetter(st) {
    return st[0].toUpperCase() + st.substring(1);
}

function play(player, computer = getComputerChoice()) {
    player = player.toLowerCase();
    computer = computer.toLowerCase();
    switch (true) {
        case (player === computer):
            return [null, ("Tie! " + uppercaseFirstLetter(player) + " versus " + computer)];

        // computer beats player
        case (player === "rock" && computer === "paper"):
        case (player === "paper" && computer === "scissors"):
        case (player === "scissors" && computer === "rock"):
            return [false, ("You Lose! " + uppercaseFirstLetter(computer) + " beats " + player)];

        // player beats computer
        case (player === "rock" && computer === "scissors"):
        case (player === "paper" && computer === "rock"):
        case (player === "scissors" && computer === "paper"):
            return [true, ("You Win! " + uppercaseFirstLetter(player) + " beats " + computer)];
        
        default:
            return [undefined, ("Something went wrong. Perhaps you typed in an invalid choice?")];
    }
}

function startGame(maxPoints = 5) {
    playerPoints = 0;
    computerPoints = 0;

    victoryLevel = maxPoints;
    gameActive = true;

    document.getElementById("restart-button").textContent = "Restart";

    messageField.textContent = "";
    playerPointField.textContent = "Your score: " + playerPoints;
    computerPointField.textContent = "Computer score: " + computerPoints;
}



function doRound(event) {
    if (gameActive) {
        let res = play(event.target.value);

        if (res[0] === undefined || res[0] === null) {
            // do nothing
        }
        else if (res[0]) {
            playerPoints++;
        }
        else {
            computerPoints++;
        }

        if (playerPoints >= victoryLevel) {
            messageField.textContent = "You win!"
            gameActive = false;
        }
        else if (computerPoints >= victoryLevel) {
            messageField.textContent = "You lose!"
            gameActive = false;
        }
        else {
            messageField.textContent = res[1];
        }        
        playerPointField.textContent = "Your score: " + playerPoints;
        computerPointField.textContent = "Computer score: " + computerPoints;
    }
    
}