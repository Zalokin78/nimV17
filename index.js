"use strict";

/* let x = localStorage.getItem("refreshBoard"); */

/* if (localStorage.getItem("refreshBoard") == null) {
  localStorage.setItem("refreshBoard", "yes");
} else {
  localStorage.setItem("refreshBoard", "no");
} */

/* localStorage.setItem("refreshBoard", "yes"); */
localStorage.setItem("continue", "false");
/* const roundsFunc = function () {
  let i = 0;
  return function (evt) {
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
    document.querySelector(".input").textContent = `${totalRounds[i]}`;
  };
};

const rounds = roundsFunc(); */

/* let i = 0;
const rounds = function (evt) {
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
  document.querySelector(".input").textContent = `${totalRounds[i]}`;
}; */

/* document.querySelectorAll(".arrow").forEach((item) => {
  item.addEventListener("click", rounds);
}); */
