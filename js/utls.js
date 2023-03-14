function rectangularCollision({ rectangular1, rectangular2 }) {
  return (
    rectangular1.attackBox.possition.x + rectangular1.attackBox.width >=
      rectangular2.possition.x &&
    rectangular1.attackBox.possition.x <=
      rectangular2.possition.x + rectangular2.width &&
    rectangular1.attackBox.possition.y + rectangular1.attackBox.height >=
      rectangular2.attackBox.possition.y &&
    rectangular1.attackBox.possition.y <=
      rectangular2.possition.y + rectangular2.height
  );
}

function determinWinner({ player, enmy, timerId }) {
  document.querySelector("#resultOfGame").style.display = "flex";
  clearTimeout(timerId);
  if (player.health === enmy.health) {
    document.querySelector("#resultOfGame").innerHTML = "Tie";
  } else if (player.health > enmy.health) {
    // enmy.switchSprite("death");
    document.querySelector("#resultOfGame").innerHTML = "Player 1 Wins";
  } else if (player.health < enmy.health) {
    document.querySelector("#resultOfGame").innerHTML = "Player 2 Wins";
  }
}
let timer = 51;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }
  if (timer === 0) {
    determinWinner({ player: player1, enmy: enmy, timerId });
  }
}
