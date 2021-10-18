// Decalring vars
const easyBtn = document.querySelector(".easy-mode");
const mediumBtn = document.querySelector(".medium-mode");
const hardBtn = document.querySelector(".hard-mode");
var lose = new Audio("losing-sound.mp3");
var win = new Audio("winning-sound.mp3");
var popup = document.querySelector(".popup");

function loseplay() {
  lose.play();
}

//Btns change UI of Sudoku acc to difficulty level
easyBtn.addEventListener("click", () => {
  clearingInputs();
  setUpSudoku("easy");
});

mediumBtn.addEventListener("click", () => {
  clearingInputs();
  setUpSudoku("medium");
});

hardBtn.addEventListener("click", () => {
  clearingInputs();
  setUpSudoku("hard");
});

//Call at the start of the
setUpSudoku("easy");
easyBtn.style.backgroundColor = "#4197d6";
easyBtn.style.color = "white";
easyBtn.style.border = "3px solid white";


//Clearing inputs before changing difficulty level
function clearingInputs() {


  for (let i = 1; i <= 81; i++) {
    const el = document.querySelector(`#cell-${i} input`);
    el.style.backgroundColor = "white !important";
    el.classList.remove("selectColor");

    if (el.hasAttribute("disabled")) {
      el.removeAttribute("disabled");
    }
    if (el.value !== "" || el.value === "") {
      el.value = "";
      el.style.backgroundColor = "white !important";
      el.classList.remove("filledColor");
    }
  }
}

//Setups the sudoku acc to corresponding difficulty level
function setUpSudoku(level) {
  let cellMatrix;

  if (level === "easy") {
    cellMatrix = easyMatrixSudoku();
  } else if (level === "medium") {
    cellMatrix = medMatrixSudoku();
  } else if (level === "hard") {
    cellMatrix = hardMatrixSudoku();
  }

  //filling the input with matrix's values
  for (let i = 0; i < cellMatrix.length; i++) {
    for (let j = 0; j < cellMatrix[i].length; j++) {
      const cellidx = i * 9 + j + 1;
      if (cellMatrix[i][j] !== 0) {
        document.querySelector(`#cell-${cellidx} input`).value =
          cellMatrix[i][j];

        document
          .querySelector(`#cell-${cellidx} input`)
          .setAttribute("disabled", true);


      } else {
        document.querySelector(`#cell-${cellidx} input`).value = "";
      }
    }
  }
}

//Pre filled fcns of all three levels of sudoku
function easyMatrixSudoku() {
  const preFillES = [
    [1, 7, 0, 0, 0, 2, 0, 5, 0],
    [0, 0, 2, 0, 4, 9, 0, 0, 6],
    [4, 0, 0, 0, 5, 0, 3, 8, 2],
    [5, 0, 9, 0, 2, 0, 0, 4, 1],
    [2, 0, 8, 4, 3, 1, 0, 0, 0],
    [0, 0, 1, 8, 0, 0, 0, 6, 3],
    [6, 2, 0, 0, 0, 8, 7, 0, 0],
    [0, 8, 5, 2, 0, 0, 0, 0, 4],
    [0, 0, 0, 5, 0, 4, 9, 0, 0],
  ];
  return preFillES;
}

function medMatrixSudoku() {
  const preFillMS = [
    [0, 0, 0, 0, 4, 0, 0, 5, 0],
    [8, 3, 6, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 8, 0, 0, 0, 0],
    [0, 2, 0, 0, 7, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 9, 0, 4, 3],
    [0, 0, 3, 0, 0, 0, 0, 6, 0],
    [7, 1, 8, 0, 0, 5, 0, 0, 4],
    [4, 0, 0, 0, 9, 0, 1, 0, 0],
    [0, 0, 0, 8, 0, 0, 0, 0, 0],
  ];
  return preFillMS;
}

function hardMatrixSudoku() {
  const preFillHS = [
    [0, 0, 1, 0, 0, 0, 9, 0, 0],
    [0, 0, 0, 0, 0, 0, 4, 8, 7],
    [0, 0, 0, 8, 0, 0, 0, 0, 3],
    [3, 0, 8, 0, 0, 0, 0, 0, 0],
    [5, 0, 0, 2, 0, 7, 0, 0, 0],
    [0, 9, 0, 0, 0, 8, 3, 0, 0],
    [0, 8, 2, 0, 0, 0, 0, 0, 5],
    [0, 0, 5, 7, 1, 0, 0, 0, 0],
    [0, 0, 3, 0, 0, 6, 7, 0, 0],
  ];

  return preFillHS;
}

function removebg() {
  for (let i = 1; i <= 81; i++) {
    let el = document.querySelector(`#cell-${i} input`);
    if (el.hasAttribute("disabled") == false && el.value == "") {
      el.value = "";
    }
    el.classList.remove("selectColor");
  }
}

function noSelectorBgforFilledCells() {
  for (let i = 1; i <= 81; i++) {
    let el = document.querySelector(`#cell-${i} input`);
    if (el.hasAttribute("disabled") === false && el.value !== "") {
      el.classList.remove("selectColor");
    }
  }
}

// extra work
for (let i = 1; i <= 81; i++) {
  let el = document.querySelector(`#cell-${i} input`);

  el.addEventListener("click", () => {
    // remove all background from the inputs
    removebg();

    let a = i / 9;
    let b = (i % 9) - 1;



    if (b === -1) {
      b = 8;
    }

    rows(b); // cols passed

    if (b === 8) {
      a = a - 1;
    }
    cols(Math.floor(a)); // cols passed
    // cols(b, 0, a, mat); // cols passed
    // cols(b, a, 8, mat); // cols passed
  });
}

function rows(b) {
  for (let i = 0; i <= 8; i++) {
    let cellidx = i * 9 + b + 1;
    let el = document.querySelector(`#cell-${cellidx} input`);
    // el.style.backgroundColor = "#EED3D5";
    el.classList.add("selectColor");
    if (el.hasAttribute("disabled")) {
      el.classList.add("selectColor");
    }
    if (el.hasAttribute("disabled") === false && el.value !== "") {
      el.classList.remove("selectColor");
    }
  }
}

function cols(a) {
  for (let i = 0; i <= 8; i++) {
    let cellidx = a * 9 + i + 1;
    let el = document.querySelector(`#cell-${cellidx} input`);
    // el.style.backgroundColor = "#99FF99";
    el.classList.add("selectColor");
  }
}

// Styling borders of cells so tiles become visible
for (let i = 19; i <= 27; i++) {
  let el = document.querySelector(`#cell-${i} `);
  el.classList.add("borderBottom");
}

for (let i = 46; i <= 54; i++) {
  let el = document.querySelector(`#cell-${i} `);
  el.classList.add("borderBottom");
}

for (let i = 4; i <= 76; i += 9) {
  let el = document.querySelector(`#cell-${i} `);
  el.classList.add("borderLeft");
}

for (let i = 7; i <= 79; i += 9) {
  let el = document.querySelector(`#cell-${i} `);
  el.classList.add("borderLeft");
}

//Keypress to make the input visible
for (let i = 1; i <= 81; i++) {
  let el = document.querySelector(`#cell-${i} input`);
  el.addEventListener("keypress", () => {
    el.classList.add("filledColor");
  });
  noSelectorBgforFilledCells();
}

// --- Btn focus state
// ------------
let btnsarr = document.querySelectorAll(".btn");

for (let i = 0; i < btnsarr.length; i++) {
  let el = btnsarr[i];

  el.addEventListener("click", () => {
    btnsarr.forEach((val, idx) => {
      if (idx === i) {
        val.style.backgroundColor = "#4197d6";
        val.style.color = "white";
        val.style.border = "3px solid white";
      } else {
        val.style.backgroundColor = "white";
        val.style.color = "#4197d6";
        val.style.border = "3px solid #4197d6";

      }
    });
  });
}
// end




////
const sudokucover = document.querySelector('.sudoku_cover');
const validate = document.querySelector('.validate');


//----Converts UI grid of Sudoku into actual Matrix and returns it
// -------------

function UItoMatrixConverter() {
  let mainarr = [];
  let smallarr = [];

  for (let i = 1; i <= 81; i++) {

    c = 0;
    let el = document.querySelector(`#cell-${i} input`).value;
    if (el === "") {
      smallarr.push(0);
    } else {
      smallarr.push(parseInt(el));
    }

    if (i % 9 == 0) {
      mainarr.push(smallarr);
      smallarr = [];
    }

  }

  return mainarr;
}



// --------- ROWS ----------
// --------------------


function validNum(number) {
  if (number > 0 && number < 10) {
    return true;
  } else {
    return false;
  }
}

function equalArray(array1, array2) {

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}

function uniqueRow(array) {
  let newArray = [...new Set(array)];
  if (equalArray(array, newArray)) {
    return array;
  }
  // as this fcn when checks that two arrays are equal
  // --> if they are equal then it will pass the array that is Set version of particular row
  else {
    return false;
  }
}

function validRow(row) {
  let uniqRow = uniqueRow(row);
  if (row.every(validNum) && equalArray(row, uniqRow)) {
    return true;
  } else {
    return false;
  }
}


function checkRows(sudokuArray) {
  if (sudokuArray.every(validRow)) {
    return true;
  } else {
    return false;
  }
}



// --------- COLUMNS ----------
// --------------------

function transposeArray(array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push([]);
    for (let j = 0; j < array.length; j++) {
      newArray[i].push(array[j][i]);
    }
  }
  return newArray;
}




// --------- TILE CHECKER ----------
// --------------------
function checkSquares(sudokuArray) {

  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      square = [];
      for (let k = i; k < i + 3; k++) {
        for (let l = j; l < j + 3; l++) {
          square.push(sudokuArray[k][l]);
        }
      }
      if (!validRow(square)) {
        return false;
      }
    }
  }
  return true;
}



// --------- Val-dation of all -----------
// --------------------

validate.addEventListener("click", () => {


  const preFillES_ans = UItoMatrixConverter();
  const rowValidator = checkRows(preFillES_ans);
  const colsFromRows = transposeArray(preFillES_ans);
  const colValidator = checkRows(colsFromRows);
  const tileValidator = checkRows(preFillES_ans);


  let alertString = "";
  let falseFLag = false;

  if (rowValidator === false) {
    falseFLag = true;
    alertString += `Rows have problem `;
  }
  if (colValidator === false) {
    falseFLag = true;
    alertString += `Cols have problem `;
  }
  if (tileValidator === false) {
    falseFLag = true;
    alertString += `Tiles have problem `;
  }
  alertString += "<br/> TRY AGAIN!"

  // If any of the three one becomes false  
  if (falseFLag === true) {
    // losing sound plays
    loseplay();

    //-Lose styling of popup card
    popup.style.backgroundColor = "red";
    popup.innerHTML = alertString;
    popup.style.left = "5%";
    setTimeout(function () { popup.style.left = "-90%"; }, 3000);

  }

  // If outcome comes true 
  if (rowValidator && colValidator && tileValidator) {

    //Confetti starts
    win.play();
    confetti.start();

    // within time it will stop
    setTimeout(function () { confetti.stop(); }, 1000);

    //-Success styling of popup card
    popup.style.backgroundColor = "rgb(89, 207, 43)";
    popup.innerText = "Congrats!!, You have completed your Sudoku ";
    popup.style.left = "5%";
    setTimeout(function () { popup.style.left = "-90%"; }, 3000);

  }


});






