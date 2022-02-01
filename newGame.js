"use strict";
localStorage.clear();
localStorage.setItem("refreshBoard", "yes");
localStorage.setItem("continue", "false");

const onePlayer = function () {
  localStorage.setItem("gameType", "onePlayer");
};

const twoPlayer = function () {
  localStorage.setItem("gameType", "twoPlayer");
};

const roundsFunc = function () {
  let i = 0;
  localStorage.setItem("maxRounds", "1");
  return function (evt) {
    console.log("clicked!!!");
    console.log(evt.target);
    const totalRounds = [1, 3, 5, 7];

    if (evt.target.className.includes("up")) {
      if (i < totalRounds.length - 1) {
        i++;
      }
    } else {
      if (i > 0) {
        i--;
      }
    }
    console.log(i);
    document.querySelector(".round-no").textContent = `${totalRounds[i]}`;
    localStorage.setItem("maxRounds", totalRounds[i]);
  };
};

const rounds = roundsFunc();

document.querySelectorAll(".arrow").forEach((item) => {
  item.addEventListener("click", rounds);
});
