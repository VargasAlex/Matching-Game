let animals = [
  { 'name': 'Cow', 'img': './images/Cow.png', },
  { 'name': 'Giraffe', 'img': './images/Giraffe.png', },
  { 'name': 'Elephant', 'img': './images/Elephant.png', },
  { 'name': 'Tiger', 'img': './images/Tiger.png', },
  { 'name': 'Owl', 'img': './images/Owl.png', },
  { 'name': 'Seal', 'img': './images/Seal.png', },
  { 'name': 'Monkey', 'img': './images/Monkey.png', },
  { 'name': 'Kangaroo', 'img': './images/Kangaroo.png', },
  { 'name': 'Whale', 'img': './images/Whale.png', },
  { 'name': 'Dinosaur', 'img': './images/Dinosaur.png', },
  { 'name': 'Goat', 'img': './images/Goat.png', },
  { 'name': 'Penguin', 'img': './images/Penguin.png', },
];

// Duplicate the array to create matches
let gameGrid = animals.concat(animals);

// Randomize the cards
gameGrid.sort(function() {
  return 0.5 - Math.random();
})

let game = document.querySelector('#game-board');

// Create a section element - assign it the class 'grid' and append it to the game board
let grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

// Loop the cardsArray - create a new div and assign it the class 'card' - assign the index of each name in the array to a dataset of name
for (i = 0; i < gameGrid.length; i++) {
  let card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = gameGrid[i].name;

//create a new div and assign it to the variable front and give it a class of 'front'
  let front = document.createElement('div');
  front.classList.add('front');

// create a new div and assign it to the variable back and give it a class of 'back'
  let back = document.createElement('div');
  back.classList.add('back');
  // add a background image and assign it to the url of each images index
  back.style.backgroundImage = `url(${gameGrid[i].img})`;

// append the card to the grid
  grid.appendChild(card);
// append the front element to the card
  card.appendChild(front);
//append the back element to the card
  card.appendChild(back);
}

// create firstGuess and secondGuess variable and assign it the intial value of a empty string
let firstGuess = '';
let secondGuess = '';
// create a count variable and set it to 0 (check the eventListener)
let count = 0;
// create a previousTarget and set it to null
let previousTarget = null;

// create a match function which selects all ids with the id of 'selected' that loops through the selected ids and checks for a match
let match = function() {
  let selected = document.querySelectorAll('.selected');
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.add('match');
  }
}

// create a reset function after two cards are clicked
let resetGuesses = function() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  let selected = document.querySelectorAll('.selected');

  for (i = 0; i < selected.length; i++) {
    selected[i].classList.remove('selected');
  }
}

/*create an on click event listener with a couple of conditionals
  - if the count of the clicked cards is less than 2 increment the count until the conditional is false
  - if the count is one, the card is assigned to the first guess
  - else the second card clicked is assigned to the second guess
  - if the first guess and second match are the same check for a match and then reset guesses
  - otherwise reset guesses
*/
grid.addEventListener('click', function (event) {
  let clicked = event.target;
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }
    if (firstGuess !== '' && secondGuess !== '') {
      if (firstGuess === secondGuess) {
        setTimeout(match,
          document.querySelector('.card-match').style.display = "block", 800);
        setTimeout(function () {
          document.querySelector('.card-match').style.display = "none"
        }, 1200)
        setTimeout(resetGuesses, 1200);
      } else {
        setTimeout(resetGuesses, 1200);
      }
    }
    previousTarget = clicked
  }
})

// create a timer function to indicate remaining time and display a game over background when time runs out.
let time = 80;
let timer = document.querySelector('.timer');
let timerId = setInterval(countdown, 1000);
let music = document.querySelector('.music');
let end = document.querySelector('.end');

function countdown() {
  if(time === 10) {
    timer.style.fontSize = "30px";
    timer.style.color = "yellow";
  }
  if (time === 0) {
    clearTimeout(timerId);
    document.querySelector('.restart').style.display = "block";
    music.pause();
    end.play();
  } else {
    timer.innerHTML = `${time} seconds remaining`;
    time--;
  }
}

// create a restart button to play again.
let button = document.querySelector('.cta');

button.addEventListener('click', function(event) {
  window.location.reload(event)
})
