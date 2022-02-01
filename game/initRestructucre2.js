"use strict";

const localStorageRead = function () {
  let genStats = JSON.parse(localStorage.getItem("genStatsStr"));

  return genStats;
};

const localStorageWrite = function (genStats) {
  /* const LSMap = new Map(); */
  /* genStats.tokenList.forEach((element) => { */

  localStorage.clear();
  const genStatsStr = JSON.stringify(genStats);

  localStorage.setItem("genStatsStr", genStatsStr);
  /* JSON.stringify(localStorage.setItem("genStatsStr", genStats)); */
  console.log(localStorage);

  /* if (action == "read") {
    genStatsTemp = JSON.parse(localStorage.getItem("genStatsStr"));
  } */

  /* localStorage.setItem(element.id, element.removed); */
  /* }); */

  /* const initLS = function () {
    console.log("resettingLS");
    genStats.tokenList.forEach((element) => {
      element.removed = false;
      localStorage.setItem(element.id, element.removed);
    });
  };

  if (action == "init") {
    initLS();
  } */
};

const localStorageManagerTest = function (genStats) {
  console.log(`orig gensStats`);
  console.table(genStats);
  //this is how to selectively choose the fields that go into the stringy
  //next you need to address the tokenList - you should try to put each token object
  //with the selected properties (e.g. hidden etc) into an array
  //i.e. each object is an element in an array - then you would stringyfy that
  const genStatsStr = JSON.stringify(genStats, ["gameActive", "maxRounds"]);
  console.log(`stringyfied genStats - ${genStatsStr}`);

  const tokenObjectArrayGen = function () {
    genStats.tokenList.forEach((element) => {
      console.log(element.src);
    });
  };
  tokenObjectArrayGen();

  /* let genStatsnew = JSON.parse("genStatsStr");
  console.log(`new genStats - ${genStatsnew}`); */
};

const mainMenu = function () {
  localStorageRead();
  location.href = "../continue.html";
};

const createTestTokens = function () {};

const tokenHiddenState = function (genStats) {};

const init = function (genStats, matchReset) {
  console.log(matchReset);
  genStats.tokenList.forEach((element) => {
    //unhide the hidden tokens and update object parameter
    element.removed = false;
    element.style.visibility = "visible";
    element.locked = false;
  });
  genStats.plyrLocked = false;
  genStats.countRemovedTokens = 0;
  genStats.gameActive = true;
  genStats.activePlyr = 0;
  document.getElementById("player-no").textContent = "1";
  document.querySelector(".round-no").textContent = `Round ${
    genStats.roundNo + 1
  } of 3`;
  //reset values after a match
  if (matchReset == true) {
    genStats.roundNo = 0;
    /* document.querySelector(".round-no").textContent = "Round 1 f 3"; */
    genStats.roundWins[0] = 0;
    genStats.roundWins[1] = 0;
    genStats.matchReset = false;
  }

  console.log(genStats);
};

const gameStats = function (genStats) {
  document.querySelector(".round-no").textContent = `Round ${
    genStats.roundNo + 1
  } of 3`;
  document.querySelector(".player0-wins").textContent = genStats.roundWins[0];
  document.querySelector(".player1-wins").textContent = genStats.roundWins[1];
};

const winner = function (menuType, genStats) {
  //winner is the player that is not active player (i.e. the player that stays with the extra token)
  let playerWinner = genStats.activePlyr == 0 ? 1 : 0;
  //increment round wins per player
  genStats.roundWins[playerWinner]++;
  console.log(playerWinner);
  //activate the popup
  document.querySelector(".winner-popup").classList.toggle("active");
  //blur the background
  document.getElementById("blur").classList.toggle("active");
  const winnerTitle = document.querySelector(".winner.popup-title");
  const winnerButton1 = document.querySelector(".winner.button1");
  const roundNum = document.querySelector(".round-num");
  const winnerPlayerno = document.querySelector(".winner-player-no");

  winnerPlayerno.textContent = playerWinner + 1;
  //make changes to menu dynamically
  if (menuType == "match") {
    winnerTitle.textContent = "Match Over";
    winnerButton1.textContent = "Play Again";
    roundNum.textContent = "";
    //specify what playerNum won
    //the player no. that appears as winner is the one that is not activePlyr
    winnerPlayerno.textContent =
      genStats.roundWins[0] > genStats.roundWins[1] ? "1" : "2";

    /* winnerButton1.classList.add("match"); */
  } else if (menuType == "round") {
    winnerTitle.textContent = "Round ";

    roundNum.textContent = `${genStats.roundNo + 1}`;
    winnerButton1.textContent = "Next Round";
  }
  //if button1 is clicked
  document.querySelector(".winner.button1").onclick = function (evt) {
    //unblur the background
    document.getElementById("blur").classList.toggle("active");
    //remove the popup
    document.querySelector(".winner-popup").classList.toggle("active");

    //update the round no (execute gameStats())

    /* init(genStats,false); */

    if (menuType == "round") {
      genStats.roundNo++;
      init(genStats, genStats.matchReset);
    } else if (menuType == "match") {
      //match reset is true which means that it will trigger the reset of the match in init()
      genStats.matchReset = true;
      /* genStats.roundNo = 0; */
      init(genStats, genStats.matchReset);
    }
    gameStats(genStats);
  };
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

  document.getElementById("player-no").textContent = `${
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
          /* if (evt.target.yBasis != element.yBasis) { */
          if (evt.target.id.slice(0, 1) != element.id.slice(0, 1)) {
            element.locked = true;
          }
        });
      }
      //this prevents the forEach loop from executing (preventing the unlocked row to become locked again)
      genStats.plyrLocked = true;

      //if plyr reaches winning token
      if (genStats.countRemovedTokens == 2) {
        genStats.gameActive = false;

        let winnerMenuType;
        genStats.roundNo == genStats.maxRounds - 1
          ? (winnerMenuType = "match")
          : (winnerMenuType = "round");

        /* if (genStats.roundNo > genStats.maxRounds){
          winnerMenuType = "match"
        }
        else{
          winnerMenuType = "round"
        } */
        winner(winnerMenuType, genStats);
      }
    }
  };
};

//temp test condition - this should be a condition set in localStorage ("refreshBoard");
let testLocalStorage = true;

const initgenStats = function () {
  if (localStorage.getItem("refreshBoard") == "no") {
    let genStats = localStorageRead();
    return genStats;
  } else if (localStorage.getItem("refreshBoard") == "yes") {
    /* if (testLocalStorage == true) { */
    let genStats = {
      tokenList: [],
      plyrLocked: false,
      activePlyr: 0,
      countRemovedTokens: 0,
      gameActive: true,
      roundNo: 0,
      maxRounds: 3,
      roundWins: [0, 0],
      matchReset: false,
      localStorageOption: "init",
      xMax: 1,
    };
    return genStats;
  }
};

/* if (localStorage.getItem("refreshBoard") == "yes") {
  initgenStats();
} */

//populate board tokens on page via DOM
const populateBoard = function (genStats) {
  /* genStats = initgenStats(); */
  //populate img nodes into array
  /* let genStats = {}; */
  /* newInit(); */
  /* let genStats = {
    tokenList: [],
    plyrLocked: false,
    activePlyr: 0,
    countRemovedTokens: 0,
    gameActive: true,
    roundNo: 0,
    maxRounds: 3,
    roundWins: [0, 0],
    matchReset: false,
    localStorageOption: "init",
  }; */
  console.log(localStorage.getItem("refreshBoard"));

  //generate tokens with parameters
  const rowLimit = 4;
  //reset xMax regardless if genStat values are taken from init or from localStorage
  genStats.xMax = 1;
  for (let rowNum = 0; rowNum < rowLimit; rowNum++) {
    for (let x = 0; x < genStats.xMax; x++) {
      const token = document.createElement("img");
      token.locked = false;
      token.removed = false;
      /* token.xBasis = x;
    token.yBasis = rowNum; */
      token.src = "Toothpick.png";
      token.id = `${rowNum}${String.fromCharCode(x + 65)}`;
      token.setAttribute("onclick", "clickEvent(event)");
      /* token.removed = fakeLSMap.get(token.id);
    if (token.removed == true) {
      token.style.visibility = "hidden";
    } */

      console.log(token);

      //add token object parameters to array
      genStats.tokenList.push(token);
    }
    genStats.xMax += 2;
  }
  console.table(genStats);

  //localStorageManager(genStats, genStats.localStorageOption);

  //starting counter to increment the no of tokens per row
  genStats.xMax = 1;
  let tokenIndex = 0;

  for (let rowNum = 0; rowNum < 4; rowNum++) {
    //create div nodes
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("rows");
    rowDiv.id = `row${[rowNum]}`;
    innerWrapper.appendChild(rowDiv);
    for (let x = 0; x < genStats.xMax; x++) {
      //DOM - add tokens to document
      rowDiv.appendChild(genStats.tokenList[tokenIndex]);

      tokenIndex++;
    }
    //increment each row by 2 tokens each time
    genStats.xMax += 2;
  }
  console.log(genStats.tokenList);

  return genStats;
};

const genStats = initgenStats();
/* const genStats = populateBoard(); */
populateBoard(genStats);

const clickEvent = tokenAction(genStats);

/* localStorageManager(genStats, "write"); */

gameStats(genStats);

//for testing purposes
localStorageManagerTest(genStats);
