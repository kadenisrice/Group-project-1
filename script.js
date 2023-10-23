"use strict";

//SELECTORS AND VARIABLES ---------

const cardContainer = document.querySelector(".card-container");
const difficultyBtns = document.querySelectorAll(".difficultyBtn");
const timer = document.querySelector(".timer");

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
  shuffle(imageArray);
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
    console.log("You win");
  }
};

cardContainer.addEventListener("click", (e) => {
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

let time = 60;
const updateTimer = () => {
  timer.textContent = time;
  time--;
  console.log(time);
};

let timerInterval;

gameControl.addEventListener("click", (e) => {
  if (e.target.classList.contains("reset-btn")) {
    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild);
    }
    populateBoard();
    cardNodeList = document.querySelectorAll(".card");
    firstClicked = null;
    secondClicked = null;
    firstClickedElement = null;
    secondClickedElement = null;
  }

  if (e.target.classList.contains("start-btn")) {
    setInterval(updateTimer, 1000);
  }
});
