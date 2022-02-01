"use strict";

/* const updateStatus = function (condition, delay) {
  let time;
  //this determines if the time delay of the msg is greater than 0 or not.
  //this is used so that we can set no time delay to statusNormal when the game starts
  //then.. as the game continues, the time delay will be set to the desired delay
  if (delay == true) {
    time = 0;
  } else {
    time = 0;
  }
  const statusLocked = "Please choose toothpicks from current row!";
  const statusNormal = "Remove your toothpicks of choice...";

  let status = document.querySelector(".status");
  if (condition !== "locked") {
    setTimeout(function () {
      status.textContent = statusNormal;
      console.log(status);
    }, time * 1000);
  } else {
    status.textContent = statusLocked;
    console.log(status);
  }
}; */
/* const calcXOR = function (genStats) {
  console.log(genStats.tokenList);
  let i = 0;
  let heapCount = 0;
  let heapTotals = [];

  genStats.tokenList.forEach((element) => {
    //console.log(element.id.slice(0, 1));
    if (element.id.slice(0, 1) == i) {
      heapCount++;
      //console.log(heapCount);
    } else {
      heapTotals.push(heapCount);
      heapCount = 0;
      i++;
    }

    //element.style.visibility !=="hidden"
  });
  console.log(heapTotals);
}; */
//this func creates a record of num of tokens per row which are visible in array format - this is refreshed every single time a player clicks on the screen
//this will eventually be used to calculate NimSum as part of the algorithm used for the computer to compete against the player
const calcHeaps = function (genStats) {
  console.log(genStats.tokenList);
  //heapCount increments tokens in each row (or heap)
  let heapCount = 0;
  let heapTotals = [];
  //if flag == true - triggers new array element creation
  let flag = true;
  let elemNo = -1;
  //oldRowNo is a temp variable - make the first one false in order to initially trigger creation of array element
  let oldRowNo = false;

  genStats.tokenList.forEach((element) => {
    /* if (element.style.visibility != "hidden") { */
    //get first character of element id (i.e. the row num);
    let rowNum = element.id.slice(0, 1);
    if (rowNum != oldRowNo) {
      flag = true;
      oldRowNo = rowNum;
    }

    if (flag == true) {
      //create array element
      heapTotals.push(0);
      flag = false;
      heapCount = 0;
      elemNo++;
    }
    //only increment the number of tokens in the heap if the token is not removed (hidden);
    if (element.style.visibility == "hidden") {
      heapTotals[elemNo] = heapCount += 0;
    } else {
      heapTotals[elemNo] = heapCount++ + 1;
    }

    /* console.log(heapCount); */
    /* } */
  });
  console.log(heapTotals);
  return heapTotals;
};

const calcNimSum = function (heaps) {
  let nimSum = heaps[0];

  for (let i = 0; i < heaps.length - 1; i++) {
    //calc th XOR value of the next element i.e. heaps[i + 1]... of the array
    nimSum = nimSum ^ heaps[i + 1];
  }
  console.log(`nimSum = ${nimSum}`);

  return nimSum;
};

const calcNextMove = function (nimSum, heaps) {
  if (nimSum == 0) {
    alert("NIMSUM = 0");
  }
  /* let a, b, c, d; */
  //populate rows[] with heap amounts which will calculate a total nimSum of 0
  const rows = [];
  console.log(`nimSum = ${nimSum}`);
  heaps.forEach((element) => {
    rows.push(element ^ nimSum);
  });
  /* console.log(`The rows are ${rows}`); */
  let heapNo = 0;
  let tokensToRemove;
  let continueFlag = true;

  rows.forEach((element) => {
    /* let rowNo =0; */
    //search to find a heap (heaps) greater than the desired number in the heap (rows)
    if (heaps[heapNo] >= element && continueFlag == true) {
      console.log(`heaps - ${heaps[heapNo]}`);

      tokensToRemove = heaps[heapNo] - element;
      console.log(`Remove ${tokensToRemove} from row no${heapNo}`);
      //stop searching if flag == false;
      continueFlag = false;
    }
    if (continueFlag == true) {
      heapNo++;
    }
  });
  /*  */
  console.log(`These are the tokens to be left over per each row - ${rows}`);
  return [heapNo, tokensToRemove /* , nimSum */];
  /* return rows[(a, b, c, d)]; */
};
/*  */

const computerMove = function (genStats) {
  let noOfTokenstoRemove = genStats.computerTokensRemoval[1];
  console.log(`Initial No of tokens to remove - ${noOfTokenstoRemove}`);
  genStats.tokenList.forEach((element) => {
    if (
      genStats.computerTokensRemoval[0] == element.id.slice(0, 1) &&
      noOfTokenstoRemove != 0
    ) {
      //only hide and deduct 1 from noOfTokenstoRemove only if the element wasn't hidden already
      if (element.style.visibility != "hidden") {
        console.log(`Element id to be "hidden" - ${element.id}`);
        element.style.visibility = "hidden";
        element.removed = true;
        genStats.countRemovedTokens++;
        console.log(`removed tokens in AI - ${genStats.countRemovedTokens}`);
        element.removed = true;

        noOfTokenstoRemove--;
        console.log(`Countdown of tokens to remove - ${noOfTokenstoRemove}`);
      }
    }
  });
  /* console.log(
    `The nimSum after the computer's turn is - ${genStats.computerTokensRemoval[1]}`
  ); */
  //if cpu is declared winner
  if (genStats.countRemovedTokens == 16) {
    //select the cpu as the winner
    genStats.activePlyr = 1;
    initiateWinnerMenu();
  }
  /* console.log(`nimSum = ${nimSum}`); */
};

const functionsAI = function () {
  const heaps = calcHeaps(genStats);
  const nimSum = calcNimSum(heaps);

  //if nimSum left by previous player is equal to 0 - then the computer would not remove any tokens. To avoid this, if a nimSum of 0is found, just execute the removal of random tokens/ remove last row...
  if (nimSum != 0) {
    genStats.computerTokensRemoval = calcNextMove(nimSum, heaps);
    computerMove(genStats);
  } else {
    console.log("NimSum = 0... going to remove randomly!!");
    removeRandomTokens(genStats);
  }
};

const difficulty = function (difficulty) {
  console.log(`the difficulty level is.... ${difficulty}`);
  const percentageChance = function (percentage) {
    let condition;
    const value = Math.floor(Math.random() * 100);
    console.log(`Percentage result of AI execution - ${value}`);
    if (value < percentage) {
      condition = true;
    } else {
      condition = false;
    }
    return condition;
  };
  let condition;
  switch (difficulty) {
    case "easy":
      condition = percentageChance(5);
      break;

    case "medium":
      condition = percentageChance(25);
      break;

    case "hard":
      condition = percentageChance(50);
      break;

    default:
      condition = true;
  }
  /* if (chance == 1) {
    executeAI = true;
  } else {
    executeAI = false;
  } */

  /* chance == 1 ? (executeAI = true) : (executeAI = false); */
  /* console.log(`chance value ${chance}`);
  return executeAI; */
  return condition;
};

const removeRandomTokens = function (genStats) {
  const randomNum = function (max) {
    const result = Math.floor(Math.random() * max);
    return result;
  };

  //This first part detects if the game is on its last row. If so, then the computer removes all of the tokens in the row in order to win the game (otherwise it would look silly for the computer to remove a couple of tokens from the last row and let the player win!)

  //check if only one row exists with tokens, then remove all tokens in the row - this would then cause this function to bypass the random selection/removal of tokens. The end of the function would then initate end game/round menu (computer would win the game/round)

  let foundSecondRowWithUnhidden = false;
  let rowWithUnhidden = false;
  let triggerRandom;
  let skip = 0;
  /* let foundInitialRow = false; */

  //one row tokens detection....
  //first of all, record first row (1st char of element id) found with unhidden token
  genStats.tokenList.forEach((element) => {
    if (skip == 0) {
      if (element.style.visibility != "hidden") {
        rowWithUnhidden = element.id.slice(0, 1);
        console.log(
          `1st row found with an unhidden token - row${element.id.slice(0, 1)}`
        );
        //skip, once 1st unhidden element is found (row no recorded)
        skip = 1;
        /* foundInitialRow = true; */
      }
    }

    if (skip == 1) {
      /* if (foundInitialRow == true) { */
      if (rowWithUnhidden != element.id.slice(0, 1)) {
        console.log(
          `next row found with unhidden token(s) ${element.id.slice(0, 1)}`
        );
        //if an unhidden token is found, then it means that there is more than one row with unhidden tokens - this means that we need to trigger the random removal of tokens
        if (element.style.visibility != "hidden") {
          foundSecondRowWithUnhidden = true;
          //once found skip = 2 so that this scope won't re execute
          skip = 2;
        }
      }
      /* } */
    } //Find first element of next row
  });
  //if no other row is found with an existing token  - it means that there is only 1 row with unhidden tokens. Initiate the removal of all tokens from that row
  if (foundSecondRowWithUnhidden == false) {
    console.log("only 1 row found!!!");
    triggerRandom = false;
    genStats.tokenList.forEach((element) => {
      //only remove tokens which are not "hidden" already
      if (element.style.visibility != "hidden") {
        if (element.id.slice(0, 1) == rowWithUnhidden) {
          element.style.visibility = "hidden";
          element.removed = true;

          //increment the hidden tokens to execute the winner popup if there are no more tokens left
          genStats.countRemovedTokens++;
          console.log(
            `tokens left - last row - ${genStats.countRemovedTokens}`
          );
        }
      }
    });
  } else {
    //this is used to trigger the removal of random tokens.
    triggerRandom = true;
  }

  //second part of the function - remove random tokens
  if (triggerRandom == true) {
    let removedInRow = false;
    let randomRowNo = randomNum(genStats.maxRows);

    //while the loop does not hide any tokens - do
    while (removedInRow == false) {
      genStats.tokenList.forEach((element) => {
        //for each element cycled, there's a 50/50 chance that the token will be removed
        let PercentChance = randomNum(100);
        if (element.id.slice(0, 1) == randomRowNo) {
          if (element.style.visibility != "hidden") {
            if (PercentChance < 50) {
              element.style.visibility = "hidden";
              element.removed = true;

              //flag the variable true (at least one token was hidden) - the while loop will no longer cycle
              removedInRow = true;

              genStats.countRemovedTokens++;
              console.log(
                `removed random token - random tokens - ${element.id}`
              );
              console.log(
                `tokens removed - random token removal - ${genStats.countRemovedTokens}`
              );
            }
          }
        }
      });
      //if no tokens have been removed
      if (removedInRow == false) {
        console.log("No tokens to remove in row - redirecting to next row!!!");

        //the below is made to counteract if the randomRowNum would surpass genStats.maxRows -1, once randomRowNum++ passed.
        if (randomRowNo == genStats.maxRows - 1) {
          console.log("Redirection of next row - start from randomRowNo -1");
          randomRowNo = -1;
        }
        randomRowNo++;
      }
    }
  }

  if (genStats.countRemovedTokens == 16) {
    //select the cpu as the winner
    genStats.activePlyr = 1;
    initiateWinnerMenu();
  }
};
/* i = 0;
    hc = 0;
    hc1;
    1, hc0;
    I1;
    hc1;
    hc2;
    hc3;
    1, 3;
    hc0;
    I2;
    hc1
    hc2
    hc3
    hc...5
    1,3,5
    hc0
    i3 
    hc1
    
    
    
    
    */

/* console.log(rowNum);
    heapCount++;
    if (rowNum != i) {
      heapTotals.push(heapCount);
      heapCount = 0;
      i++;
    } */

const localStorageRead = function () {
  const genStats = JSON.parse(localStorage.getItem("genStatsStr"));

  const testGenStats = JSON.parse(localStorage.getItem("genStatsStr"));

  console.log(testGenStats);

  return genStats;
};

const localStorageWrite = function (genStats) {
  console.log(genStats);
  /* localStorage.clear(); */
  const genStatsStr = JSON.stringify(genStats);
  console.log(genStatsStr);

  localStorage.setItem("genStatsStr", genStatsStr);

  console.log(localStorage);
};

const localStorageManagerTest = function (genStats) {
  console.log(`orig gensStats`);
  console.log(genStats.tokenList);
  const genStatsStr1 = JSON.stringify(genStats);
  console.log(genStatsStr1);

  const newGenStats = JSON.parse(genStatsStr1);

  console.log(newGenStats.tokenList);
  console.log(genStats.tokenList);
};

const mainMenu = function () {
  localStorageWrite(genStats);
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
  document.getElementById("player-no").textContent = `${
    genStats.activePlyr + 1
  }`;
  document.querySelector(".round-no").textContent = `Round ${
    genStats.roundNo + 1
  } of ${genStats.maxRounds}`;
  document.querySelector(".player0-wins").textContent = genStats.roundWins[0];
  document.querySelector(".player1-wins").textContent = genStats.roundWins[1];
};

const initiateWinnerMenu = function () {
  genStats.gameActive = false;

  /* let gameType;
  if (localStorage.getItem("gameType") == "onePlayer") {
    gameType = "onePlayer";
  } else {
    gameType = "twoPlayer";
  } */

  let winnerMenuType;
  genStats.roundNo == genStats.maxRounds - 1
    ? (winnerMenuType = "match")
    : (winnerMenuType = "round");

  winner(winnerMenuType, genStats /* , gameType */);
};

const winner = function (menuType, genStats /* , gameType */) {
  //winner is the player that is  active player (i.e. the player that stays with the last token loses)

  let playerWinner = genStats.activePlyr; /*  == 0 ? 1 : 0 */
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

  /* if(gameType == "onePlayer"){
    if(playerWinner == 0){
      winnerPlayerno.textContent
    }
  } */
  winnerPlayerno.textContent = playerWinner + 1;
  //make changes to menu dynamically
  if (menuType == "match") {
    winnerTitle.textContent = "Match Over";
    winnerButton1.textContent = "Play Again";
    roundNum.textContent = "";
    //specify what playerNum won
    //the player no. that appears as winner is the one that is not activePlyr
    /* winnerPlayerno.textContent =
      genStats.roundWins[0] > genStats.roundWins[1] ? "1" : "2"; */
    if (genStats.roundWins[0] > genStats.roundWins[1]) {
      winnerPlayerno.textContent = "1";
    } else if (genStats.roundWins[0] < genStats.roundWins[1]) {
      winnerPlayerno.textContent = "2";
    } else {
      winnerTitle.textContent = "Draw!";
    }

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
  if (genStats.plyrLocked == true) {
    genStats.tokenList.forEach((element) => {
      element.locked = false;
    });
    //one player game executes AI
    if (localStorage.getItem("gameType") == "onePlayer") {
      const executeAI = difficulty(localStorage.getItem("difficulty"));
      console.log(`ExecuteAI - ${executeAI}`);
      /* console.log("This is 1 player"); */
      //executing AI returns booleen true or false, in orde to determine whether or not the tokens are removed based on AI.. if true - go through AI. If false, remove random tokens.
      //N.B.
      if (executeAI) {
        console.log(`Removing tokens via AI...`);
        functionsAI();
      } else {
        console.log(`Removing random tokens/ last row removal...`);
        removeRandomTokens(genStats);
      }

      /* const heaps = calcHeaps(genStats);
      const nimSum = calcNimSum(heaps);
      genStats.computerTokensRemoval = calcNextMove(nimSum, heaps);
      computerMove(genStats); */
    } else if (localStorage.getItem("gameType") == "twoPlayer") {
      /* console.log("This is 2 player"); */
      //2 player game does not execute AI, but adds a change of player number functionality
      genStats.activePlyr == 0
        ? (genStats.activePlyr = 1)
        : (genStats.activePlyr = 0);
    }
    //unlock the player
    /* genStats.activePlyr == 0
      ? (genStats.activePlyr = 1)
      : (genStats.activePlyr = 0);
    if (genStats.activePlyr == 1) { */
    /* setTimeout(function () {
        document.querySelector(".status").textContent = "computer thinking....";
      }, 2 * 1000); */
    //execute AI
    /* const heaps = calcHeaps(genStats);
    const nimSum = calcNimSum(heaps);
    genStats.computerTokensRemoval = calcNextMove(nimSum, heaps);
    computerMove(genStats); */

    /* genStats.plyrLocked = true; */
    /* } */
    /* genStats.activePlyr = 0; */
    gameStats(genStats);

    /* document.getElementById("player-no").textContent = `${
    genStats.activePlyr + 1
  }`; */
    genStats.plyrLocked = false;
  } else {
    document.querySelector(".status").textContent = `Player ${
      genStats.activePlyr + 1
    }, remove at least one toothpick!!`;

    setTimeout(function () {
      document.querySelector(".status").textContent =
        "Remove your toothpicks of choice...";
    }, 2 * 1000);
  }
};
//current game execution
const tokenAction = function (genStats) {
  /* updateStatus("notLocked", false); */
  document.querySelector(".status").textContent =
    "Remove your toothpicks of choice...";

  console.log("Clicked");
  /* console.log(`genStats.countRemovedTokens - ${genStats.countRemovedTokens}`); */

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
        console.log(`removed tokens - ${genStats.countRemovedTokens}`);

        evt.target.removed = true;
        /* console.log("NOT LOCKED!!!"); */
        //calculate number of tokens per row which are visible
        /* const heaps = calcHeaps(genStats);
        const nimSum = calcNimSum(heaps);

        genStats.computerTokensRemoval = calcNextMove(nimSum, heaps); */
        console.log(`Tokens to remove.... ${genStats.computerTokensRemoval}`);
        console.log(genStats.computerTokensRemoval);

        document.querySelector(".status").textContent =
          "Remove your toothpicks of choice...";
      } else {
        /* updateStatus("locked", true); */
        document.querySelector(".status").textContent =
          "Please choose toothpicks from current row!";
        /* console.log("LOCKED!!!"); */
      }
      setTimeout(function () {
        document.querySelector(".status").textContent =
          "Remove your toothpicks of choice...";
      }, 2 * 1000);

      if (genStats.plyrLocked == false) {
        genStats.tokenList.forEach((element) => {
          //if clicked token row no (yBasis) is <> yBasis of the tokenList element

          if (evt.target.id.slice(0, 1) != element.id.slice(0, 1)) {
            element.locked = true;
          }
        });
      } /* else {
        updateStatus("locked", true);
        console.log("LOCKED!!!");
      }
      updateStatus("notLocked", true); */
      //this prevents the forEach loop from executing (preventing the unlocked row to become locked again)
      genStats.plyrLocked = true;

      //if plyr reaches winning token
      if (genStats.countRemovedTokens == 16) {
        //ensure that the active player is player 1 (not the cpu)
        genStats.activePlyr = 0;
        initiateWinnerMenu();
        /* genStats.gameActive = false;

        let winnerMenuType;
        genStats.roundNo == genStats.maxRounds - 1
          ? (winnerMenuType = "match")
          : (winnerMenuType = "round");

        winner(winnerMenuType, genStats); */
      }
    }
  };
};

//temp test condition - this should be a condition set in localStorage ("refreshBoard");
let testLocalStorage = true;

const genTokenNodes = function (genStats) {
  /* console.log(genStats.tokenList); */

  let tokenNum = 0;

  //splitter
  /* let { tokenList, ...rest } = genStats; */
  //generate tokens with parameters
  /* const rowLimit = 4; */
  //reset xMax regardless if genStat values are taken from init or from localStorage
  let xMax = 1;
  for (let rowNum = 0; rowNum < genStats.maxRows; rowNum++) {
    for (let x = 0; x < xMax; x++) {
      console.log("generating nodes...");
      const token = document.createElement("img");

      //careful here when entering from an existing game

      if (localStorage.getItem("refreshBoard") == "yes") {
        token.locked = false;
        token.removed = false;
        //if refreshBoard == "no" - i.e. continuing from an already loaded match
      } else {
        console.log(genStats.tokenList[0].removed);
        //set property as per the object coming from localStorage
        token.removed = genStats.tokenList[tokenNum].removed;
        if (token.removed == true) {
          token.style.visibility = "hidden";
        }

        token.locked = genStats.tokenList[tokenNum].locked;
      }

      token.src = "Toothpick.png";
      token.id = `${rowNum}${String.fromCharCode(x + 65)}`;
      token.setAttribute("onclick", "clickEvent(event)");

      /* console.log(token); */

      //add token object parameters to array

      //replace token node with property in tokenList array with same reference
      genStats.tokenList[tokenNum] = token;

      tokenNum++;
    }
    xMax += 2;
  }
  console.log(genStats);
};

const initgenStats = function () {
  if (localStorage.getItem("refreshBoard") == "no") {
    let genStats = localStorageRead();
    return genStats;
  } else if (localStorage.getItem("refreshBoard") == "yes") {
    let genStats = {
      tokenList: [],
      plyrLocked: false,
      activePlyr: 0,
      countRemovedTokens: 0,
      gameActive: true,
      roundNo: 0,
      maxRounds: JSON.parse(localStorage.getItem("maxRounds")),
      roundWins: [0, 0],
      matchReset: false,
      localStorageOption: "init",
      xMax: 1,
      computerTokensRemoval: 0,
      maxRows: 4,
    };
    return genStats;
  }
};

//populate board tokens on page via DOM
const populateBoard = function (genStats) {
  console.log(localStorage.getItem("refreshBoard"));

  //starting counter to increment the no of tokens per row
  let xMax = 1;
  let tokenIndex = 0;

  for (let rowNum = 0; rowNum < genStats.maxRows; rowNum++) {
    //create div nodes
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("rows");
    rowDiv.id = `row${[rowNum]}`;
    innerWrapper.appendChild(rowDiv);
    for (let x = 0; x < xMax; x++) {
      //DOM - add tokens to document
      rowDiv.appendChild(genStats.tokenList[tokenIndex]);

      tokenIndex++;
    }
    //increment each row by 2 tokens each time
    xMax += 2;
  }
  console.log(genStats);
};

const genStatsSplitter = function (genStats) {
  const { tokenList, ...rest } = JSON.parse(
    localStorage.getItem("genStatsStr")
  );
  console.log(tokenList);
  console.log(rest);
};

const genStats = initgenStats();

//testing to separate tokenList from other properties in genStats

genTokenNodes(genStats);

populateBoard(genStats);

/* const heaps = calcHeaps(genStats);
const nimSum = calcNimSum(heaps);
calcNextMove(nimSum, heaps); */

const clickEvent = tokenAction(genStats);

gameStats(genStats);

console.log(genStats);
