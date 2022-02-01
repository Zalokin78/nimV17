"use strict";

const back = function () {
  if (localStorage.getItem("continue") == "false") {
    location.href = "index.html";
  } else {
    location.href = "continue.html";
  }

  /*  localStorage.getItem("continue") == false
    ? (location.href = "index.html")
    : (location.href = "continue.html"); */
};
