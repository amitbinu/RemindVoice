window.onload = function(){
	start = document.getElementById("start");
	stop = document.getElementById("stop");
	time = document.getElementById("time");

	
	if(start.addEventListener){
		start.addEventListener("click",startListening);
	}

	if(stop.addEventListener){
		stop.addEventListener("click", stopListening);
	}
};

var startListening = function(){
	time.style.visibility = 'visible';
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.onresult = function(event) { 
  		for (var i = event.resultIndex;i < event.results.length; ++i) {
  			if(event.results[i].isFinal){
  				var text = event.results[i][0].transcript;
  				
  				if(text == 'get ready'){
  					console.log(event.results[i][0].transcript);
  					//push the notification
  				}
  			}
  		}
	}
	recognition.start();
}

var stopListening = function(){
	time.style.visibility = 'hidden';
}