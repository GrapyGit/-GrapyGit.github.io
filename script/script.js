function NewGame(){
	book;
	if (localStorage["book"]!=null){
	var book = localStorage["book"]
	}
    localStorage.clear()
	localStorage.setItem("book", book)
	localStorage.setItem("NewXP", 10)
	localStorage.setItem("Speed", 10)
    localStorage.setItem("Level", 0)
    localStorage.setItem("Lives", 2)
    localStorage.setItem("Armor", 1)
    localStorage.setItem("Power", 1)
    localStorage.setItem("ochko", 0)
    localStorage.setItem("LevP",1)
	localStorage.setItem("XP", 0)
}
function Save(){
	localStorage["Level"] = Number(localStorage.getItem("Level"))+1
    localStorage["Lives"] = hero.maxLives
    localStorage["Armor"] = hero.maxArmor
    localStorage["Speed"] = hero.speed
    localStorage["Power"] = hero.power
    localStorage["NewXP"] = hero.NewXP
    localStorage["ochko"] = hero.ochko
	localStorage["LevP"] = hero.Level
	localStorage["XP"] = hero.xp
}
function setStorage(){
	localStorage.setItem("initializationEnemie",document.getElementById("v").innerHTML) 
	localStorage.setItem("temporaryAmmunition",document.getElementById("am").value)  
	localStorage.setItem("temporaryArmor",document.getElementById("a").value) 
	localStorage.setItem("temporarySpeed",document.getElementById("s").value) 
	localStorage.setItem("temporaryPower",document.getElementById("p").value)
	localStorage.setItem("temporaryLife",document.getElementById("l").value) 
	localStorage.setItem("time",document.getElementById("ee").value) 
}

function getStorage(){
	initializationEnemie = localStorage["initializationEnemie"].split(",")
	for (var i=0; i< initializationEnemie.length; i++){
		initializationEnemie[i] = Number(initializationEnemie[i])
	}
	hero.ammunition = Number(localStorage["temporaryAmmunition"])
	hero.maxLives = Number(localStorage["temporaryLife"])
	hero.lives = Number(localStorage["temporaryLife"])
    hero.maxArmor =Number(localStorage["temporaryArmor"])
	hero.armor =Number(localStorage["temporaryArmor"])
    hero.speed = Number(localStorage["temporarySpeed"])
    hero.power = Number(localStorage["temporaryPower"])
	duration = Number(localStorage["time"])
    hero.NewXP = 100000
	hero.xp = 0
}

function ClearStorage(){
    localStorage.removeItem('initializationEnemie');
	localStorage.removeItem("temporaryAmmunition")  
	localStorage.removeItem("temporaryArmor") 
	localStorage.removeItem("temporarySpeed") 
	localStorage.removeItem("temporaryPower")
	localStorage.removeItem("temporaryLife") 
	localStorage.removeItem("time") 
}
