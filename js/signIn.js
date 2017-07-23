var config = {
    apiKey: "AIzaSyBDBsx2Qpdw5advp1WE8g-_ZPkVfKr1ISY",
    authDomain: "remindvoice-d0f6c.firebaseapp.com",
    databaseURL: "https://remindvoice-d0f6c.firebaseio.com",
    projectId: "remindvoice-d0f6c",
    storageBucket: "remindvoice-d0f6c.appspot.com",
    messagingSenderId: "750689896759"
  };
  firebase.initializeApp(config);


var uiConfig = {
        signInSuccessUrl: 'loggedIn.html',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: 'https://www.google.com'
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);