"use strict";

const arrayOfCards = [{}];

//SELECTORS AND VARIABLES ---------

const cardContainer = document.querySelector(".card-container");

// FUNCTIONS AND EVENTS ------------

const populateBoard = () => {
  for (let i = 0; i < 12; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card");

    cardContainer.append(newDiv);
  }
};
populateBoard();
