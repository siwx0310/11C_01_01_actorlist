"use strict";

// Venter på at DOM'en er indlæst
// waiting for the dom is loaded
document.addEventListener("DOMContentLoaded", start);

let actors;
let filter = "all";

async function start() {
  console.log("start");
  let jsonFile = "/actors.json";
  let jsonData = await fetch(jsonFile);
  actors = await jsonData.json();
  console.log(actors);
  showActors();
  addEventListenersToButtons();
}

function showActors() {
  console.log(actors);

  const templatePointer = document.querySelector("template");
  const listPointer = document.querySelector("#list");
  const popop = document.querySelector("#popop");

  listPointer.innerHTML = "";

  actors.forEach((movie) => {
    if (filter == "all" || filter == movie.movie) {
      console.log(movie);

      let clone = templatePointer.cloneNode(true).content;
      clone.querySelector(".movie").textContent = movie.movie;
      clone.querySelector(".full_name").textContent = movie.fullname;

      clone
        .querySelector("#actor")
        .addEventListener("click", () => showPopOp(movie));
      listPointer.appendChild(clone);
    }
  });
}

document
  .querySelector("#luk")
  .addEventListener("click", () => (popop.style.display = "none"));

function showPopOp(movie) {
  console.log(movie);
  popop.style.display = "block";
  popop.querySelector(".movie").textContent = movie.movie;
  popop.querySelector(".full_name").textContent = movie.fullname;
}

function addEventListenersToButtons() {
  document.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", filterBTNs);
  });
}

function filterBTNs() {
  filter = this.dataset.kategori;
  document.querySelector("#emne").textContent = this.textContent;
  showActors();
}
