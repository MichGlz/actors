const url = "json/actors.json";

const abecedario = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
abecedario.forEach(creatSec);

function creatSec(letter) {
  console.log(letter);
  //grab the template
  const template = document.querySelector("#letter").content;
  //clone it
  const copy = template.cloneNode(true);
  //change content
  copy.querySelector("section").id = `letter_${letter}`;
  copy.querySelector("h2").textContent = letter.toUpperCase();

  //grab parent
  const parent = document.querySelector("#leterList");
  //append
  parent.appendChild(copy);
}

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleActorList(data);
  });

let i;
let n = 0;

function handleActorList(data) {
  console.log(data);
  i = data.length;
  // data.forEach(showActor);
  data.forEach(takeActor);
}

function showActorPop() {
  //grab the template
  const template1 = document.querySelector("#actors").content;
  //clone it
  const copy = template1.cloneNode(true);
  //change content
  copy.querySelector(".modal").addEventListener("click", modalRemove);
  copy.querySelector("span.name").textContent = this.textContent;
  copy.querySelector("span.movie").textContent = this.parentElement.querySelector("input").value;
  //grab parent
  const parent = document.querySelector("#actorList");
  //append
  parent.appendChild(copy);
}

function takeActor(actor) {
  //grab the template
  const template2 = document.querySelector("#liActor").content;
  //clone it
  const copy = template2.cloneNode(true);
  //change content
  copy.querySelector("li a span.name").textContent = actor.fullname;
  // copy.querySelector("li a").href = `actor.html?actor=${actor.fullname}`;
  copy.querySelector("li a").addEventListener("click", showActorPop);
  copy.querySelector(".actorMovie").value = actor.movie;
  //grab parent

  let actorName = actor.fullname.toString();
  let firstLeter = actorName.charAt(0);
  let actorLower;
  let parentActor;
  if (isNaN(firstLeter)) {
    actorLower = actorName.toLowerCase();

    parentActor = `#letter_${actorLower.charAt(0)} ol`;
  } else {
    actorLower = actorName.toString();
    parentActor = `#Num ol`;
  }
  const parent = document.querySelector(parentActor);
  //append
  parent.appendChild(copy);

  n = n + 1;
  if (n == i) {
    removeOl();
  }
}

let idRemove;

function removeOl() {
  console.log("removeOL()");
  document.querySelectorAll("section ol").forEach(removeP);
  function removeP(item) {
    if (item.childElementCount < 1) {
      idRemove = item.parentElement.id;

      item.parentElement.remove();
    }
  }
}

function modalRemove() {
  document.querySelector(".modal").remove();
}
