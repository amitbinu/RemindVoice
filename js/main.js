var NotificationPermission;
window.onload = function(){
	start = document.getElementById("start");
	stop = document.getElementById("stop");
	time = document.getElementById("time");
	userKeyWord = document.getElementById("keywords");
	Notification.requestPermission();
	run = null;
	console.log(window.innerWidth);
	if (! Notification.permission === "granted" || window.innerWidth <= 865) {
		alert("Notifications will be pushed as alert messages like this!");
		NotificationPermission = false; 
	}
	else{
		NotificationPermission = true;
	}

	if(start.addEventListener){
		
			start.addEventListener("click",checkKeyWord);
		
	}

	if(stop.addEventListener){
		stop.addEventListener("click", stopListening);
	}

	
}

var checkKeyWord = function(){
	if(userKeyWord.value == ""){
			time.innerHTML = "Please enter a Keyword";
			time.style.fontSize = '3em';
			time.style.visibility = 'visible';
			userKeyWord.style.border = '0.09em solid red';
		}
		else{
			userKeyWord.style.border = '';
			time.innerHTML = "Listening ...";
			time.style.fontSize = '4em';
			time.style.visibility = 'visible';
			startListening();
			//runForEver();
		}
};

var runForEver = function(){
	startListening();
	run = setInterval(startListening,4000); 
}


var startListening = function(){
	recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.maxAlternatives = 1;
	recognition.stop();
	recognition.onstart = function(){
		console.log('started');
	}
	recognition.onend = function(){
		//variables.recoginizing = false;
		console.log("Ended")
		recognition.start();
	}	
	//adddata(userKeyWord.value.toLowerCase().trim()); /* REMOVE THIS. THIS IS ONLY FOR TESTING PURPOSES*/
	recognition.onresult = function(event) {
		//clearInterval(run);
  		for (var i = event.resultIndex;i < event.results.length; ++i) {
  			if(! event.results[i].isFinal){
  				isResultInBuffer = false;
  				resultInBuffer = "";
  				var text = event.results[i][0].transcript;
  				text = text.toLowerCase().trim();
  				userText = userKeyWord.value.toLowerCase().trim();
  				console.log(text);
  				if(text.includes(userText )){
  					//console.log(userText);
  					//push the notification
  					if(NotificationPermission === true){
  						new Notification("Remind Voice", {body:userText,icon:"https://remindvoice-d0f6c.firebaseapp.com/remindVoice.png" });
  					}
  					else{
  						alert("You said " + userText);
  					}

  					//runForEver();
  				}
  				else{
  					//runForEver();
  				}
  			}
  			else{
  				console.log(event.results[i][0].transcript);
  			}
  		}
	}
	recognition.start();
}

var stopListening = function(){
	time.style.visibility = 'hidden';
	clearInterval(run);
	recognition.stop();
}

