var bullets =[]//массив пуль
var enemies =[]//массив врагов
var popadanie = 0
var dopopadaniya = 0
//var img = [[new Image()],[new Image()]]
const K = {//перемещенние через клавиатуру
	fn(ev) {
	  const k = ev.which;
	  if (k >= 65 && k <= 87) {
		ev.preventDefault();
		K[k] = ev.type === "keydown"; 
	  }
	}
  }
  const update = () => {
	let dist = K[87] && (K[65] || K[68]) || K[83] && (K[65] || K[68]) ? 0.707 : 1;
	dist *= hero.speed;
	if (K[65]) hero.x -= dist;
	if (K[87]) hero.y -= dist;
	if (K[68]) hero.x += dist;
	if (K[83]) hero.y += dist;
  }
  document.addEventListener('keydown', K.fn);
  document.addEventListener('keyup', K.fn);//конец перемещенния

function isCollided(dx,dy,x,y)
{
	  var d = Math.sqrt((dx - x)*(dx - x) + (dy - y)*(dy - y))
	  return d<=50
}

var mouseX,mouseY
var canvas = document.getElementById("myCanvas")
bounds = canvas.getBoundingClientRect()
var bounds
var ctx = canvas.getContext("2d")
canvas.width = canvas.offsetWidth
canvas.height =canvas.offsetHeight 

hero = {
   x : canvas.width-140,
   y : 0,
   speed : 10,
   angle : 0,
   lives : 1,
   ammunition: 40
}

class enemie{
	constructor(x,y,w,h,a,src,ax,ay){
		this.x = x
		this.y= y
		this.src = src
		this.angle = a
		this.w = w
		this.h = h
		this.ax = ax
		this.ay = ay
		this.timer = setInterval(() => {
			this.fire()
		}, 2000);
		//clearInterval(timer1id);
	}	
    tick(){
        if (this.x>this.ax) 
			if (this.x-this.ax>=4)
			this.x = this.x - 4;
		else 
		this.x = this.x-(this.x-this.ax);
			
		else if (this.x<this.ax)
	         if (this.ax-this.x>=4)
			 this.x = this.x + 4;
		else 
		this.x = this.x+(this.ax-this.x);
		 
		if (this.y>this.ay) 
			if (this.y-this.ay>=4) 
			this.y = this.y -4;
		else 
		this.y = this.y -(this.y-this.ay);
		
		else if (this.y<this.ay)
              if (this.ay-this.y>=4) 
			  this.y = this.y + 4;
	    else 
		this.y = this.y + (this.ay-this.y);
			 
		if (this.x==this.ax && this.y==this.ay) {
			this.ax = getRandomInt(canvas.width);
			this.ay = getRandomInt(canvas.height);
		}
		this.angle =Math.atan2((hero.x+50) - (this.x+this.w/2),-(((hero.y+70)-(this.y + this.h/2))))*(180/Math.PI)
	}
	fire(){
        var x = (hero.x+50) - (this.x+50)
	    var y = (hero.y+70) - (this.y+70)
	    var l = Math.sqrt(x * x + y * y)//длина вектора 
	    x = x / l
	    y = y / l
		bullets.push(new bullet(this.x + 50, this.y +70, x * 10.0, y * 10.0, 5.0, 0))
	}
}

class bullet {
	constructor(x,y,dx,dy,radius,whose){
		this.x =x
		this.y = y
		this.dx = dx
		this.dy = dy
		this.radius = radius
		this.whose = whose
	}
	tick(){
        this.x += this.dx;
		this.y += this.dy;
		
		if (this.x + this.radius < 0.0
		||	this.x - this.radius > canvas.width
		||	this.y + this.radius < 0.0
		|| 	this.y - this.radius > canvas.height)
		{
			this.dx = 0.0;
			this.dy = 0.0;
		}
		if (this.whose){
			for (var i=0; i<enemies.length; i++){
		if (isCollided(enemies[i].x+50,enemies[i].y+70,this.x, this.y)){
			console.log("ти попал")
			popadanie++;
			this.dx = 0.0;
			this.dy = 0.0;
		}
			document.getElementById("rr").innerHTML="ви попали " + popadanie+ "<br>В вас попали "+dopopadaniya
		}
	}
		else{
			if (isCollided(hero.x+50,hero.y+70,this.x, this.y)){
			console.log("в тебя попали")
			dopopadaniya++
			this.dx = 0.0;
			this.dy = 0.0;
			document.getElementById("rr").innerHTML="ви попали " + popadanie+ "<br>В вас попали "+dopopadaniya
		}
	}
	}
    render(){
		ctx.fillStyle = "red";
		ctx.strokeStyle = "white";
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0.0,2.0*Math.PI,false);
		ctx.fill();
		ctx.stroke();
	}
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
  }		
 
function spawn(){
	var x,y

	switch (getRandomInt(4)){
		case 0://появление слева
            y = getRandomInt(canvas.height)
			x =0
		break;

		case 1://появленние сверху
			x = getRandomInt(canvas.width) 
			y = 0
		break;
		case 2://появление справа
			y = getRandomInt(canvas.height)
			x = canvas.width 
		break;
		case 3://появление снизу
			x = getRandomInt(canvas.width)
			y = canvas.height 
		break;
	}

	return {
		x : x,
		y : y
	}
}

function draw(x,y,w,h,a,sr){//анимация смерти
	var img = new Image();
	img.src = sr;
var dx = x + w/2
	var dy = y + h/2
	a=a*(Math.PI/180)
	if (a){
		ctx.save()
		ctx.translate(dx,dy)
		ctx.rotate(a)
	    ctx.translate(-dx,-dy)
	}
    ctx.beginPath();

    ctx.drawImage(img, x, y, 100, 140);
	
    ctx.closePath();
	if (a){
		ctx.restore()
	}
}

window.onmousedown = function(e) {
	var x = mouseX - (hero.x+50)
	var y = mouseY - (hero.y+70)
	var l = Math.sqrt(x * x + y * y)
	x = x / l
	y = y / l
	bullets.push(new bullet(hero.x + 50, hero.y +70, x * 10.0, y * 10.0, 5.0, 1))
}

window.onmousemove = function(e) {
mouseX = e.clientX - bounds.left;
mouseY = e.clientY - bounds.top;
document.getElementById("r").innerHTML =""+ Math.atan2(mouseX - (hero.x+100/2),-(mouseY- (hero.y-140/2)))*(180/Math.PI)
}

function vooor(){
var kordinaty = spawn()
enemies.push(new enemie(kordinaty.x,kordinaty.y,100,140,0,"img/vragi.png",getRandomInt(canvas.width),getRandomInt(canvas.height)))
enemies[enemies.length-1].fire()
}
var time
time = setInterval(vooor,5000);
function GameStart(){
	
ctx.clearRect(0, 0, canvas.width, canvas.height)
hero.angle = Math.atan2(mouseX - (hero.x+100/2),-(mouseY- (hero.y+140/2)))*(180/Math.PI)
draw(hero.x,hero.y,100,140,hero.angle,"img/igrok.png")

for (var i=0; i<enemies.length; i++){
	enemies[i].tick()
	draw(enemies[i].x,enemies[i].y,enemies[i].w,enemies[i].h,enemies[i].angle,enemies[i].src)
}
for (var i =0; i<bullets.length ;i++){
if (bullets[i].dx == 0 && bullets[i].dy ==0){
	bullets.splice(i,1)
	i--;
}
else{
	bullets[i].tick()
    bullets[i].render()
}
}
update()
FPSCount()
requestAnimationFrame(GameStart)
}

var times = [];
var fps;
function FPSCount(){//подсчёт и вывод fps
	const now = performance.now();
	while (times.length > 0 && times[0] <= now - 1000) {
		times.shift();
	  }
	  times.push(now);
	  fps = times.length;
	  ctx.font = "16px serif";
     ctx.strokeText("FPS: " +fps, canvas.width - 60, 20);
}
GameStart()


//document.onkeydown = function(e) { // e сокр. event
//	switch (e.keyCode) {
	//  case 65:  //влево
	//  console.log(bullets.length)
	//  console.log(bullets)
	//	break;
	//}
//}

//var bullet = { 
//	x: (canvas.width * 0.5) | 0,
//	y: (canvas.height * 0.5) | 0,
//	dx: 0.0,
//	dy: 0.0,
//	radius: 5.0,
	
//	tick: function(i) {
//		this.x += this.dx;
//		this.y += this.dy;
		
//		if (this.x + this.radius < 0.0
//		||	this.x - this.radius > canvas.width
//		||	this.y + this.radius < 0.0
//		|| 	this.y - this.radius > canvas.height)
//		{
//			this.dx = 0.0;
//			this.dy = 0.0;
	//		bullets.slice(i,1)
//		}
//		else{
//		this.render()
//		}
//	},
	
//	render: function() {
//		ctx.fillStyle = "red";
//		ctx.strokeStyle = "white";
//		ctx.beginPath();
//		ctx.arc(this.x,this.y,this.radius,0.0,2.0*Math.PI,false);
//		ctx.fill();
//		ctx.stroke();
//	}
//};
	//console.log(bullets[bullets.length-1])
	//bullets[bullets.length-1].x = position.x + 50
	//bullets[bullets.length-1].y = position.y +70
	//bullets[bullets.length-1].dx = x * 10.0
	//bullets[bullets.length-1].dy = y * 10.0
	//bullet.x = position.x + 50
	//bullet.y = position.y +70
	//bullet.dx = x * 10.0
	//bullet.dy = y * 10.0
	//position.x--
//position.y++
//var b = Math.atan2((hero.x+100/2) - 150,-((hero.y+140/2)-170))*(180/Math.PI)
//draw(100,100,100,140,b,"img/vragi.png")
//var b = Math.atan2((hero.x+100/2) - 550,-((hero.y+140/2)-370))*(180/Math.PI)