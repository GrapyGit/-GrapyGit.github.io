function NewGame(){
    localStorage.clear()
    localStorage.setItem("Level", 0)
    localStorage.setItem("Lives", 2)
    localStorage.setItem("Armor", 1)
    localStorage.setItem("Speed", 10)
    localStorage.setItem("Power", 1)
    localStorage.setItem("XP", 0)
    localStorage.setItem("NewXP", 10)
    localStorage.setItem("ochko", 0)
    localStorage.setItem("LevP",1)
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
