"use strict";

// Game State Variables
let gameActive = false;
let time = 59;
let timerInterval;

// DOM Selectors for Game Elements
const cardContainer = document.querySelector(".card-container");
const timer = document.querySelector(".timer");
const resultScreen = document.querySelector(".result");
const winMessage = document.querySelector(".win-message");
const lose = document.querySelector(".lose");
const win = document.querySelector(".win");

// DOM Selectors for Control Elements
const difficultyBtns = document.querySelectorAll(".difficultyBtn");
const startBtn = document.querySelector(".start-btn");
const levelBtn = document.querySelector(".level-btn");
const muteBtn = document.querySelector(".mute-btn");
const gameControl = document.querySelector(".game-control");

// DOM Selectors for Level and Theme Elements
const choosingLevel = document.querySelector(".choosing-level");
const main = document.querySelector("main");
const playingGame = document.querySelector(".playing-game");
const themeTitle = document.querySelector(".theme-title");

// Audio Elements
const easyMusic = document.getElementById("easy-music");
const mediumMusic = document.getElementById("medium-music");
const hardMusic = document.getElementById("hard-music");

// ----------------- FUNCTIONS AND EVENTS -----------------

// Image Arrays for Different Difficulty Levels

// Hard Level Image Array (16 images, 8 pairs)
const imageArrayHard = [
  "assets/hard/hard-boo.png",
  "assets/hard/hard-boo.png",
  "assets/hard/hard-cute.png",
  "assets/hard/hard-cute.png",
  "assets/hard/hard-garden.png",
  "assets/hard/hard-garden.png",
  "assets/hard/hard-nature.png",
  "assets/hard/hard-nature.png",
  "assets/hard/hard-pumpkin.png",
  "assets/hard/hard-pumpkin.png",
  "assets/hard/hard-red.png",
  "assets/hard/hard-red.png",
  "assets/hard/hard-straw.png",
  "assets/hard/hard-straw.png",
  "assets/hard/hard-wizard.png",
  "assets/hard/hard-wizard.png",
];

// Medium Level Image Array (12 images, 6 pairs)
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

// Easy Level Image Array (8 images, 4 pairs)
const imageArrayEasy = [
  "assets/easy/hello-kitty.jpg",
  "assets/easy/hello-kitty.jpg",
  "assets/kitten.jpg",
  "assets/kitten.jpg",
  "assets/frog.jpg",
  "assets/frog.jpg",
  "assets/panda.jpg",
  "assets/panda.jpg",
];

const shuffle = (array) => {
  // Iterate through the array backwards
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // Store the value at index i in a temporary variable
    let temp = array[i];
    // Swap the value at index i with the value at the random index
    array[i] = array[randomIndex];
    // Set the value at the random index to the temporary variable
    array[randomIndex] = temp;
  }
};

// Use an image array to populate the "card-container"
const populateBoard = (imageArray) => {
  shuffle(imageArray);
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
  // Check for 'easy' class and populate board accordingly
  if (main.classList.contains("easy")) {
    themeTitle.textContent = "Slaaaay";
    populateBoard(imageArrayEasy);
    // Check for 'medium' class and populate board accordingly
  } else if (main.classList.contains("medium")) {
    populateBoard(imageArrayMedium);
    themeTitle.textContent = "THE JUNGLE";
    // Check for 'hard' class and populate board accordingly
  } else if (main.classList.contains("hard")) {
    themeTitle.textContent = "Spookville";
    populateBoard(imageArrayHard);
  }
  // After populating the board we save an updated array of the cards
  cardNodeList = document.querySelectorAll(".card");
};

choosingLevel.addEventListener("click", (e) => {
  resetBoard(); // Reset the game board

  // Set level to 'easy' and update board
  if (e.target.classList.contains("easy-btn")) {
    main.classList.remove("medium", "hard");
    main.classList.add("easy");
    e.target.classList.toggle("level-emphasize");
    determineBoardArray();
  }
  // Set level to 'medium' and update board
  if (e.target.classList.contains("medium-btn")) {
    main.classList.remove("easy", "hard");
    main.classList.add("medium");
    determineBoardArray();
  }
  // Set level to 'hard' and update board
  if (e.target.classList.contains("hard-btn")) {
    main.classList.remove("easy", "medium");
    main.classList.add("hard");
    determineBoardArray();
  }
  // Start game and play level-specific music
  if (e.target.classList.contains("go-btn")) {
    if (main.classList.contains("easy")) {
      easyMusic.volume = 0.1;
      easyMusic.play();
    } else if (main.classList.contains("medium")) {
      mediumMusic.volume = 0.1;
      mediumMusic.play();
    } else if (main.classList.contains("hard")) {
      hardMusic.volume = 0.1;
      hardMusic.play();
    }

    choosingLevel.style.display = "none"; // Hide level selection
    playingGame.style.display = "flex"; // Show game board
    determineBoardArray(); // Update board
  }
});

let cardNodeList = document.querySelectorAll(".card");

const checkWin = (array) => {
  if (!Array.from(array).some((card) => !card.classList.contains("matched"))) {
    return true;
  }
};

let firstClicked = null;
let secondClicked = null;
let firstClickedElement = null;
let secondClickedElement = null;

cardContainer.addEventListener("click", (e) => {
  if (gameActive === false) {
    return; // Exit if game is inactive
  }
  if (e.target.classList.contains("back")) {
    let card = e.target.parentNode;
    if (!firstClicked) {
      // Store first card details
      firstClicked = card.querySelector(".front").getAttribute("src");
      firstClickedElement = card;
      card.classList.add("flipped"); // Flip the first card
    } else if (!secondClicked && card !== firstClickedElement) {
      // Store second card details
      secondClicked = card.querySelector(".front").getAttribute("src");
      secondClickedElement = card;
      card.classList.add("flipped"); // Flip the second card

      if (firstClicked === secondClicked) {
        // Match found
        firstClickedElement.classList.add("matched");
        secondClickedElement.classList.add("matched");
        // Win condition - pass the array of cards to our function that checks for a win
        if (checkWin(cardNodeList)) {
          let timeCompleted = 59 - time;
          // Add score to local storage
          winMessage.textContent = `You did it in ${timeCompleted} seconds!`;
          clearInterval(timerInterval);
          setTimeout(() => {
            win.style.display = "block";
            resultScreen.style.display = "flex";
          }, 1000);
        }
        // Reset card variables
        firstClicked = null;
        secondClicked = null;
        firstClickedElement = null;
        secondClickedElement = null;
      } else {
        // Not a match, flip cards back after 1000 miliseconds
        setTimeout(() => {
          firstClickedElement.classList.remove("flipped");
          secondClickedElement.classList.remove("flipped");
          firstClicked = null;
          secondClicked = null;
          firstClickedElement = null;
          secondClickedElement = null;
        }, 1000);
      }
    }
  }
});

const updateTimer = () => {
  // Update timer text content
  timer.textContent = time > 9 ? `00:${time}` : `00:0${time}`;
  time--; // Decrement time by 1
  if (time < 0) {
    // Time's up, game over
    gameActive = false; // Set game to inactive
    setTimeout(() => {
      lose.style.display = "block"; // Show lose message
      resultScreen.style.display = "flex"; // Show result screen
    }, 1000);
    clearInterval(timerInterval); // Stop the timer
  }
};

function resetBoard() {
  // Remove all child nodes from cardContainer
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  // Reset card click variables
  firstClicked = null;
  secondClicked = null;
  firstClickedElement = null;
  secondClickedElement = null;

  clearInterval(timerInterval); // Clear the timer interval
  time = 59; // Reset time

  startBtn.disabled = false; // Enable the start button
  timer.textContent = `01:00`; // Reset timer text content
  gameActive = false; // Set game to inactive

  // Hide lose, win, and result screens
  lose.style.display = "none";
  win.style.display = "none";
  resultScreen.style.display = "none";
}

gameControl.addEventListener("click", (e) => {
  // If reset button is clicked, reset the board and update it
  if (e.target.classList.contains("reset-btn")) {
    resetBoard();
    determineBoardArray();
  }
  // If start button is clicked activate game and start the timer
  if (e.target.classList.contains("start-btn")) {
    gameActive = true; // Activate game
    e.target.disabled = true; // Disable the start button
    // Start timer with 1-second interval
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
  resetBoard(); // Reset the game board
  choosingLevel.style.display = "flex"; // Show level selection screen
  playingGame.style.display = "none"; // Hide game screen
  resultScreen.style.display = "none"; // Hide result screen

  // Pause and reset music if they click "Change Level"
  if (main.classList.contains("easy")) {
    easyMusic.pause(); // Pause easy level music
    easyMusic.currentTime = 0; // Reset easy music playback time
  } else if (main.classList.contains("medium")) {
    mediumMusic.pause(); // Pause medium level music
    mediumMusic.currentTime = 0; // Reset medium music playback time
  } else if (main.classList.contains("hard")) {
    hardMusic.pause(); // Pause hard level music
    hardMusic.currentTime = 0; // Reset hard music playback time
  }
});

muteBtn.addEventListener("click", () => {
  // Toggle mute state for all music tracks
  easyMusic.muted = !easyMusic.muted;
  mediumMusic.muted = !mediumMusic.muted;
  hardMusic.muted = !hardMusic.muted;

  // Update mute button text based on current level and mute state
  if (main.classList.contains("easy")) {
    muteBtn.textContent = easyMusic.muted ? "UNMUTE" : "MUTE";
  } else if (main.classList.contains("medium")) {
    muteBtn.textContent = mediumMusic.muted ? "UNMUTE" : " MUTE ";
  } else if (main.classList.contains("hard")) {
    muteBtn.textContent = hardMusic.muted ? "UNMUTE" : "MUTE";
  }
});
