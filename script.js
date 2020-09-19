const gameContainer = document.getElementById("game");
let lastClicked = "";
let count = 0;
let clickable = true;
const button = document.querySelector('#resetter');
let win = false;

if (localStorage.getItem('record') == null) {
  document.querySelector('#record').innerText = "Play one game to save your record!"
} else {
  document.querySelector('#record').innerText = localStorage.getItem('record');
}

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(card) {
  if (clickable) {
    console.log("you just clicked", card.target.className);
    if (lastClicked === "") {
      card.target.style.backgroundColor = card.target.className;
      lastClicked = card.target.className;
      card.target.setAttribute("id", 'tempFlip');
      count++;
      document.querySelector('#count').innerText = count;
      clickable = true;
    } else if (card.target.getAttribute('id') !== 'tempFlip'){
      card.target.style.backgroundColor = card.target.className;
      const firstCard = document.querySelector('#tempFlip');
      firstCard.removeAttribute('id');
      if (lastClicked === card.target.className) {
        firstCard.classList.toggle('flipped');
        card.target.classList.toggle('flipped');
        if ((document.querySelectorAll('.flipped').length) === 10) {
          onWin();
          if (localStorage.getItem('record') === null) {
            localStorage.setItem('record', count + 1);
          } else if (count + 1 < localStorage.getItem('record')) {
            localStorage.setItem('record', count + 1);
          }
        }
      } else {
        clickable = false;
        setTimeout(function() {
          firstCard.removeAttribute('style');
          card.target.removeAttribute('style');
          clickable = true;
        }, 1000);
      }
      lastClicked = "";
      count++;
      document.querySelector('#count').innerText = count;
    }
  }
}

button.addEventListener('click', function(){
  location.reload();
})

function onWin() {
  let winner = document.querySelector('#win');
  winner.innerText = `Nice Job! You finished in ${count + 1} clicks!`
}

// when the DOM loads
createDivsForColors(shuffledColors);