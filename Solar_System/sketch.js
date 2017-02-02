var walkers = new Array();
var targetPos;
var eraseContent = false;
var drawColor = true;

function setup() 
{
  cnv = createCanvas(windowHeight / 3 * 2, windowHeight / 3 * 2);
  var x = (20) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  frameRate(120);
  targetPos = createVector(width/2, height/2);
  createWalker(40, 10);
}

function deleteAll()
{
  walkers = [];
  updateObjectCounter();
  refreshList();
  background(0);
}

function toggleDraw()
{
  eraseContent = !eraseContent;
}

function toggleColor()
{
  drawColor = !drawColor;
  refreshList();
}

function newWalker()
{
  createWalker(parseInt(document.getElementById("distance").value), parseInt(document.getElementById("speed").value));
}

function newRandomWalker()
{
  createWalker(round(random(-(width/2 - 10), width/2 - 10)), round(random(-30, 30)));
}

function createWalker(distance, speed)
{
  if(isNaN(distance) || isNaN(speed))
    return;
  if(walkers.length >= 128)
    return;
  var walker = new Walker();
  walker.init(distance, speed);
  walkers.push(walker);
  updateObjectCounter();

  refreshList();

}

function refreshList()
{
  $("#walkerList").remove();
  $("#walkerListDiv").append("<ul id='walkerList'></ul>");
  for(i = 0; i < walkers.length; i++)
  {
    if(drawColor)
      color =  walkers[i].color[0] + ", " + walkers[i].color[1] + ", " + walkers[i].color[2];
    else
      color = "0, 0, 0,";
    item = "<li style='color: rgb(" + color  + ")' onclick='deleteWalker(" + i + ")' id='walker" + i + "' >Object " + i + ": " + walkers[i].distance + "|" + walkers[i].speed + "</li>";
    $("#walkerList").append(item);
  }
}

function deleteWalker(id)
{
  walkers.splice([id], 1);
  refreshList();
  updateObjectCounter();
}

function updateObjectCounter()
{
  document.getElementById("objects").innerText = walkers.length;
}

function draw() 
{
  if(!eraseContent)
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
  this.color = new Array();
  this.pos = createVector(targetPos.x - 10, targetPos.y);
  this.vel = createVector(0, 10);
  this.acc = createVector(0, 0);
  
  this.init = function(distance, speed)
  {
    this.distance = distance; //just for read, isn't used for calculation
    this.speed = speed;       //just for read, isn't used for calculation
    this.vel = createVector(0, speed);
    this.pos = createVector(targetPos.x - distance, targetPos.y);
    this.color[0] = round(random(0, 256));
    this.color[1] = round(random(0, 256));
    this.color[2] = round(random(0, 256));
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
    if(drawColor)
      fill(this.color[0], this.color[1], this.color[2]);
    else
      fill(255);
    ellipse(this.pos.x, this.pos.y, 5, 5);
  }
}