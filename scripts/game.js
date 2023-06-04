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
            return ("Tie! " + player + " versus " + computer);

        // computer beats player
        case (player === "rock" && computer === "paper"):
        case (player === "paper" && computer === "scissors"):
        case (player === "scissors" && computer === "rock"):
            return ("You Lose! " + uppercaseFirstLetter(computer) + " beats " + player);

        // player beats computer
        case (player === "rock" && computer === "scissors"):
        case (player === "paper" && computer === "rock"):
        case (player === "scissors" && computer === "paper"):
            return ("You Win! " + uppercaseFirstLetter(player) + " beats " + computer);
        
        default:
            return ("Something went wrong. Perhaps you typed in an invalid choice?");
    }
}