var walkers = new Array();
var targetPos;
var eraseContent = false;
var drawColor = true;

function setup() 
{
  //cnv = createCanvas(windowHeight / 4 * 3, windowHeight / 4 * 3);
  cnv = createCanvas(windowWidth, windowHeight);

  //var x = windowWidth/2;
  //var y = windowHeight/2;
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;

  cnv.parent("canvasDiv");

  //cnv.position(x, y);
  frameRate(120);
  targetPos = createVector(width/2, height/2);
  createWalker(50, 10, 5);
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

function lockParameter(parameter)
{
  var obj = $("#" + parameter);
  if(obj.attr("disabled") === "disabled")
    obj.removeAttr("disabled");
  else
    obj.attr("disabled", "disabled");
}

function newWalker()
{
  createWalker(parseInt($("#distance").val()), parseInt($("#speed").val()), parseInt($("#objectSize").val()));
}

function newRandomWalker()
{
  var distance;
  var speed;
  var objectSize;
  if($("#distance").attr("disabled") == "disabled")
    distance = parseInt($("#distance").val());
  else
    distance = round(random(-(height/2), height/2));

  if($("#speed").attr("disabled") == "disabled")
    speed = parseInt($("#speed").val());
  else
    speed = round(random(-30, 30));

  if($("#objectSize").attr("disabled") == "disabled")
    objectSize = parseInt($("#objectSize").val());
  else
    objectSize = round(random(3, 15));

  $("#distance").val(distance);
  $("#speed").val(speed);
  $("#objectSize").val(objectSize);

  createWalker(distance, speed, objectSize);
}

function createWalker(distance, speed, objectSize)
{
  if(isNaN(distance) || isNaN(speed))
    return;
  if(walkers.length >= 128)
    return;
  var walker = new Walker();
  walker.init(distance, speed, objectSize);
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
    item = "<li style='color: rgb(" + color  + ")' onclick='deleteWalker(" + i + ")' id='walker" + i + "' >Object " + (i+1) + ": " + walkers[i].distance + "|" + walkers[i].speed + "|" + walkers[i].objectSize + "</li>";
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
  
  this.init = function(distance, speed, objectSize)
  {
    this.distance = distance; //just for read, isn't used for calculation
    this.speed = speed;       //just for read, isn't used for calculation
    this.objectSize = objectSize;
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
    ellipse(this.pos.x, this.pos.y, this.objectSize, this.objectSize);
  }
}