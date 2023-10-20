"use strict";

const cardContainer = document.querySelector(".card-container")

for(let i = 0; i < 12; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card");
    cardContainer.append(newDiv);
}