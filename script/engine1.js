var bullets =[]//массив пуль
var enemies =[]//массив врагов
var helps =[]
var popadanie = 0
var initializationEnemie
var NumberOfEnemies = 0
var kill = 0
var vz
var patron = 40
var times = [];
var nomerdialoga = 0
var fps;
var mouseX,mouseY
var time
var duration
var test = false
var canvas = document.getElementById("myCanvas")
var bounds = canvas.getBoundingClientRect()
var ctx = canvas.getContext("2d")
canvas.width = canvas.offsetWidth
canvas.height =canvas.offsetHeight 
document.getElementById('dead').style.left = document.getElementById('dead').offsetLeft - (document.getElementById('dead').offsetWidth/2) +"px"
document.getElementById('dead').style.top = document.getElementById('dead').offsetTop - (document.getElementById('dead').offsetHeight/2) +"px"
document.getElementById('dead').style.display = "none"
document.oncontextmenu = ()=>{return false}
function propusk(a,b){
	for (nomerdialoga; dialogii[nomerdialoga][2] != Number(localStorage["Level"])+a; nomerdialoga++){
		if (dialogii[nomerdialoga][0] == "BLACK"){
			window.location = "TITRI.html"; 
		}
	}
    if (!b){
		if (localStorage["book"]==null){
			localStorage.setItem("book", 1)
			alert("Вам открыта первая страница в учебнике")
		}
		else if (Number(localStorage["book"])==Number(localStorage["Level"])){
			localStorage["book"] = Number(localStorage["Level"])+1
			alert("У вас доступна новая информация в учебнике")
		}

	
		Save()
		location.reload();
	}
	document.getElementById("lol").style.display = "none"
}

function upgrade(a){
  hero.ochko--
  switch (a){
case 1:
	hero.maxLives++
	break;
case 2:
    hero.maxArmor++
	break;
case 3:
    hero.speed+=5
	break;
case 4:
	hero.power++
	break;
  }
document.getElementById('lives').innerHTML=""+hero.maxLives
document.getElementById('armor').innerHTML=""+hero.maxArmor
document.getElementById('speed').innerHTML=""+hero.speed
document.getElementById('power').innerHTML=""+hero.power
levelUp()
  if (hero.ochko==0){
	document.getElementById("plus").style.display = "none"
  }
}

var hero = {
	img: preloadImages.list[2],
	x : canvas.width-140,
	y : 0,
	speed : Number(localStorage.getItem("Speed")),
	angle : 0,
	lives : Number(localStorage.getItem("Lives")),
	ammunition: 0,
	armor : Number(localStorage.getItem("Armor")),
	xp : Number(localStorage.getItem("XP")),
	ochko : Number(localStorage.getItem("ochko")),
	NewXP : Number(localStorage.getItem("NewXP")),
	Level : Number(localStorage.getItem("LevP")),
    power: Number(localStorage.getItem("Power")),
	fire : true,
	maxLives: Number(localStorage.getItem("Lives")),
	maxArmor: Number(localStorage.getItem("Armor")),
	shot : function(){
		this.ammunition--
		if (this.ammunition == 0) 
		this.fire = false
	},
	Recovery : function(){
	
		if (this.maxArmor>this.armor) //clearInterval(this.timer)
        this.armor++
		console.log("амуниции :"+ this.armor)
	},
	hit : function(at){
		var a = this.lives+this.armor;
		a = a - at;
		if (a <= 0) {
			this.lives = 0; 
			this.armor = 0;
			dead()
		}
		else if (a - this.lives >0) {
			this.armor = a-this.lives;
		}
		else {
		this.lives = a;
		this.armor = 0;
		}
		clearInterval(this.timer) 
	this.timer = setInterval(()=>hero.frash(), 6000)
	},
	timer :  setInterval(()=>hero.Recovery(), 1000),
	frash : function(){
        clearInterval(this.timer) 
		this.timer =  setInterval(()=>hero.Recovery(), 1000)
	}
 }
//hero.img.src = "img/igrock.png"


if (hero.ochko==0) document.getElementById("plus").style.display = "none"

function dead(){
	hero.fire = false
	for (var i=0; i<enemies.length; i++){
		clearInterval(enemies[i].timer)
	}
	clearInterval(time)
	enemies = []
    document.getElementById("opt").style.display = "none"
	document.getElementById("plus").style.display = "none"
	//document.getElementById("zagolovok").style.display = "none"
	document.getElementById("menu").style.display = "none"
	document.getElementById("animation").style.display = "none"
    document.getElementById('dead').style.display = "block";
}

class help{
	constructor(x,y,a,img,h,w){
		this.x = x
		this.y = y
		this.a =a
		this.img =img
		this.h = h
		this.w =w
		this.kill = false
		this.timer = setTimeout(()=>{this.kill = true},4000)
	}
	tick(){
		if (collision(this.x+ this.w/2,this.y+ this.h/2,this.w/2,hero.x+50,hero.y+70,50)){
			console.log(this.img)
			console.log(this.img.src.filename())
			console.log(preloadImages.list[1].src)
           switch(this.img.src.filename()){
			   case "patrin":
				console.log("где патроны")
				hero.ammunition = hero.ammunition +getRandomInt(30);
				document.getElementById("b").innerHTML =": " + hero.ammunition
				   break;
			   case "life":
                 if (hero.lives < hero.maxLives){  
					 hero.lives = hero.lives + getRandomInt(hero.maxLives - hero.lives)+1
					 console.log("жизни "+ hero.lives)
				 };
					break;
		   }
			  clearTimeout(this.timer)
			  this.kill = true
		   }
		}
	}



class enemie{
	constructor(x,y,w,h,l,p,xp,a,img,ax,ay,speed,f){
		this.x = x
		this.y= y
		this.img = img
	//	this.img.src = src
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
		this.speed = speed
	    this.FireSpeed = f
		this.timer = setInterval(() => this.fire(), this.FireSpeed);
	}	
    tick(){
        if (this.x>this.ax) 
			if (this.x-this.ax>=this.speed)
				this.x = this.x - this.speed;
			else 
				this.x = this.x-(this.x-this.ax);

		else if (this.x<this.ax)
	         if (this.ax-this.x>=this.speed)
			 	this.x = this.x + this.speed;
			else 
				this.x = this.x+(this.ax-this.x);
		 
		if (this.y>this.ay) 
			if (this.y-this.ay>=this.speed) 
				this.y = this.y -this.speed;
			else 
				this.y = this.y -(this.y-this.ay);
		
		else if (this.y<this.ay)
            if (this.ay-this.y>=this.speed) 
			  	this.y = this.y + this.speed;
	    	else 
				this.y = this.y + (this.ay-this.y);
			 
		if (this.x==this.ax && this.y==this.ay) {
			this.ax = getRandomInt(canvas.width - 140);
			this.ay = getRandomInt(canvas.height - 100);
		}
		this.angle =Math.atan2((hero.x+50) - (this.x+this.w/2),-(((hero.y+70)-(this.y + this.h/2))))*(180/Math.PI)
	}
	fire(){
        var x = (hero.x+50) - (this.x+50)
	    var y = (hero.y+70) - (this.y+70)
	    var l = Math.sqrt(x * x + y * y)//длина вектора 
	    x = x / l
	    y = y / l
		musicArray.push(new music("music/laser.mp3",500,0.01,false))
		musicArray[musicArray.length-1].play()
		bullets.push(new bullet(this.x + 50, this.y +70,this.p, x * 10.0, y * 10.0, 5.0, 0))
	}
	vzriv(i){
		this.p++
			draw(this.x,this.y,this.w,this.h,this.angle+180,this.img,this.x1,this.y1)
			if (this.p==10){
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
		if (isCollided(enemies[i].x+enemies[i].w/2,enemies[i].y+enemies[i].h/2,this.x, this.y,enemies[i].w/2)){
			enemies[i].l = enemies[i].l - this.p
			musicArray.push(new music("music/pop.wav",800,0.01,false))
			musicArray[musicArray.length-1].play()
			if (enemies[i].l <= 0){
				musicArray.push(new music("music/explosion.mp3",1900,0.10,false))
				musicArray[musicArray.length-1].play()
                if (getRandomInt(101) > 50) {
							helps.push(new help(enemies[i].x,enemies[i].y,enemies[i].angle,preloadImages.list[getRandomInt(2)],60,60))
					}
				
				
               clearInterval(enemies[i].timer)
			   hero.xp += enemies[i].xp
			   enemies[i].img = preloadImages.list[7]
			   enemies[i].kill = false
			   this.p = 0
			   levelUp()
			}
			this.dx = 0.0;
			this.dy = 0.0;
			break;
		}
	}
		}
	}
		else{
			if (isCollided(hero.x+50,hero.y+70,this.x, this.y,50)){
			musicArray.push(new music("music/pop.wav",800,0.01,false))
			musicArray[musicArray.length-1].play()
            hero.hit(this.p)
			this.dx = 0.0;
			this.dy = 0.0;
		}
	}
	}
    render(){
		switch(this.p){
			case 1:
			ctx.fillStyle = "red";
			break;
		    case 2:
				ctx.fillStyle = "orange";
			break;
			case 3:
				ctx.fillStyle = "yellow";
			break;
			case 4:
			    ctx.fillStyle = "green";
			break;
			case 5:
				ctx.fillStyle = "blue";
			break;
			default:
				ctx.fillStyle = "white";
		}
		ctx.strokeStyle = "white";
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0.0,2.0*Math.PI,false);
		ctx.fill();
		ctx.stroke();
	}
}

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
	if (hero.y >canvas.height-120) hero.y = canvas.height -120
	if (hero.x > canvas.width-100) hero.x = canvas.width - 100
  }

function Leveles()
{
	switch(Number(localStorage.getItem("Level"))){
		case  0:
			hero.ammunition = 30;
			duration = 5000
			initializationEnemie = [1,1,1,1,1];
		break;
		case  1:
			hero.ammunition = 80;
			duration = 4500
			initializationEnemie = [1,2,2,1,2,2,2,1,2,1];
		break;
		case  2:
			hero.ammunition = 100;
			duration = 4000
			initializationEnemie = [2,3,3,1,2,3,3,2,1,2,3,1,2,3,3,2];
		break;
		case  3:
			hero.ammunition = 100;
			duration = 3500
			initializationEnemie = [2,4,3,4,3,4,4,3,2,2];
		break;
		case 4:
			hero.ammunition = 200;
			duration = 2000
			initializationEnemie = [5];
		break;
	}
	console.log("врагов на уровне " +initializationEnemie.length)
	levelUp()
}

function deleat(i){
	kill++
    enemies.splice(i,1)
}


function isCollided(dx,dy,x,y,r)
{
	  var d = Math.sqrt((dx - x)*(dx - x) + (dy - y)*(dy - y))
	  return d<=r
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}		
 
function spawn(){
	var x,y
	switch (getRandomInt(4)){
		case 0://появление слева
            y = getRandomInt(canvas.height)
			x =-100
		break;

		case 1://появленние сверху
			x = getRandomInt(canvas.width) 
			y = -140
		break;
		case 2://появление справа
			y = getRandomInt(canvas.height)
			x = canvas.width +100
		break;
		case 3://появление снизу
			x = getRandomInt(canvas.width)
			y = canvas.height +140
		break;
	}
	return {
		x : x,
		y : y
	}
}

function drawInfo() {
	ctx.beginPath();
	ctx.rect(10, canvas.height - 40, hero.lives*20, 15);
	ctx.fillStyle = "#b81313";
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.rect(10, canvas.height - 70, hero.armor*20, 15);
	ctx.fillStyle = "#00e3e3";
	ctx.fill();
	ctx.closePath();
  }

function draw(x,y,w,h,a,img,x1,y1){//анимация смерти
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
    if (x1 >=0){
        ctx.drawImage(img, 260*x1, 240*y1,260,240, x, y, w, h);
	} 
	else ctx.drawImage(img, x, y, w, h);
	
    ctx.closePath();
	if (a){
		ctx.restore()
	}
}

function vooor(){
var kordinaty = spawn()
switch(initializationEnemie[NumberOfEnemies]){
	case 1:
		enemies.push(new enemie(kordinaty.x,kordinaty.y,100,140,1,1,5,0,preloadImages.list[3],getRandomInt(canvas.width),getRandomInt(canvas.height),4,2000))
	break;

	case 2:
		enemies.push(new enemie(kordinaty.x,kordinaty.y,100,140,2,1,10,0,preloadImages.list[4],getRandomInt(canvas.width),getRandomInt(canvas.height),6,2000))
		break;

		case 3:
	enemies.push(new enemie(kordinaty.x,kordinaty.y,100,140,2,2,20,0,preloadImages.list[5],getRandomInt(canvas.width),getRandomInt(canvas.height),8,1000))
		break;

		case 4:
	enemies.push(new enemie(kordinaty.x,kordinaty.y,100,140,3,2,40,0,preloadImages.list[6],getRandomInt(canvas.width),getRandomInt(canvas.height),10,1500))
		break;
		case 5:
	enemies.push(new enemie(kordinaty.x,kordinaty.y,100,140,60,5,40,0,preloadImages.list[2],getRandomInt(canvas.width),getRandomInt(canvas.height),10,500))
		break;
}
//enemies[enemies.length-1].fire(1)
NumberOfEnemies++
if (NumberOfEnemies==initializationEnemie.length){
	clearInterval(time)
}
}

function levelUp(){
   if (hero.xp >= hero.NewXP){
	hero.NewXP *= 2 
    hero.Level++
	hero.ochko++
    hero.xp = 0
	document.getElementById("plus").style.display = "table"
   }
 
   document.getElementById("money").innerHTML =": "+ hero.xp
   document.getElementById("ochko").innerHTML =": "+hero.ochko
   document.getElementById("b").innerHTML =": "+ hero.ammunition
}

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

function NextLevel(){
		if (dialogii[nomerdialoga][2] == Number(localStorage["Level"])+1){
			if (dialogii[nomerdialoga][0] != "BLACK"){
		document.getElementById("nike").innerHTML=dialogii[nomerdialoga][0];
		document.getElementById("text").innerHTML=dialogii[nomerdialoga][1];
			}
			else {
			document.body.style.cursor = "none"
			document.getElementById("lol").style.display = "none"
			document.getElementById("text").style.color = "white";
			document.getElementById("history").style.bottom = "40%";
			document.getElementById("history").style.backgroundColor = "black";
			document.getElementById("history").style.border = "none";
			document.getElementById("nike").innerHTML=" ";
			document.body.style.backgroundImage = "none";
			document.body.style.backgroundColor = "black";
			document.getElementById("text").innerHTML=dialogii[nomerdialoga][1];
			document.getElementById("text").style.marginLeft = "0px";
			document.getElementById("history").style.textAlign ="center";
			if (dialogii[nomerdialoga][3] == 2000) 
			setTimeout(function(){ window.location = "TITRI.html"; }, 2000);
			}
			nomerdialoga = nomerdialoga +1;
			setTimeout(NextLevel,dialogii[nomerdialoga-1][3]);
		}
		else {
		kill = 0
		hero.fire = true
		NumberOfEnemies = 0
		document.getElementById("opt").style.display = "block"
		document.getElementById("lol").style.display = "none"
		document.getElementById("menu").style.display = "block"
		document.getElementById("animation").style.display = "block"
	    document.getElementById('history').style.display = "none";
		document.body.style.backgroundImage = ''
		if (localStorage["book"]==null){
			localStorage.setItem("book", 1)
			alert("Вам открыта первая страница в учебнике")
		}
		else if (Number(localStorage["book"])==Number(localStorage["Level"])){
			localStorage["book"] = Number(localStorage["Level"])+1
			alert("У вас доступна новая информация в учебнике")
		}
		Save()
		Leveles()
		time = setInterval(vooor,duration);
		GameStart()

		}
}

function GameStart(){
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	if (kill != initializationEnemie.length && hero.lives > 0){
	hero.angle = Math.atan2(mouseX - (hero.x+100/2),-(mouseY- (hero.y+140/2)))*(180/Math.PI)
	draw(hero.x,hero.y,100,140,hero.angle,hero.img)
		for (var i=0; i<enemies.length; i++){
			if (enemies[i].kill){
				enemies[i].tick()
				if (collision(enemies[i].x+(enemies[i].w/2),enemies[i].y+(enemies[i].h/2),enemies[i].w/2,hero.x+50,hero.y+70,50))
				{
					musicArray.push(new music("music/explosion.mp3",1900,0.10,false))
					musicArray[musicArray.length-1].play()
				   clearInterval(enemies[i].timer)
				   enemies[i].img = preloadImages.list[7]
				   enemies[i].kill = false
					if (enemies[i].p != 5){
				   hero.hit(hero.maxArmor)
					}else
					hero.hit(10)
				}
				else draw(enemies[i].x,enemies[i].y,enemies[i].w,enemies[i].h,enemies[i].angle,enemies[i].img)
			}
			else enemies[i].vzriv(i)
		}
		for (var i=0;i<helps.length;i++){
			helps[i].tick()
			if (helps[i].kill){
			  helps.splice(i,1)
			}
			else {
			draw(helps[i].x,helps[i].y,helps[i].w,helps[i].h,helps[i].a,helps[i].img)
			}
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
	drawInfo()
	update()
	FPSCount()
	requestAnimationFrame(GameStart)
			}
			else if(hero.lives>0){
				document.getElementById("opt").style.display = "none"
			    document.getElementById("menu").style.display = "none"
				document.getElementById("animation").style.display = "none"
				document.getElementById('history').style.display = "block";
				if (test){
					hero.fire = false
					document.getElementById("text").style.color = "white";
					document.getElementById("history").style.bottom = "40%";
					document.getElementById("history").style.backgroundColor = "black";
					document.getElementById("history").style.border = "none";
					document.getElementById("nike").innerHTML=" ";
					document.body.style.backgroundImage = "none";
					document.body.style.backgroundColor = "black";
					document.getElementById("text").innerHTML="Вы прошли тренировку, поздравляю :)";
					document.getElementById("text").style.marginLeft = "0px";
					document.getElementById("history").style.textAlign ="center";
					setTimeout(()=>{ClearStorage(); window.location = "index.html"},4000)
				}
				else{
				hero.fire = false
				document.getElementById("lol").style.display = "block"
				document.body.style.backgroundImage = 'url("img/1.gif")'
				document.body.style.backgroundSize = "cover";
				hero.lives = hero.maxLives
				hero.armor = hero.maxArmor
                NextLevel()
				}
			}
	}

window.onmousedown = function(e) {
	if (hero.fire){
	musicArray.push(new music("music/laser.mp3",500,0.01,false))
	musicArray[musicArray.length-1].play()
	var x = mouseX - (hero.x+50)
	var y = mouseY - (hero.y+70)
	var l = Math.sqrt(x * x + y * y)
	x = x / l
	y = y / l
	bullets.push(new bullet((hero.x + 50), (hero.y +70),hero.power, x * 10.0, y * 10.0, 5.0, 1))
	hero.shot()
	document.getElementById("b").innerHTML =": " + hero.ammunition
	}
}

window.onmousemove = function(e) {
	mouseX = e.clientX - bounds.left;
	mouseY = e.clientY - bounds.top;
}

window.onresize = function(e) {
	canvas.width = canvas.offsetWidth
	canvas.height =canvas.offsetHeight 
}
function collision(x1,y1,r1,x2,y2,r2){
	var x = x2 - x1
	var y = y2 - y1
	var l = Math.sqrt(x * x + y * y)
	var r = r1+r2
	return l<=r
}


function FullScrean(){
	if (document.fullscreenElement)
	{
		document.exitFullscreen()
		document.getElementById("full").src = "img/full.png"
	}
	else {
		document.documentElement.requestFullscreen();
		document.getElementById("full").src ="img/NoFull.png"
	}
}


var bol = true
document.getElementById("plus").onmouseover =()=>{if(!hero.fire){ bol = false} else {bol = true} hero.fire =false}
document.getElementById("plus").onmouseout =()=>{if (bol) hero.fire =true}
document.getElementById("set").onmouseover =()=>{if(!hero.fire){ bol = false} else {bol = true} hero.fire =false}
document.getElementById("set").onmouseout =()=>{if (bol) hero.fire =true}

document.addEventListener('keydown', K.fn);
document.addEventListener('keyup', K.fn);//конец перемещенния

if (localStorage["initializationEnemie"]==null){
Leveles()
propusk(1,1)
}
else{
    test =true
	getStorage()
	document.getElementById("lol").style.display = "none"
	//initializationEnemie = [1,1,1,1,1];
	console.log(initializationEnemie)
  //  ClearStorage()
}
 document.getElementById('lives').innerHTML=""+hero.maxLives
 document.getElementById('armor').innerHTML=""+hero.maxArmor
 document.getElementById('speed').innerHTML=""+hero.speed
 document.getElementById('power').innerHTML=""+hero.power
time = setInterval(vooor,duration);
GameStart()




