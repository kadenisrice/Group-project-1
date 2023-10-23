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
  
  // const resetBoard = () => {
  //   cardContainer.clearChildren();
  // };

const populateBoard = (imageArray, arrayLength) => {
    // resetBoard();

  for (let i = 0; i < arrayLength; i++) {
    const newDiv = document.createElement("img");
    newDiv.classList.add("card");
    /* newDiv.classList.add("card-flip"); */
        newDiv.setAttribute("src", imageArray[i]);    
    cardContainer.append(newDiv);
  }
};

difficultyBtns.forEach(element => {
    element.addEventListener("click", (e) => {
        console.log(e.target.innerHTML);
        if(e.target.innerHTML === "EASY"){
            populateBoard(imageArrayEASY, imageArrayEASY.length);
            //update section class to be "easy"
        }
        if(e.target.classList.contains("medium")){
             populateBoard(imageArray, imageArray.length);
            // update section class to be "medium"
        }
    
    });
});



populateBoard(imageArray, imageArray.length);

let firstClicked = null;
let secondClicked = null;

cardContainer.addEventListener("click", (e) => {
  if (!firstClicked && e.target.classList.contains("card")) {
    firstClicked = e.target.getAttribute("src");
  } else if (!secondClicked && e.target.classList.contains("card")) {
    secondClicked = e.target.getAttribute("src");
  }
  if (firstClicked === secondClicked) {
    console.log("Match");
    firstClicked = null;
    secondClicked = null;
  } else if (firstClicked && secondClicked) {
    console.log("Not a match");
    firstClicked = null;
    secondClicked = null;
  }
});
