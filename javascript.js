"use strict";

// Venter på at DOM'en er indlæst
// waiting for the dom is loaded
document.addEventListener("DOMContentLoaded", start);

let actors;
let filter = "all";
let popop = document.querySelector("#popop");
let closeWin = document.querySelector("#close");

async function start() {
  console.log("start");
  let jsonFile = "../actors.json";
  let jsonData = await fetch(jsonFile);
  actors = await jsonData.json();
  console.log(actors);
  closeWin.style.display = "none";

  showActors();
  addEventListenersToButtons();
}

function showActors() {
  console.log(actors);

  let templatePointer = document.querySelector("template");
  let listPointer = document.querySelector("#list");

  listPointer.innerHTML = "";

  actors.forEach((movie) => {
    if (filter == "all" || filter == movie.movie) {
      console.log(movie);

      let clone = templatePointer.cloneNode(true).content;
      clone.querySelector(".movie").textContent = movie.fullname;
      clone.querySelector(".full_name").textContent = movie.movie;

      clone
        .querySelector("#actor")
        .addEventListener("click", () => showPopOp(movie));
      listPointer.appendChild(clone);
    }
  });
}

closeWin.addEventListener("click", () => (popop.style.display = "none"));

function showPopOp(movie) {
  console.log(movie);
  closeWin.style.display = "";
  popop.style.display = "block";
  popop.querySelector(".movie").textContent = movie.fullname;
  popop.querySelector(".full_name").textContent = movie.movie;
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
