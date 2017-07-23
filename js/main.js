window.onload = function(){
	start = document.getElementById("start");
	stop = document.getElementById("stop");
	time = document.getElementById("time");
	signOut = document.getElementById("SignOut")
	userKeyWord = document.getElementById("keywords")
	dtb = firebase.database();
	currentUser = null;
	 firebase.auth().onAuthStateChanged(function (user){
	 	if(user){
	 		currentUser = user;
	 		console.log(user);
	 	}
	 	else{
	 		console.log("Something went wrong - beans");
	 		window.location.href = "index.html";
	 	}
	 });
	if(start.addEventListener){
		
			start.addEventListener("click",checkKeyWord);
		
	}

	if(stop.addEventListener){
		stop.addEventListener("click", stopListening);
	}

	if(signOut.addEventListener){
		signOut.addEventListener("click", usersignOut);
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
		}
};

var startListening = function(){
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	adddata(userKeyWord.value.toLowerCase().trim()); /* REMOVE THIS. THIS IS ONLY FOR TESTING PURPOSES*/
	recognition.onresult = function(event) { 
  		for (var i = event.resultIndex;i < event.results.length; ++i) {
  			if(event.results[i].isFinal){
  				var text = event.results[i][0].transcript;
  				text = text.toLowerCase().trim();
  				userText = userKeyWord.value.toLowerCase().trim();
  				console.log(text);
  				if(text.includes(userText )){
  					//console.log(userText);
  					//push the notification
  					adddata(userText);
  				}
  			}
  		}
	}
	recognition.start();
}

var stopListening = function(){
	time.style.visibility = 'hidden';
}

var usersignOut = function(){
	firebase.auth().signOut().then(function() {
		window.location.href  = "index.html";
  console.log('Signed Out');
}, function(error) {
  console.error('Sign Out Error', error);
});
};

var adddata = function(userText){
	console.log(userText);
	var newInfo = firebase.database().ref().child('info').push().key;
	console.log("newInfo : " + newInfo);
	var updates = {};
	updates['users/' + currentUser.uid + '/info/' + newInfo] = userText;
	dtb.ref().update(updates);
};