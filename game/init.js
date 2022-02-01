"use strict";
const localStorageManager = function (genStats) {};

const winner = function () {
  let blur = document.getElementById("blur");
  blur.classList.toggle("active");
  let winnerPopup = document.getElementById("winner-popup");
  winnerPopup.classList.toggle("active");
};

//end turn
const chgPlyer = function (genStats) {
  //unlock all tokens
  genStats.tokenList.forEach((element) => {
    element.locked = false;
  });
  //unlock the player
  genStats.activePlyr == 0
    ? (genStats.activePlyr = 1)
    : (genStats.activePlyr = 0);
  document.querySelector(".player").textContent = "Player";
  document.querySelector(".player").innerHTML += `<BR>${
    genStats.activePlyr + 1
  }`;
  genStats.plyrLocked = false;
};
//current game execution
const tokenAction = function (genStats) {
  console.log("Clicked");
  console.log(`genStats.countRemovedTokens - ${genStats.countRemovedTokens}`);

  return function (evt) {
    if (genStats.gameActive == true) {
      console.log(evt.target.id);
      console.log(genStats.tokenList);

      console.log(evt.target.yBasis);

      //only remove token if token/ token row is unlocked
      if (evt.target.locked == false) {
        evt.target.style.visibility = "hidden";

        //increment token count to determine when plyr reaches winning token
        genStats.countRemovedTokens++;

        evt.target.removed = true;
      }
      if (genStats.plyrLocked == false) {
        genStats.tokenList.forEach((element) => {
          //if clicked token row no (yBasis) is <> yBasis of the tokenList element
          if (evt.target.yBasis != element.yBasis) {
            element.locked = true;
          }
        });
      }
      //this prevents the forEach loop from executing (preventing the unlocked row to become locked again)
      genStats.plyrLocked = true;

      //if plyr reaches winning token
      if (genStats.countRemovedTokens == 2) {
        genStats.gameActive = false;
        winner();
      }
    }
  };
};

//populate board tokens on page via DOM
const populateBoard = function () {
  //populate img nodes into array

  let genStats = {
    tokenList: [],
    plyrLocked: false,
    activePlyr: 0,
    countRemovedTokens: 0,
    gameActive: true,
  };

  //starting counter to increment the no of tokens per row
  let xMax = 1;

  for (let rowNum = 0; rowNum < 4; rowNum++) {
    //create div nodes
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("rows");
    rowDiv.id = `row${[rowNum]}`;
    innerWrapper.appendChild(rowDiv);
    for (let x = 0; x < xMax; x++) {
      //create img nodes
      const token = document.createElement("img");
      token.locked = false;
      token.removed = false;
      token.xBasis = x;
      token.yBasis = rowNum;
      token.src = "Toothpick.png";
      token.id = `${rowNum}${String.fromCharCode(x + 65)}`;
      token.setAttribute("onclick", "clickEvent(event)");
      //add token object parameters to array
      genStats.tokenList.push(token);
      //DOM - add tokens to document
      rowDiv.appendChild(token);
    }
    //increment each row by 2 tokens each time
    xMax += 2;
  }

  return genStats;
};

const genStats = populateBoard();

const clickEvent = tokenAction(genStats);
