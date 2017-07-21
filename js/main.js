

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
		}
};

var startListening = function(){
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.onresult = function(event) { 
  		for (var i = event.resultIndex;i < event.results.length; ++i) {
  			if(event.results[i].isFinal){
  				var text = event.results[i][0].transcript;
  				text = text.toLowerCase().trim();
  				userText = userKeyWord.value.toLowerCase().trim();
  				console.log(text);
  				if(text.includes(userText )){
  					//console.log(userText);
  					alert(userText);
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