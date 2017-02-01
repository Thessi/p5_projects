var walkers = new Array();
var targetPos;

function setup() 
{
  createCanvas(300, 300);
  targetPos = createVector(width/2, height/2);
  createWalker(40, 10);
}

function deleteAll()
{
  walkers = [];
  updateObjectCounter();
}

function newWalker()
{
  createWalker(parseInt(document.getElementById("distance").value), parseInt(document.getElementById("speed").value));
}

function hundredWalkers()
{
  createHundredWalkers(0);
}

function createHundredWalkers(i)
{
  newWalker();
  if(i < 100)
  {
    setTimeout(createHundredWalkers, 100, i + 1);
  }
}

function createWalker(distance, speed)
{
  var walker = new Walker();
  walker.init(distance, speed);
  walkers.push(walker);
  updateObjectCounter();
}

function updateObjectCounter()
{
  document.getElementById("objects").innerText = walkers.length;
}

function draw() 
{
  background(0);
  fill(255);
  ellipse(targetPos.x, targetPos.y, 10, 10);
  for(i = 0; i < walkers.length; i++)
  {
    walkers[i].update();
    walkers[i].display();
  }
}

function Walker()
{
  this.pos = createVector(targetPos.x - 10, targetPos.y);
  this.vel = createVector(0, 10);
  this.acc = createVector(0, 0);
  
  this.init = function(distance, speed)
  {
    this.vel = createVector(0, speed);
    this.pos = createVector(targetPos.x - distance, targetPos.y);
  }
  
  this.update = function()
  {
    var v = p5.Vector.sub(targetPos, this.pos);
    this.acc = v.normalize();
    this.vel.add(this.acc);
    this.pos.add(p5.Vector.div(this.vel, 3));
  }
  
  this.display = function()
  {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 5, 5);
  }
}