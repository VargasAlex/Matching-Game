let cardsArray = [
  { 'name': 'CSS', 'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true', },
  { 'name': 'HTML', 'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true', },
  { 'name': 'jQuery', 'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true', },
  { 'name': 'JS', 'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true', },
  { 'name': 'Node', 'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true', },
  { 'name': 'Photo Shop', 'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true', },
  { 'name': 'PHP', 'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true', },
  { 'name': 'Python', 'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true', },
  { 'name': 'Ruby', 'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true', },
  { 'name': 'Sass', 'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true', },
  { 'name': 'Sublime', 'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true', },
  { 'name': 'Wordpress', 'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true', },
];

// Duplicate the array to create matches
let gameGrid = cardsArray.concat(cardsArray);

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
        setTimeout(match, 1200)
        setTimeout(resetGuesses, 1200);
      } else {
        setTimeout(resetGuesses, 1200);
      }
    }
    previousTarget = clicked
  }
})
