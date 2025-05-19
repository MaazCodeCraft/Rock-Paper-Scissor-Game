let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
}

updateScoreElement ();

/*
if (!score) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
}
*/

let isAutoPlaying = false;
let intervalId;

// const autoPlay = () => {

// };

function autoPlay () {
    if (!isAutoPlaying){
        intervalId = setInterval (() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;

        document.querySelector('.js-auto-play-button')
      .innerHTML = 'Stop Playing';

    }  else {
        clearInterval(intervalId);
        isAutoPlaying = false;

        document.querySelector('.js-auto-play-button')
        .innerHTML = 'Auto Play';
    }
};

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper');
    });

document.querySelector('.js-scissor-button')
    .addEventListener('click', () => {
        playGame('scissor');
    });

document.body.addEventListener('keydown', (event) => {
    // console.log(event.key);
    if (event.key === 'r'){
        playGame('rock');
    } else if (event.key === 'p'){
        playGame('paper');
    } else if (event.key === 's'){
        playGame('scissor');
    } else if (event.key === 'a'){
        autoPlay();
    } else if (event.key === 'Backspace'){
        // Update 'Backspace' to show the
        // confirmation message instead of
        // resetting the score immediately.
        showResetConfirmation();
        resetScore ();
    }
});

document.querySelector('.js-auto-play-button')
    .addEventListener ('click', () => {
        autoPlay();
    });

function playGame (playerMove){
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'rock'){
        if (computerMove === 'rock'){
            result = 'Tie.';
        } else if (computerMove === 'paper'){
            result = 'You lose.';
        } else if (computerMove === 'scissor'){
            result = 'You win.';
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock'){
            result = 'You win.';
        } else if (computerMove === 'paper'){
            result = 'Tie.';
        } else if (computerMove === 'scissor'){
            result = 'You lose.';
        }
    } else if (playerMove === 'scissor'){
        if (computerMove === 'rock'){
            result = 'You lose.';
        } else if (computerMove === 'paper'){
            result = 'You win.';
        } else if (computerMove === 'scissor'){
            result = 'Tie.';
        }
    }

    if (result === 'You win.'){
        score.wins += 1;
    } else if (result === 'You lose.'){
        score.losses += 1;
    } else if (result === 'Tie.'){
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result')
        .innerHTML = `${result}`;

    document.querySelector('.js-move')
        .innerHTML = `You
        <img src="Images/${playerMove}-emoji.png" class="move-icon">
        <img src="Images/${computerMove}-emoji.png" class="move-icon">
        Computer`;
}

function pickComputerMove () {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3){
        computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber <= 2/3){
        computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1){
        computerMove = 'scissor';
    }

    return (computerMove);
}

function updateScoreElement () {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}

function resetScore () {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}

document.querySelector('.js-reset-score-button')
    .addEventListener ('click', () => {
        // Update the click event listener to
        // show the confirmation message instead
        // of restting the score immediately.
        showResetConfirmation();
    });

function showResetConfirmation () {
    document.querySelector('.js-reset-confirmation')
        .innerHTML = `Are you sure you want to reset the score?
      <button class="js-reset-confirm-yes reset-confirm-button">
        Yes
      </button>
      <button class="js-reset-confirm-no reset-confirm-button">
        No
      </button>`;
       // You could use onclick="..." in the HTML above,
        // but it's recommended to use .addEventListener()
        document.querySelector('.js-reset-confirm-yes')
        .addEventListener('click', () => {
            resetScore();
            hideResetConfirmation();
        });

        document.querySelector('.js-reset-confirm-no')
        .addEventListener('click', () => {
            hideResetConfirmation();
        });
}

function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
      .innerHTML = '';
  }