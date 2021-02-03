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

  listPointer.innerHTML = "";

  actors.forEach((movie) => {
    if (filter == "all" || filter == movie.movie) {
      console.log(movie);

      let clone = templatePointer.cloneNode(true).content;
      clone.querySelector(".movie").textContent = movie.movie;
      clone.querySelector(".full_name").textContent = movie.fullname;

      listPointer.appendChild(clone);
    }
  });
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
