"use strict";
localStorage.setItem("continue", "true");

const newGame = function () {
  localStorage.setItem("refreshBoard", "yes");
};

const continueGame = function () {
  localStorage.setItem("refreshBoard", "no");
};
