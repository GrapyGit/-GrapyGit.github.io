var bullets =[]//массив пуль
var enemies =[]//массив врагов
var popadanie = 0
var dopopadaniya = 0
var initializationEnemie
var NumberOfEnemies = 0
var kill = 0
var vz
var patron = 40

function isCollided(dx,dy,x,y)
{
	  var d = Math.sqrt((dx - x)*(dx - x) + (dy - y)*(dy - y))
	  return d<=50
}

function sprite(){
	var image = new Image();
      image.src = 'vz.png';
	  var width = 260
	  var height = 240
	  var x = 1
	  var y = 1
	  for (i=1;i<vz.length;i++)
	  ctx.drawImage(image,  width*x, height*y, 0, 0, width, height);
 
      if (currentFrame == frames) {
        currentFrame = 0;
      } else {
        currentFrame++;
      }
}


var mouseX,mouseY
var canvas = document.getElementById("myCanvas")
var bounds = canvas.getBoundingClientRect()
var ctx = canvas.getContext("2d")
canvas.width = canvas.offsetWidth
canvas.height =canvas.offsetHeight 
//canvas.width =1280
//canvas.height = 720
//px = canvas.offsetWidth/canvas.width 
//py = canvas.offsetHeight/canvas.height
//console.log(px+" "+py)

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
	if (hero.x <0) hero.x = 0
	if (hero.y <0) hero.y = 0
	if (hero.y >canvas.height-120) hero.y = canvas.height -125
	if (hero.x > canvas.width-100) hero.x = canvas.width - 105
  }
  document.addEventListener('keydown', K.fn);
  document.addEventListener('keyup', K.fn);//конец перемещенния

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(10, canvas.height - 40, hero.lives*10, 15);
	ctx.fillStyle = "#b81313";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.rect(10, canvas.height - 70, hero.armor*10, 15);
	ctx.fillStyle = "#00e3e3";
	ctx.fill();
	ctx.closePath();

  }
hero = {
   x : canvas.width-140,
   y : 0,
   speed : localStorage.getItem("Speed"),
   angle : 0,
   lives : localStorage.getItem("Lives"),
   ammunition: 0,
   armor : localStorage.getItem("Speed"),
   xp : Number(localStorage.getItem("XP")),
   ochko : localStorage.getItem("ochko"),
   NewXP : localStorage.getItem("NewXP"),
   Level : localStorage.getItem("LevP"),
   power: localStorage.getItem("Power")
}

function Leveles()
{
	switch(0){
		case  0:
			hero.ammunition = 200;
			initializationEnemie = [1,1,1,1,1];
		break;
		case  1:
			hero.ammunition = 400;
			initializationEnemie = [1,2,2,1,2,2,2,1,2,1];
		break;
		case  2:
			hero.ammunition = 600;
			initializationEnemie = [2,3,3,1,2,3,3,2,1,2,3,1,2,3,3,2];
		break;
		case  3:
			hero.ammunition = 800;
			initializationEnemie = [2,4,3,4,3,4,4,3,2,2];
		break;
	}
	console.log(localStorage.getItem("Level"))
	console.log(initializationEnemie)
	console.log(hero.ammunition)
	levelUp()
}

Leveles()

class enemie{
	constructor(x,y,w,h,l,p,xp,a,src,ax,ay){
		this.x = x
		this.y= y
		this.src = src
		this.angle = a
		this.w = w
		this.h = h
		this.p = p
		this.l =l
		this.xp = xp
		this.ax = ax
		this.ay = ay
        this.kill = true
		this.x1 = 0
		this.y1 =0
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
		bullets.push(new bullet(this.x + 50, this.y +70,this.p, x * 10.0, y * 10.0, 5.0, 0))
	}
	vzriv(i){
		this.p++
			draw(this.x,this.y,this.w,this.h,this.angle+180,this.src,this.x1,this.y1)
			if (this.p==12){
			this.x1++
			this.p = 0
				if (this.x1 == 2) {
					this.y1++
					this.x1 =0
		  }
		  if (this.x1==1 && this.y1==3) 
		  deleat(i)
		  
	}
	}
}

function deleat(i){
    enemies.splice(i,1)
}
class bullet {
	constructor(x,y,p,dx,dy,radius,whose){
		this.x =x
		this.y = y
		this.dx = dx
		this.dy = dy
		this.p =p
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
			if (enemies[i].kill){
		if (isCollided(enemies[i].x+50,enemies[i].y+70,this.x, this.y)){
			enemies[i].l = enemies[i].l - this.p
			if (enemies[i].l <= 0){
               clearInterval(enemies[i].timer)
			   hero.xp += enemies[i].xp
			   enemies[i].src = "img/vz.png"
			   enemies[i].kill = false
			   this.p = 0
			   kill++
			   levelUp()
			}
			this.dx = 0.0;
			this.dy = 0.0;
			document.getElementById("rr").innerHTML="ви попали " + kill+ "<br>В вас попали "+dopopadaniya
			break;
		}
	}
		}
	}
		else{
			if (isCollided(hero.x+50,hero.y+70,this.x, this.y)){
			console.log("в тебя попали")
			dopopadaniya++
			this.dx = 0.0;
			this.dy = 0.0;
			document.getElementById("rr").innerHTML="ви попали " + kill+ "<br>В вас попали "+dopopadaniya
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

function draw(x,y,w,h,a,sr,x1,y1){//анимация смерти
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
    if (sr == "img/vz.png"){

        ctx.drawImage(img, 260*x1, 240*y1,260,240, x, y, w, h);
	} 
	else ctx.drawImage(img, x, y, 100, 140);
	
    ctx.closePath();
	if (a){
		ctx.restore()
	}
}

window.onmousedown = function(e) {
	//var x = mouseX - ((hero.x+50)*px)
	//var y = mouseY - ((hero.y+70)*py)
	var x = mouseX - (hero.x+50)
	var y = mouseY - (hero.y+70)

	var l = Math.sqrt(x * x + y * y)
	x = x / l
	y = y / l
	bullets.push(new bullet((hero.x + 50), (hero.y +70),hero.power, x * 10.0, y * 10.0, 5.0, 1))
	hero.ammunition--
	document.getElementById("b").innerHTML =": " + hero.ammunition
}

window.onmousemove = function(e) {
mouseX = e.clientX - bounds.left;
mouseY = e.clientY - bounds.top;
document.getElementById("r").innerHTML =""+ Math.atan2(mouseX - (hero.x+100/2),-(mouseY- (hero.y-140/2)))*(180/Math.PI)
}

function vooor(){
var kordinaty = spawn()
console.log(initializationEnemie[NumberOfEnemies])
switch(initializationEnemie[NumberOfEnemies]){
	case 1:
		enemies.push(new enemie(kordinaty.x,kordinaty.y,100,140,1,1,5,0,"img/vrag1.png",getRandomInt(canvas.width),getRandomInt(canvas.height)))
		break;

	case 2:
		enemies.push(new enemie(kordinaty.x,kordinaty.y,100,140,1,2,10,0,"img/vragi2.png",getRandomInt(canvas.width),getRandomInt(canvas.height)))
		break;

		case 3:
	enemies.push(new enemie(kordinaty.x,kordinaty.y,100,140,2,2,20,0,"img/vrag3.png",getRandomInt(canvas.width),getRandomInt(canvas.height)))
		break;

		case 4:
	enemies.push(new enemie(kordinaty.x,kordinaty.y,100,140,3,2,40,0,"img/vrag4.png",getRandomInt(canvas.width),getRandomInt(canvas.height)))
		break;
}
enemies[enemies.length-1].fire()
NumberOfEnemies++
if (NumberOfEnemies>initializationEnemie.length){
	clearInterval(time)
}
}
var time
time = setInterval(vooor,5000);
function GameStart(){
	
ctx.clearRect(0, 0, canvas.width, canvas.height)
hero.angle = Math.atan2(mouseX - (hero.x+100/2),-(mouseY- (hero.y+140/2)))*(180/Math.PI)

draw(hero.x,hero.y,100,140,hero.angle,"img/igrock.png")

for (var i=0; i<enemies.length; i++){
	if (enemies[i].kill){
	enemies[i].tick()
	draw(enemies[i].x,enemies[i].y,enemies[i].w,enemies[i].h,enemies[i].angle,enemies[i].src)
	}
	else enemies[i].vzriv(i)
	
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
drawPaddle()
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

function levelUp(){
   if (hero.xp >= hero.NewXP){
	hero.NewXP *= 2 
    hero.Level++
	hero.ochko++
    hero.xp = 0

   }
   document.getElementById("money").innerHTML =": "+ hero.xp
   document.getElementById("ochko").innerHTML =": "+hero.ochko
   document.getElementById("b").innerHTML =": "+ hero.ammunition

}
