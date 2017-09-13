var NotificationPermission;
var pushedNotification = false;
var uerMsg = "";
var firstTime = true;

$(document).ready(function(){
	start = document.getElementById("start");
	stop = document.getElementById("stop");
	time = document.getElementById("time");
	$("#userMsg").hide();
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
}) 

var checkKeyWord = function(){
	if(userKeyWord.value == ""){
			time.innerHTML = "Please enter a Keyword";
			time.style.fontSize = '3em';
			time.style.visibility = 'visible';
			userKeyWord.style.border = '0.09em solid red';
			$('#keywords').effect("shake");
		}
		else{
			
			if (!('webkitSpeechRecognition' in window)){
				alert("Please use this website in Google Chrome");
				upgrade();
			}
			else{
				userKeyWord.style.border = '';
				time.innerHTML = "Listening ...";
				time.style.fontSize = '4em';
				time.style.visibility = 'visible';
				startListening();
			}
		}
};

var runForEver = true;

var startListening = function(){
	runForEver = true;
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
		$('#userMsg').stop().fadeOut(3000);
		firstTime = true;
		console.log("Ended")
		if (runForEver) {
			recognition.start();
		}
	}	
	//adddata(userKeyWord.value.toLowerCase().trim()); /* REMOVE THIS. THIS IS ONLY FOR TESTING PURPOSES*/

	recognition.onsoundstart = function(){
		console.log('Sound detected');
	}
	recognition.onresult = function(event) {
		//clearInterval(run);
		if (firstTime===true) {
			$('#userMsg').stop().fadeIn(2000);
			firstTime = false;
		}
	//	$('#userMsg').hide();
  		for (var i = event.resultIndex;i < event.results.length; ++i) {

  			if(! event.results[i].isFinal){
  				console.log('Called on Result -- if statement');
  			//	$('#userMsg').stop().fadeIn();
  				$("#userMsg").text(" ");
  			  	var text = event.results[i][0].transcript;
  			  	$("#userMsg").text(text);
  				text = text.toLowerCase().trim();
  				userText = userKeyWord.value.toLowerCase().trim();
  			//	console.log(text);
  				if(text.includes(userText ) && ! pushedNotification){
  					//console.log(userText);
  					//push the notification
  					pushedNotification = true;
  					if(NotificationPermission === true){
  						new Notification("Remind Voice", {body:userText,icon:"https://remindvoice-d0f6c.firebaseapp.com/remindVoice.png" });
  					}
  					else{
  						alert("You said " + userText);
  					}
  				}
  				console.log('Finished if statement');
  			}
  			else{
  				console.log('Called on Result -- else statement');
  		//		$('#userMsg').fadeIn(2000);
  				$("#userMsg").text(event.results[i][0].transcript);
  				if(event.results[i][0].transcript.includes(userText) && !pushedNotification){
  					if(NotificationPermission === true){
  						new Notification("Remind Voice", {body:userText,icon:"https://remindvoice-d0f6c.firebaseapp.com/remindVoice.png" });
  					}
  					else{
  						alert("You said " + userText);
  					} 
  				}
  			//	console.log(event.results[i][0].transcript);
  				pushedNotification = false;
  				//$('#userMsg').fadeOut(5000);
  				recognition.stop();
  			}
  		}
	}
	recognition.start();
}

var stopListening = function(){
	time.style.visibility = 'hidden';
	clearInterval(run);
	runForEver = false;
	recognition.stop();
}

