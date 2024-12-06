import DINOS from "./dino.js";

const dinosData = DINOS.Dinos;

// Dino Constructor
function Dinossauro(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
  this.imagem = function () {
    return "images/" + this.species.toLowerCase() + ".png";
  };
}

// Create Dino Objects
const dinos = dinosData.map((dino) => {
  let newDinoObj = new Dinossauro(
    dino.species,
    dino.weight,
    dino.height,
    dino.diet,
    dino.where,
    dino.when,
    dino.fact
  );
  return newDinoObj;
});

// Human constructor
function Human(userName, userHeight, userWeight, userDiet) {
  this.userName = userName;
  this.userHeight = userHeight;
  this.userWeight = userWeight;
  this.userDiet = userDiet;
}

// Get human data from form
const getHumanData = () => {
  const userName = document.querySelector("#name").value;
  const userHeight = document.querySelector("#height").value;
  const userWeight = document.querySelector("#weight").value;
  const userDiet = document.querySelector("#diet").value;
  const userHumam = new Human(userName, userHeight, userWeight, userDiet);
  return userHumam;
};

// Create Dino Compare Methods
const compareWeigth = (dino, human) => {
  const comparison = dino.weight / human.userWeight;
  return `The ${dino.species} was ${comparison.toFixed(1)} heavier than you.`;
};

const compareHeight = (dino, human) => {
  const comparison = dino.height / human.userHeight;
  return `The ${dino.species} was ${comparison.toFixed(1)} taller than you.`;
};

const compareDiet = (dino, human) => {
  if (dino.diet == human.userDiet) {
    return `The ${dino.species} was ${dino.diet} like you.`;
  } else {
    return `The ${dino.species} was ${dino.diet} different than you ${human.userDiet}.`;
  }
};

const showDinoFact = (dino) => {
  return dino.fact;
};

const showDinoPeriod = (dino) => {
  return `The ${dino.species} lived in the ${dino.when} period.`;
};

const showDinoPlace = (dino) => {
  return `The ${dino.species} lived in ${dino.where}.`;
};

const randomNumber = () => {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const chooseFact = (dino, human) => {
  const resultRandomNumber = randomNumber();

  switch (resultRandomNumber) {
    case 1:
      return compareWeigth(dino, human);
      break;
    case 2:
      return compareHeight(dino, human);
      break;
    case 3:
      return compareDiet(dino, human);
      break;
    case 4:
      return showDinoFact(dino);
      break;
    case 5:
      return showDinoPeriod(dino);
      break;
    case 6:
      return showDinoPlace(dino);
      break;
  }
};

//Generate dinos tiles
const dinoTileGeneration = (dino, human, divToAppend) => {
  const newTile = document.createElement("div");
  newTile.setAttribute("class", "grid-item");

  const dinoSpecies = document.createElement("h3");
  dinoSpecies.textContent = `${dino.species}`;
  newTile.appendChild(dinoSpecies);

  const dinoImage = document.createElement("img");
  dinoImage.setAttribute("src", `${dino.imagem()}`);
  newTile.appendChild(dinoImage);

  const dinoFact = document.createElement("p");
  dinoFact.textContent = chooseFact(dino, human);
  newTile.appendChild(dinoFact);

  divToAppend.appendChild(newTile);
};

//Generate human tiles
const humanTileGeneration = (human, divToAppend) => {
  const newTile = document.createElement("div");
  newTile.setAttribute("class", "grid-item");

  const humanName = document.createElement("h3");
  humanName.textContent = `${human.userName}`;
  newTile.appendChild(humanName);

  const humanImage = document.createElement("img");
  humanImage.setAttribute("src", `./images/human.png`);
  newTile.appendChild(humanImage);

  divToAppend.appendChild(newTile);
};

//Generate pigeon tiles
const pigeonTileGeneration = (dino, divToAppend) => {
  const newTile = document.createElement("div");
  newTile.setAttribute("class", "grid-item");

  const dinoSpecies = document.createElement("h3");
  dinoSpecies.textContent = `${dino.species}`;
  newTile.appendChild(dinoSpecies);

  const dinoImage = document.createElement("img");
  dinoImage.setAttribute("src", `${dino.imagem()}`);
  newTile.appendChild(dinoImage);

  const dinoFact = document.createElement("p");
  dinoFact.textContent = `${dino.fact}`;
  newTile.appendChild(dinoFact);

  divToAppend.appendChild(newTile);
};

// Add tiles to DOM
const addTiles = (dinos, human) => {
  dinos.splice(4, 0, human); // include human in dinos array

  const main = document.querySelector("#grid");

  for (let i = 0; i < dinos.length; i++) {
    if (i === 4) {
      humanTileGeneration(dinos[i], main);
    } else if (i === 8) {
      pigeonTileGeneration(dinos[i], main);
    } else {
      dinoTileGeneration(dinos[i], human, main);
    }
  }
};

// Remove form from screen
const hideForm = () => {
  const form = document.querySelector("#dino-compare");
  form.style.display = "none";
};

// On button click, prepare and display infographic
const formButton = document.querySelector("#btn");
formButton.addEventListener("click", () => {
  const human = getHumanData();
  hideForm();
  addTiles(dinos, human);
});
