"use strict";

/* const boardGen = function () {
  //creation of token objects
  const createTokens = function () {
    let tokenList = [];

    let xMax = 1;

    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < xMax; x++) {
        const token = new Object();
        token.locked = false;
        token.hidden = false;
        token.x = x;
        token.y = y;
        token.src = "Toothpick.png";
        token.id = `${y}${String.fromCharCode(x + 65)}`;
        tokenList.push(token);
      }
      xMax += 2;
    }
    return tokenList;
  };

  const newlist = createTokens(); */
const roundStatus = function () {};

const chgPlyer = function (tokenList) {
  console.log(tokenList);
  tokenList.forEach((element) => {
    element.locked = false;
  });
};

const tokenAction = function (tokenList) {
  console.log("Clicked");

  return function (evt) {
    console.log(evt.target.id);
    console.log(tokenList);

    console.log(evt.target.yBasis);
    /* evt.target.locked = false; */
    if (evt.target.locked == false) {
      evt.target.style.visibility = "hidden";
      evt.target.removed = true;
    }
    tokenList.forEach((element) => {
      //if the clicked token's row no (yBasis) is <> to the yBasis of the tokenList
      if (evt.target.yBasis != element.yBasis) {
        element.locked = true;
      }
    });
  };
};

//populate board tokens on page via DOM
const populateBoard = function () {
  //populate img nodes into array

  let tokenList = [];
  let xMax = 1;
  const creationStats = new Map();
  let creationStatsObj = { tokenList };
  creationStats.set("tokenStats", tokenList);
  creationStats.set("plrTokensLocked", false);
  /* const testMap = new Map();
  testMap.set("player1",) */
  //define starting player

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
      tokenList.push(token);
      rowDiv.appendChild(token);
    }
    xMax += 2;
  }
  /* return creationStats; */
  return creationStats;
};

const listOfTokens = populateBoard();

console.table(listOfTokens.get("tokenStats"));

const clickEvent = tokenAction(listOfTokens);

/* console.log(list); */

/* const list = boardGen();
console.log(list); */

// factory pattern
/* function createAnimal(name) {
  var o = new Object();
  o.name = name;
  o.identify = function () {
    console.log("I'm a " + o.name);
  };
  return o;
}

const animal = createAnimal("falcon");
animal.identify(); */
