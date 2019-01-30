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

let gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(function() {
  return 0.5 - Math.random();
})

let game = document.querySelector('#game-board');
let grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

for (i = 0; i < gameGrid.length; i++) {
  let card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = gameGrid[i].name;
  card.style.backgroundImage = `url(${gameGrid[i].img})`;
  grid.appendChild(card);
}

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;

let match = function() {
  let selected = document.querySelectorAll('.selected');
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.add('match');
  }
}

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

grid.addEventListener('click', function (event) {
  let clicked = event.target;
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.dataset.name;
      clicked.classList.add('selected');
    } else {
      secondGuess = clicked.dataset.name;
      clicked.classList.add('selected');
    }
    if (firstGuess !== '' && secondGuess !== '') {
      if (firstGuess === secondGuess) {
        match()
        resetGuesses();
      } else {
        resetGuesses()
      }
    }
    previousTarget = clicked
  }
})
