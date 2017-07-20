package com.tech.bean.remindvoice;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v4.app.FragmentActivity;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FacebookAuthProvider;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

import static com.tech.bean.remindvoice.info.adddata;


public class MainActivity extends FragmentActivity {
    private static FirebaseAuth mAuth;
    private CallbackManager callbackManager;
    public static FirebaseUser user;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        FacebookSdk.sdkInitialize(getApplicationContext());
        setContentView(R.layout.activity_main);
        mAuth = FirebaseAuth.getInstance();

        AppEventsLogger.activateApp(this);
        callbackManager = CallbackManager.Factory.create();
        LoginButton loginButton = (LoginButton) findViewById(R.id.login_button);
        loginButton.registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                Log.e("Checking", "facebook:onSuccess:" + loginResult);
                handleFacebookAccessToken(loginResult.getAccessToken());

            }

            @Override
            public void onCancel() {
                Log.e("Checking", "Cancelled");
            }

            @Override
            public void onError(FacebookException error) {
                Log.e("Error", error.getMessage());
            }});


    }


    @Override
    public void onStart() {
        super.onStart();
        // Check if user is signed in (non-null) and update UI accordingly.
        FirebaseUser currentUser = mAuth.getCurrentUser();
        if (currentUser != null){
            Log.e("Current-USer", currentUser.getDisplayName());
            user = currentUser;
            Intent intent = new Intent(this, info.class);
            startActivity(intent);
        }
        //updateUI(currentUser);
    }

    @Override

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {

        super.onActivityResult(requestCode, resultCode, data);
        // Pass the activity result back to the Facebook SDK
        callbackManager.onActivityResult(requestCode, resultCode, data);

    }



    private void handleFacebookAccessToken(AccessToken token) {
        Log.d("TOKEN", "handleFacebookAccessToken:" + token);
         AuthCredential credential = FacebookAuthProvider.getCredential(token.getToken());
        mAuth.signInWithCredential(credential)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {

                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            // Sign in success, update UI with the signed-in user's information

                            user = mAuth.getCurrentUser();
                            Log.e("LOGGED IN", "signInWithCredential:success" + " " + user.getDisplayName() );
                            Intent intent = new Intent(MainActivity.this, info.class);
                            startActivity(intent);
                            //updateUI(user);
                        }
                        else {
                            // If sign in fails, display a message to the user.
                             Log.e("SMFH", "signInWithCredential:failure", task.getException());
                            Toast.makeText(MainActivity.this, "Authentication failed.", Toast.LENGTH_SHORT).show();
                            //updateUI(null);
                        }

                    }
                });
    }

    public static void signOut(View view){
        mAuth.signOut();
        LoginManager.getInstance().logOut();
        Log.e("Logged Out", "true");
    }


}
