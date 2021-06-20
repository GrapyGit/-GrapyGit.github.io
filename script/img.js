function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        list.push(img);
        img.src = array[i];
    }
}

preloadImages(["img/patrin.png","img/life.png","img/igrock.png","img/vrag1.png","img/vragi2.png","img/vragi3.png","img/vragi4.png","img/vz.png"]);

String.prototype.filename=function(extension){
	var s= this.replace(/\\/g, '/');
	s= s.substring(s.lastIndexOf('/')+ 1);
	return extension? s.replace(/[?#].+$/, ''): s.split('.')[0];
}