"use strict";

//SELECTORS AND VARIABLES ---------

const cardContainer = document.querySelector(".card-container");
const difficultyBtns = document.querySelectorAll(".difficultyBtn");
const timer = document.querySelector(".timer");
const startBtn = document.querySelector(".start-btn");
let gameActive = false;
const resultScreen = document.querySelector(".result");
let time = 59;
let timerInterval;
const winMessage = document.querySelector(".win-message");
const lose = document.querySelector(".lose");
const win = document.querySelector(".win");
const choosingLevel = document.querySelector(".choosing-level");
const main = document.querySelector("main");
const playingGame = document.querySelector(".playing-game");
const levelBtn = document.querySelector(".level-btn");

// FUNCTIONS AND EVENTS ------------
const imageArrayHard = [
  "assets/hard/hard-boo.jpg",
  "assets/hard/hard-boo.jpg",
  "assets/hard/hard-cutie.jpg",
  "assets/hard/hard-cutie.jpg",
  "assets/hard/hard-scarecrow.jpg",
  "assets/hard/hard-scarecrow.jpg",
  "assets/hard/hard-plaid.jpg",
  "assets/hard/hard-plaid.jpg",
  "assets/hard/hard-pumpkin.jpg",
  "assets/hard/hard-pumpkin.jpg",
  "assets/hard/hard-pumpkinboy.jpg",
  "assets/hard/hard-pumpkinboy.jpg",
  "assets/hard/hard-redscarf.jpg",
  "assets/hard/hard-redscarf.jpg",
  "assets/hard/hard-spooky.jpg",
  "assets/hard/hard-spooky.jpg",
];

//16

const imageArrayMedium = [
  "assets/medium/butterfly-1.png",
  "assets/medium/butterfly-1.png",
  "assets/medium/cheetah-1.png",
  "assets/medium/cheetah-1.png",
  "assets/medium/frog-1.png",
  "assets/medium/frog-1.png",
  "assets/medium/gorilla-1.png",
  "assets/medium/gorilla-1.png",
  "assets/medium/snake-1.png",
  "assets/medium/snake-1.png",
  "assets/medium/tiger-1.png",
  "assets/medium/tiger-1.png",
];

//12

const imageArrayEasy = [
  "assets/puppy.jpg",
  "assets/puppy.jpg",
  "assets/kitten.jpg",
  "assets/kitten.jpg",
  "assets/frog.jpg",
  "assets/frog.jpg",
  "assets/panda.jpg",
  "assets/panda.jpg",
];

//8

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    let temp = array[i];

    array[i] = array[randomIndex];

    array[randomIndex] = temp;
  }
};

const populateBoard = (imageArray) => {
  //shuffle(imageArray);
  for (let i = 0; i < imageArray.length; i++) {
    // Create a new card div element
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card"); // Add the "card" class to it
    // Create a new image element for the card front
    const newImg = document.createElement("img");
    newImg.classList.add("front"); // Add the "front" class to it
    newImg.setAttribute("src", imageArray[i]); // Set its source to the shuffled image array
    // Create a new div element for the card back
    const cardBack = document.createElement("div");
    cardBack.classList.add("back"); // Add the "back" class to it
    // Append the image (front) and the div (back) to the card
    cardDiv.appendChild(newImg);
    cardDiv.appendChild(cardBack);
    // Append the complete card to the container
    cardContainer.append(cardDiv);
  }
};

const determineBoardArray = () => {
  if (main.classList.contains("easy")) {
    populateBoard(imageArrayEasy);
  } else if (main.classList.contains("medium")) {
    populateBoard(imageArrayMedium);
  } else if (main.classList.contains("hard")) {
    populateBoard(imageArrayHard);
  }
  cardNodeList = document.querySelectorAll(".card");
};

choosingLevel.addEventListener("click", (e) => {
  resetBoard();
  if (e.target.classList.contains("easy-btn")) {
    main.classList.remove("medium", "hard");
    main.classList.add("easy");
    determineBoardArray();
  }
  if (e.target.classList.contains("medium-btn")) {
    main.classList.remove("easy", "hard");
    main.classList.add("medium");
    determineBoardArray();
  }
  if (e.target.classList.contains("hard-btn")) {
    main.classList.remove("easy", "medium");
    main.classList.add("hard");
    determineBoardArray();
  }
  if (e.target.classList.contains("go-btn")) {
    choosingLevel.style.display = "none";
    playingGame.style.display = "flex";
    determineBoardArray();
  }
});

let cardNodeList = document.querySelectorAll(".card");
const gameControl = document.querySelector(".game-control");

let firstClicked = null;
let secondClicked = null;
let firstClickedElement = null;
let secondClickedElement = null;

const checkWin = (array) => {
  if (!Array.from(array).some((card) => !card.classList.contains("matched"))) {
    return true;
  }
};

cardContainer.addEventListener("click", (e) => {
  if (gameActive === false) {
    return;
  }
  if (e.target.classList.contains("back")) {
    let card = e.target.parentNode;
    console.dir(card);
    if (!firstClicked) {
      firstClicked = card.querySelector(".front").getAttribute("src");
      firstClickedElement = card; // 1. Store first card element.
      card.classList.add("flipped");
    } else if (!secondClicked && card !== firstClickedElement) {
      // 2. Ensure second card isn't same as first.
      secondClicked = card.querySelector(".front").getAttribute("src");
      secondClickedElement = card; // 3. Store second card element.
      card.classList.add("flipped");

      if (firstClicked === secondClicked) {
        console.log("Match");
        firstClickedElement.classList.add("matched");
        secondClickedElement.classList.add("matched");

        if (checkWin(cardNodeList)) {
          win.style.display = "block";
          console.log("you won.");
          let timeCompleted = 59 - time;
          // Add score to local storage
          winMessage.textContent = `You did it in ${timeCompleted} seconds!`;
          console.log(timeCompleted);
          clearInterval(timerInterval);
          resultScreen.style.display = "flex";
        }
        firstClicked = null;
        secondClicked = null;
        firstClickedElement = null;
        secondClickedElement = null;
      } else {
        console.log("Not a match");
        setTimeout(() => {
          firstClickedElement.classList.remove("flipped");
          secondClickedElement.classList.remove("flipped");
          firstClicked = null;
          secondClicked = null;
          firstClickedElement = null;
          secondClickedElement = null;
        }, 1000);
        // 4. Flip cards back
      }

      // 5. Reset after checking match.
    }
  }
});

const updateTimer = () => {
  timer.textContent = time > 9 ? `00:${time}` : `00:0${time}`;
  time--;
  console.log(time);
  if (time < 0) {
    console.log("You lose");
    lose.style.display = "block";
    resultScreen.style.display = "flex";
    clearInterval(timerInterval);
  }
};

function resetBoard() {
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
  // HAAHAHAHAHAHHAHAHAHAHHHAHAHAHAHAHHAHAHA
  firstClicked = null;
  secondClicked = null;
  firstClickedElement = null;
  secondClickedElement = null;
  clearInterval(timerInterval);
  time = 59;
  startBtn.disabled = false;
  timer.textContent = `01:00`;
  gameActive = false;
  lose.style.display = "none";
  win.style.display = "none";
  resultScreen.style.display = "none";
}

gameControl.addEventListener("click", (e) => {
  if (e.target.classList.contains("reset-btn")) {
    resetBoard();
    determineBoardArray();
  }

  if (e.target.classList.contains("start-btn")) {
    gameActive = true;
    e.target.disabled = true;
    timerInterval = setInterval(updateTimer, 1000);
  }
});

// Event listener for the results screen
resultScreen.addEventListener("click", (e) => {
  // play again button just resets the board
  if (e.target.classList.contains("play-again")) {
    resetBoard();
    determineBoardArray();

    // set display: none; for result screen after clicking play again
    resultScreen.style.display = "none";
  }
});

levelBtn.addEventListener("click", () => {
  choosingLevel.style.display = "flex";
  playingGame.style.display = "none";
});
