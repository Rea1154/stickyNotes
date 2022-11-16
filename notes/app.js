"use strict";

const penBtn = document.querySelector(".add-note");
const paperDiv = document.querySelector(".paper-div");
const board = document.querySelector(".board");
const addBtn = document.querySelector(".add-btn");
const textArea = document.querySelector(".paper");

function writeNote() {
  const notes = document.getElementsByClassName("note");

  if (notes.length > 17) {
    alert("Maximum note limit is 18");
    textArea.value = "";
    paperDiv.classList.add("paper-div-hidden");
    return;
  }
  paperDiv.classList.toggle("paper-div-hidden");
}

let newDiv;
let deleteBtn;
let tickBtn;

function newNote() {
  let text = textArea.value;

  //note div
  newDiv = document.createElement("div");
  newDiv.classList.add("note");
  newDiv.innerHTML = `<div class="pin"></div> <p class="note-text">${text}</p>`;
  newDiv.style.background = color();
  //newDiv.style.transform = rotate();

  const pTag = document.querySelector(".note-text");

  //if note is empty return
  if (!text || text.replace(/\s/g, "").length == 0) return;
  // display new note
  board.appendChild(newDiv);
  // clear textfield and close input window
  textArea.value = "";
  paperDiv.classList.add("paper-div-hidden");

  //notes wiggle animation
  const notes = Array.from(document.getElementsByClassName("note"));
  notes.forEach((note) => {
    note.addEventListener("mouseenter", () => {
      note.classList.add("note-wiggle");
      setTimeout(() => {
        note.classList.remove("note-wiggle");
      }, 2000);
    });
  });

  //delete btn
  deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = `<i class="trash-icon fa-solid fa-trash"></i>`;
  newDiv.appendChild(deleteBtn);
  //click on delete btn
  deleteBtn.addEventListener("click", (e) => {
    e.target.parentElement.remove();
  });

  //tick-btn
  tickBtn = document.createElement("button");
  tickBtn.classList.add("tick-btn");
  tickBtn.innerHTML = `<i class="tick fa-solid fa-check"></i>`;
  newDiv.appendChild(tickBtn);

  tickBtn.addEventListener("click", (e) => {
    const currentP = e.target.parentElement.children[1];

    let textDecoration = window
      .getComputedStyle(currentP, null)
      .getPropertyValue("text-decoration-line");

    textDecoration == "none"
      ? (currentP.style.textDecoration = "line-through")
      : (currentP.style.textDecoration = "none");
  });
}

penBtn.addEventListener("click", writeNote);

addBtn.addEventListener("click", newNote);

//close textbox if clicked outside
board.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("add-btn") &&
    !e.target.classList.contains("paper")
  )
    paperDiv.classList.add("paper-div-hidden");
});

//note color pick
let i = 0;
function color() {
  const colors = [
    "rgb(186 152 122)",
    "pink",
    "orange",
    "rgb(114 198, 247)",
    "rgb(242 246 248)",
    "#37f0b2fa",
    "#e9e793fa",
  ];
  if (i > colors.length - 1) {
    i = 0;
  }
  return colors[i++];
}

//random note position
function rotate() {
  const noteRotate = [
    "rotate(1deg)",
    "rotate(-1deg)",
    "rotate(-10deg)",
    "rotate(-3deg)",
    "rotate(3deg)",
    "rotate(-5deg)",
  ];

  return noteRotate[Math.floor(Math.random() * noteRotate.length)];
}
