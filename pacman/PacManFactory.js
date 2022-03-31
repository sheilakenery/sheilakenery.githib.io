//This array holds pacman images
const pacArray = [
  ['./images/pacman1.png', './images/pacman2.png'],
  ['./images/pacman3.png', './images/pacman4.png'],
];


//This array holds randomly generated pacmen as objects {position: {x: , y: } , velocity: {x: , y: } , direction, focus, newimg}
const pacMen = [];


//This callback function randomly generates numbers for the initial velocity and position of pacmen
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}


// Callback factory function to make a pacmen returns an object
function makePac() {
  let velocity = setToRandom(10);
  let position = setToRandom(200);
  //Direction and Focus used to adjust movement
  let direction = 0;
  let focus = 0;
  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = pacArray[direction][focus];
  newimg.width = 100;
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  game.appendChild(newimg);

  return {
    position,
    velocity,
    direction,
    focus,
    newimg
  };
}


//Function to make pacmen onclick of Add PacMan button, adds new pacman to pacMan array
function makeOne() {
  pacMen.push(makePac());
}


//Callback function for edge detection and direction adjustment
function checkCollisions(item) {  
  if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth) {
    item.velocity.x = -item.velocity.x;
    item.direction = 1;
  }
  if (item.position.x + item.velocity.x < 0) {
    item.velocity.x = -item.velocity.x;
    item.direction = 0;
  }
  if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || item.position.y + item.velocity.y < 0) {
    item.velocity.y = -item.velocity.y;
  }
  
  
  return item;
}


//Function to make pacmen move onclick of Start Game button
function update() {
  //Loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;
    
    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;

    //This line makes the mouths open and close
    item.focus = (item.focus + 1) % 2;

    item.newimg.src =  pacArray[item.direction][item.focus];
  });
  setTimeout(update, 80);
}





//Don't change this line, exports functions to HTML
if (typeof module !== 'undefined') {
  module.exports = { makeOne, checkCollisions, update, pacMen };
}
