let playerPoints = 0;
let computerPoints = 0;

let victoryLevel = 5;
let gameActive = false;

const playField = document.querySelector('.play-field');
const playButton = document.querySelector('.play-button');
playButton.addEventListener('click', setupGame, { once: true });
let buttonField;
let messageField;
let playerPointField;
let computerPointField;

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

// generate buttons and play field
function setupGame(event, maxPoints = 5) {
    victoryLevel = maxPoints;

    playButton.textContent = "Restart";

    // generate buttons
    buttonField = document.createElement('div');
    buttonField.classList.add('button-field');
    const playableChoices = ['Rock', 'Paper', 'Scissors'];

    for (let i = 0; i < playableChoices.length; i++) {
        const newButton = document.createElement('button');
        newButton.classList.add('player-choice');
        newButton.textContent = playableChoices[i];
        newButton.addEventListener('click', doRound);
        buttonField.appendChild(newButton);
    }

    // generate messages
    messageField = document.createElement('h4');
    playerPointField = document.createElement('div');
    computerPointField = document.createElement('div');

    playField.appendChild(buttonField);
    playField.appendChild(messageField);
    playField.appendChild(playerPointField);
    playField.appendChild(computerPointField);
    playButton.addEventListener('click', gameStart);

    gameStart("Begin!");
}

function gameStart(message = "New round!") {
    gameActive = true;
    playerPoints = 0;
    computerPoints = 0;
    messageField.textContent = "New round!";
    playerPointField.textContent = "Your score: " + playerPoints;
    computerPointField.textContent = "Computer score: " + computerPoints;
}



function doRound(event) {
    if (gameActive) {
        let res = play(event.target.textContent.toLowerCase());

        if (res[0] === undefined || res[0] === null) {
            // do nothing
        }
        else if (res[0]) {
            playerPoints++;
        }
        else {
            computerPoints++;
        }

        console.log(playerPoints + ' ' + victoryLevel);

        if (playerPoints >= victoryLevel) {
            gameOver(true);
        }
        else if (computerPoints >= victoryLevel) {
            gameOver(false);
        }
        else {
            messageField.textContent = res[1];
        }        
        playerPointField.textContent = "Your score: " + playerPoints;
        computerPointField.textContent = "Computer score: " + computerPoints;
    }
    
}

function gameOver(victoryStatus) {
    gameActive = false;
    choices = buttonField.querySelectorAll('.player-choice');
    console.log(choices);

    [...choices].forEach(btn => btn.classList.add('no-click'));

    if (victoryStatus) {
        messageField.textContent = "You win!";
    } else {
        messageField.textContent = "You lost!";
    }
}