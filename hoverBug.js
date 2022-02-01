"use strict";

/* localStorage.setItem("refreshBoard", "yes"); */

/* const onePlayer = function(){localStorage.setItem("gameType", "onePlayer")}

const twoPlayer = function(){localStorage.setItem("gameType", "twoPlayer")} */

/* const difficulty = function () {
  let i = 0;
  localStorage.setItem("difficulty", "easy");
  return function (evt) {
    console.log("clicked!!!");
    console.log(evt.target);
    const difficultyType = ["Easy", "Medium", "Hard", "Impossible"];

    if (evt.target.className.includes("up")) {
      if (i < difficultyType.length - 1) {
        i++;
      }
    } else {
      if (i > 0) {
        i--;
      }
    }
    console.log(i);
    document.querySelector(".input").textContent = `${difficultyType[i]}`;
    localStorage.setItem("difficulty", difficultyType[i]);
  };
};

const difficultySelect = difficulty();

document.querySelectorAll(".arrow").forEach((item) => {
  item.addEventListener("click", difficultySelect);
}); */

const difficultySelect = function (evt) {
  console.log("CLICKED!!");
  if (evt.target.className.includes("easy")) {
    localStorage.setItem("difficulty", "easy");
  } else if (evt.target.className.includes("medium")) {
    localStorage.setItem("difficulty", "medium");
  } else if (evt.target.className.includes("hard")) {
    localStorage.setItem("difficulty", "hard");
  } else {
    localStorage.setItem("difficulty", "impossible");
  }

  location.href = "./game/game.html";
};
document.querySelectorAll(".input").forEach((item) => {
  item.addEventListener("click", difficultySelect);
});
