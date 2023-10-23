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

// FUNCTIONS AND EVENTS ------------

const imageArray = [
  "assets/puppy.jpg",
  "assets/puppy.jpg",
  "assets/kitten.jpg",
  "assets/kitten.jpg",
  "assets/frog.jpg",
  "assets/frog.jpg",
  "assets/monkey.jpg",
  "assets/monkey.jpg",
  "assets/fish.jpg",
  "assets/fish.jpg",
  "assets/panda.jpg",
  "assets/panda.jpg",
];

const imageArrayEasy = [
  "assets/puppy.jpg",
  "assets/puppy.jpg",
  "assets/kitten.jpg",
  "assets/kitten.jpg",
  "assets/frog.jpg",
  "assets/frog.jpg",
];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    let temp = array[i];

    array[i] = array[randomIndex];

    array[randomIndex] = temp;
  }
};

const populateBoard = () => {
  //shuffle(imageArray);
  for (let i = 0; i < 12; i++) {
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

populateBoard();

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
          console.log("you won.");
          let timeCompleted = 59 - time;
          winMessage.textContent = `You did it in ${timeCompleted} seconds!`;
          console.log(timeCompleted);
          clearInterval(timerInterval);
          resultScreen.style.display = "block";
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
        }, 600);
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

    resultScreen.style.display = "block";
    clearInterval(timerInterval);
  }
};

const resetBoard = () => {
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
  populateBoard();
  cardNodeList = document.querySelectorAll(".card");
  firstClicked = null;
  secondClicked = null;
  firstClickedElement = null;
  secondClickedElement = null;
  clearInterval(timerInterval);
  time = 59;
  startBtn.disabled = false;
  timer.textContent = `01:00`;
  gameActive = false;
};

gameControl.addEventListener("click", (e) => {
  if (e.target.classList.contains("reset-btn")) {
    resetBoard();
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

    // set display: none; for result screen after clicking play again
    resultScreen.style.display = "none";
  }
});
