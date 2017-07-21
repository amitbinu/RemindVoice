window.onload = function(){
	start = document.getElementById("start");
	stop = document.getElementById("stop");
	time = document.getElementById("time");
	keywords = document.getElementById("keywords");
	title = document.getElementById("title");

	start.style.display = "none";
	stop.style.display = "none";
	time.style.display = "none";
	keywords.style.display = "none";
	title.style.display = "none";

//	signin();

};



var showStuff = function(){
	start.style.display = "initial";
	stop.style.display = "initial";
	time.style.display ="initial";
	keywords.style.display = "initial";
	title.style.display = "initial";

	userKeyWord = document.getElementById("keywords")
	if(start.addEventListener){
		
			start.addEventListener("click",checkKeyWord);
		
	}

	if(stop.addEventListener){
		stop.addEventListener("click", stopListening);
	}
}

