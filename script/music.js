var musicArray = []
class music{
    constructor(src,time,volue,pla){
      this.src = src
      this.time = time
      this.volue = volue
      this.audio = new Audio(src);
      this.pla = pla
    }
   play(){
     this.audio.play()
     this.audio.volume = this.volue;
     setTimeout(()=>this.stop,this.time)
   }
   stop(){
    this.audio.stop()
    this.pla = true
    kill()
   }
}
function kill(){
    var i=0
    while(i<musicArray.length){
         if (musicArray[i].pla){
            musicArray.splice(i,1)
         }else
         i++
    }
}