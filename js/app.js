const urlParams = new URLSearchParams(window.location.search);

const movie = urlParams.get("movie");
const lastName = urlParams.get("sortBy");

const url = "json/actors.json";

let movieSelector = document.querySelector("#movieSelector");
movieSelector.addEventListener("change", selectMovie);
let sortBySelector = document.querySelector("#sortBy");
sortBySelector.addEventListener("change", () => {
  if (sortBySelector.value == "lastName") {
    location.href = `index.html?sortBy=lastName`;
  } else {
    location.href = `index.html`;
  }
});

//-------------------pop up actors filter by movie------------------------------
if (movie) {
  //grab the template
  const templateMovie = document.querySelector("#movieTemplate").content;
  //clone it
  const copy = templateMovie.cloneNode(true);
  //change content
  copy.querySelector(".modal").addEventListener("click", modalRemove);
  copy.querySelector(".movieName").textContent = movie;

  //grab parent
  const parent = document.querySelector("#actorList");
  //append
  parent.appendChild(copy);

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      filterActors(data);
    });
}

function filterActors(actors) {
  actors.forEach((actor) => {
    if (actor.movie == movie) {
      var liActor = document.createElement("LI");
      liActor.innerText = actor.fullname;
      document.querySelector(".actorList").appendChild(liActor);
    }
  });
}

function selectMovie(e) {
  console.log(movieSelector.value);

  movieUrl = `?movie=${movieSelector.value}`;

  location.href = `index.html${movieUrl}`;
}
//--------------------------------------------

//---------------abecedary sections and links----------------
const abecedario = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
abecedario.forEach(creatSec);

function creatSec(letter) {
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

abecedario.forEach(creatLi);

function creatLi(letter) {
  //grab the template
  const template2 = document.querySelector("#liLetters").content;
  //clone it
  const copy = template2.cloneNode(true);
  //change content
  copy.querySelector("a").href = `#letter_${letter}`;
  copy.querySelector("a").textContent = letter.toUpperCase();

  //grab parent
  const parent = document.querySelector(".letterLinks ul");
  //append
  parent.appendChild(copy);
}
//------------------------------------------------------------------

//----------------------- heder filter height--------------
const heightFixer = document.querySelector(".headerFilters").offsetHeight + "px";
console.log(heightFixer);
const r = document.querySelector(":root");
r.style.setProperty("--heightHeaderFilter", `${heightFixer}`);

//------------------------------------------------------------

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

function takeActor(actor) {
  //separating name and last name
  let actorName = actor.fullname.split(" ")[0];
  let factorName = actor.fullname.split(" ").length;
  let actorLastName = actor.fullname.split(" ")[factorName - 1];
  console.log(actorName);
  console.log(actorLastName);

  //grab the template
  const template2 = document.querySelector("#liActor").content;
  //clone it
  const copy = template2.cloneNode(true);
  //change content
  copy.querySelector("li a span.name").textContent = actor.fullname;
  // copy.querySelector("li a span.lastName").textContent = actorLastName;
  copy.querySelector("li a").addEventListener("click", showActorPop);
  copy.querySelector(".actorMovie").value = actor.movie;
  //grab parent
  let sortBy = actorName.charAt(0);

  if (lastName) {
    sortBy = actorLastName.charAt(0);
  }

  let firstLeter = sortBy;
  let actorLower;
  let parentActor;
  if (isNaN(firstLeter)) {
    actorLower = sortBy.toLowerCase();

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

let idRemove;

function removeOl() {
  console.log("removeOL()");
  document.querySelectorAll("section ol").forEach(removeP);
  function removeP(item) {
    if (item.childElementCount < 1) {
      idRemove = item.parentElement.id;

      item.parentElement.remove();
      document.querySelectorAll(".letterLinks a").forEach((element) => {
        if (element.href[element.href.length - 1] == idRemove[idRemove.length - 1]) {
          element.parentElement.remove();
        }
      });
    }
  }
}

function modalRemove() {
  document.querySelector(".modal").remove();
}
