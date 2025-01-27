// Function to detect rectangular collision between two objects
function rectangularCollision({ rectangular1, rectangular2 }) {
  const { attackBox: box1 } = rectangular1; // Destructure for readability
  const { attackBox: box2 } = rectangular2;

  return (
    box1.possition.x + box1.width >= rectangular2.possition.x && 
    box1.possition.x <= rectangular2.possition.x + rectangular2.width && 
    box1.possition.y + box1.height >= box2.possition.y && 
    box1.possition.y <= rectangular2.possition.y + rectangular2.height
  );
}

// Function to determine the winner based on health
function determinWinner({ player, enmy, timerId }) {
  const resultDisplay = document.querySelector("#resultOfGame");
  resultDisplay.style.display = "flex"; 
  clearTimeout(timerId); 

  // Determine the winner based on health
  if (player.health === enmy.health) {
    resultDisplay.innerHTML = "Tie";
  } else if (player.health > enmy.health) {
    resultDisplay.innerHTML = "Player 1 Wins";
  } else {
    resultDisplay.innerHTML = "Player 2 Wins";
  }
}

// Timer variables
let timer = 51;
let timerId;

// Function to decrease the timer and check for winner
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000); 
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }

  // When timer reaches zero, determine the winner
  if (timer === 0) {
    determinWinner({ player: player1, enmy: enmy, timerId });
  }
}