function Bear() {
  this.dBear = 100;
  this.htmlElement = document.getElementById("bear");
  this.id = this.htmlElement.id;
  this.x = this.htmlElement.offsetLeft;
  this.y = this.htmlElement.offsetTop;

  this.setSpeed = function () {
    this.dBear = document.getElementById("speedBears").value;
  };

  this.move = function (xDir, yDir) {
    this.x += this.dBear * xDir;
    this.y += this.dBear * yDir;
    this.fitBounds(); //we add this instruction to keep bear within board
    this.display();
  };

  this.display = function () {
    this.htmlElement.style.left = this.x + "px";
    this.htmlElement.style.top = this.y + "px";
    this.htmlElement.style.display = "absolute";
  };

  this.fitBounds = function () {
    let parent = this.htmlElement.parentElement;
    let iw = this.htmlElement.offsetWidth;
    let ih = this.htmlElement.offsetHeight;
    let l = parent.offsetLeft;
    let t = parent.offsetTop;
    let w = parent.offsetWidth;
    let h = parent.offsetHeight;
    if (this.x < 0) this.x = 0;
    if (this.x > w - iw) this.x = w - iw;
    if (this.y < 0) this.y = 0;
    if (this.y > h - ih) this.y = h - ih;
  };
}

// Handle keyboad events
// to move the bear
function moveBear(e) {
  //codes of the four keys
  const KEYUP = 38;
  const KEYDOWN = 40;
  const KEYLEFT = 37;
  const KEYRIGHT = 39;
  if (e.keyCode == KEYRIGHT) {
    bear.move(1, 0);
  } // right key
  if (e.keyCode == KEYLEFT) {
    bear.move(-1, 0);
  } // left key
  if (e.keyCode == KEYUP) {
    bear.move(0, -1);
  } // up key
  if (e.keyCode == KEYDOWN) {
    bear.move(0, 1);
  } // down key
}

class Bee {
  constructor(beeNumber) {
  //the HTML element corresponding to the IMG of the bee
  this.htmlElement = createBeeImg(beeNumber);
  //iits HTML ID
  this.id = this.htmlElement.id;
  //the left position (x)
  this.x = this.htmlElement.offsetLeft;
  //the top position (y)
  this.y = this.htmlElement.offsetTop;

  this.move = function(dx, dy) {
  //move the bees by dx, dy
  this.x += dx;
  this.y += dy;
  this.display();
  };

  this.display = function() {
  //adjust position of bee and display it
  this.fitBounds();//add this to adjust to bounds
  this.htmlElement.style.left = this.x + "px";
  this.htmlElement.style.top = this.y + "px";
  this.htmlElement.style.display = "block";
  };

  this.undisplay = function() {
    this.htmlElement.style.display = "none";
  }

  this.fitBounds = function() {
  //check and make sure the bees stays in the board space
  let parent = this.htmlElement.parentElement;
  let iw = this.htmlElement.offsetWidth;
  let ih = this.htmlElement.offsetHeight;
  let l = parent.offsetLeft;
  let t = parent.offsetTop;
  let w = parent.offsetWidth;
  let h = parent.offsetHeight;
  if (this.x < 0)
  this.x = 0;
  if (this.x > w - iw)
  this.x = w - iw;
  if (this.y < 0)
  this.y = 0;
  if (this.y > h - ih)
  this.y = h - ih;
  };
  }

 }
 
 function createBeeImg(wNum) {
  //get dimension and position of board div
  let boardDiv = document.getElementById("board");
  let boardDivW = boardDiv.offsetWidth;
  let boardDivH = boardDiv.offsetHeight;
  let boardDivX = boardDiv.offsetLeft;
  let boardDivY = boardDiv.offsetTop;
  //create the IMG element
  let img = document.createElement("img");
  img.setAttribute("src", "images/bee.gif");
  img.setAttribute("width", "100");
  img.setAttribute("alt", "A bee!");
  img.setAttribute("id", "bee" + wNum);
  img.setAttribute("class", "bee"); //set class of html tag img
  //add the IMG element to the DOM as a child of the board div
  img.style.position = "absolute";
  boardDiv.appendChild(img);
  //set initial position
  let x = getRandomInt(boardDivW);
  let y = getRandomInt(boardDivH);
  img.style.left = (boardDivX + x) + "px";
  img.style.top = (y) + "px";
  //return the img object
  return img;
 }

 function makeBees() {
  //get number of bees specified by the user
  let nbBees = document.getElementById("nbBees").value;
  nbBees = Number(nbBees); //try converting the content of the input to a number
  if (isNaN(nbBees)) { //check that the input field contains a valid number
  window.alert("Invalid number of bees");
  return;
  }
  
  if (bees.length >= 1) {
    deleteBees();
  }
  
  //create bees
  let i = 1;
  while (i <= nbBees) {
  var num = i;
  var bee = new Bee(num); //create object and its IMG element
  bee.display(); //display the bee
  bees.push(bee); //add the bee object to the bees array
  i++;
  }
 }

 function deleteBees() {
  for (let i = 0; i < bees.length; i++) {
    bees[i].undisplay();
    bees[i] = null;
  }
  bees = []
 }

 function moveBees() {
  //get speed input field value
  let speed = document.getElementById("speedBees").value;
  //move each bee to a random location
  for (let i = 0; i < bees.length; i++) {
    let dx = getRandomInt(2 * speed) - speed;
    let dy = getRandomInt(2 * speed) - speed;
    bees[i].move(dx, dy);
    isHit(bees[i], bear);
  }
 }

 function updateBees() { // update loop for game
  //move the bees randomly
  moveBees();
  //use a dynamic update period
  let period = document.getElementById("periodTimer").value;
  
  // checks if stings is 1000 or over if so alert game over, cleartimeout and kill the program
  if (Number(hits.innerHTML) >= 1000) {
    alert("Game Over");
    clearTimeout();
    die();
  }
  
  //update the timer for the next move
  updateTimer = setTimeout('updateBees()', period);
 }
 
 function addBees() {
 // lastID is the last id value of the last element in bees array
  var lastID = bees[bees.length - 1].id.replace(/\D/g, '');

  // put in last ID into new bee object
  var bee = new Bee(Number(lastID) + 1); //create object and its IMG element
  bee.display(); //display the bee
  bees.push(bee); //add the bee object to the bees array
 }

 function getRandomInt(max) {
   // Math.floor returns largest integer less than or equal to a given number
   // Math.random returns a pseudo-random number with range 0 to 1 therefore we * by max to get num > 1 given that max is not 1
   return Math.floor(Math.random() * max)
 }

 function isHit(defender, offender) {
  if (overlap(defender, offender)) { //check if the two image overlap
  let score = hits.innerHTML;
  score = Number(score) + 1; //increment the score
  // Just making sure not displaying score over 1000
  if (score <= 1000) {
    hits.innerHTML = score; //display the new score
  }

  }
  if (typeof(lastStingTime) !== 'undefined') {
    //console.log("h");
    let newStingTime = new Date();
    let thisDuration = newStingTime - lastStingTime;
    //console.log(thisDuration)
    lastStingTime = newStingTime;
    
    let longestDuration = Number(duration.innerHTML)*1000;
    if (longestDuration === 0) {
    longestDuration = thisDuration;
    } else {
    longestDuration += thisDuration;
    }
    //console.log(longestDuration);
    document.getElementById("duration").innerHTML = (longestDuration/1000).toFixed(3);
  } 
 }

 function overlap(element1, element2) {
  //consider the two rectangles wrapping the two elements
  //rectangle of the first element
  left1 = element1.htmlElement.offsetLeft;
  top1 = element1.htmlElement.offsetTop;
  right1 = element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth;
  bottom1 = element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight;
  //rectangle of the second element
  left2 = element2.htmlElement.offsetLeft; //e2x
  top2 = element2.htmlElement.offsetTop; //e2y
  right2 = element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth;
  bottom2 = element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight;
  //calculate the intersection of the two rectangles
  x_intersect = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
  y_intersect = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2));
  intersectArea = x_intersect * y_intersect;
  //if intersection is nil no hit
  if (intersectArea == 0 || isNaN(intersectArea)) {
  return false;
  }
  return true;
 }
 

function start() {

  //create bear
  bear = new Bear();


  bees = new Array();
  makeBees();
  updateBees(); 
  
  

  //console.log(typeof(bees));
  
  
  

  document.addEventListener("keydown", moveBear, false);

  document.getElementById("speedBears").addEventListener("change", function() {
    bear.setSpeed()
  }, false);

  document.addEventListener("keydown", function() {
    lastStingTime = new Date();
  }, false);

  document.getElementById("bees1").addEventListener("click", function() {
    addBees()
  }, false);

  document.getElementById("nbBees").addEventListener("change", function() {
    makeBees()
  }, false);

  document.getElementById("speedBees").addEventListener("change", function() {
    moveBees()
  }, false);

  document.getElementById("periodTimer").addEventListener("change", function() {
    updateBees()
  }, false);
  
  document.getElementById("restart").addEventListener("click", function() {
    document.location.href = "";
  }, false);
}

//document.getElementById("periodTimer").value