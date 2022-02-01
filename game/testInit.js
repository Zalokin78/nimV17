"use strict";

/* const init = function () {
  let x;
  return x;
};

const doSomething = function (x) {
  //do
  init();
  x = "Harry";
  console.log(x);
};

doSomething(); */

/* const arr = [
  "a0",
  ["aa0", ["ab0", ["abb0", "abb1", "abb2"]]],
  ["b0", "b1"],
  ["c0", "c1"],
];

console.log(arr); */

/* const arr = ["a", "b", ["a1"]]; */
/* localStorage.clear();

let myObj = { name: "Bob", age: 50, arr: ["a", ["b", "c"]] };

console.log(myObj);

let myObj_serialized = JSON.stringify(myObj);

console.log(myObj_serialized);

localStorage.setItem("myObj", myObj_serialized);

console.log(localStorage);

let myObj_deserialized = JSON.parse(localStorage.getItem("myObj"));

console.log(myObj_deserialized); */

let msg = "blah";

const printDelayed = function (str) {
  console.log("HELLO!!");

  setTimeout(function () {
    console.log(str);
  }, 1.5 * 1000);
};

printDelayed(msg);

/* let x = 0;

console.log(x);

let x = 1;

console.log(x); */
/* const testObj = { name: "Harry", age: 50, arr: ["a", ["b", "c"]] };

let objSer = JSON.stringify(testObj);

console.log(objSer);

localStorage.setItem("myObj", objSer);

console.log(localStorage); */
/* if (typeof varX == "undefined") {
  let varX;
  
}
varX = 0;

console.log(x); */

/* let condition = true;

const testFunc = function () {
  if (condition == true) {
    let returnVal = 1;
    return returnVal;
  }
};

const y = testFunc();

console.log(`y = ${y}`); */

/* const b = function (n) {
  n += 100;
  return n;
};

const a = function (n) {
  n += 10;
  return n;
};

const y = a(1);
console.log(y);
const z = b(y);
console.log(z); */

const testObj = { name: "Nicholas", surname: "Galliano", age: 43 };

const returnArray = function () {
  const { name, ...rest } = testObj;
  console.log(rest);
  return [name, rest];
};

const array = returnArray();

console.log(array);
