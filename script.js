"use strict";

//SELECTORS AND VARIABLES ---------

const cardContainer = document.querySelector(".card-container");
const difficultyBtns = document.querySelectorAll(".difficultyBtn");

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
    const randomIndex = Math.floor(Math.random() * (i +1));

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

let firstClicked = null;
let secondClicked = null;
let firstClickedElement = null;
let secondClickedElement = null;

cardContainer.addEventListener("click", (e) => {
  let card = e.target.parentNode;
  if (!firstClicked && e.target.classList.contains("back")) {
   
    firstClicked = card.querySelector(".front").getAttribute("src");
    card.classList.add("flipped");
  } else if (!secondClicked && e.target.classList.contains("back")) {
    
    secondClicked = card.querySelector(".front").getAttribute("src");
  }
  if (firstClicked && secondClicked) {
    if (firstClicked === secondClicked) {
      console.log("Match");
      firstClicked = null;
      secondClicked = null;
    } else if (firstClicked !== secondClicked) {
      console.log("Not a match");
      card.classList.remove("flipped");
      firstClicked = null;
      secondClicked = null;
    }
  }
  
});
