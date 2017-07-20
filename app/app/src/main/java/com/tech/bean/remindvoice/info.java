package com.tech.bean.remindvoice;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

public class info extends AppCompatActivity {
    private static LinearLayout data;
    private  static DatabaseReference databaseReference;
    private static FirebaseUser user;
    private static User userInfo;
    private static Context context;
    private ArrayList<String> time = new ArrayList<>();
    private ArrayList<String> info = new ArrayList<>();
    private ArrayList<String> date = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_info);
        data =(LinearLayout) findViewById(R.id.data);
        context = this;
        databaseReference = FirebaseDatabase.getInstance().getReference();
        user = MainActivity.user;
        getUserinfo(user);
    }

    //Clears all the data of the user in the server.
    public static void clear(){

    }


    //Adds all the user's data in the server to the application
    public static void adddata(){
        int numberOfData = userInfo.info.size();
        data.removeAllViews();
        for (int i =0; i < numberOfData; i++){
            LinearLayout data1  = new LinearLayout(context);
            LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 80);
            data1.setLayoutParams(layoutParams);
            data1.setOrientation(LinearLayout.HORIZONTAL);

            TextView date = new TextView(context);
            LinearLayout.LayoutParams dateParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            dateParams.weight = Float.parseFloat("0.5");
            date.setLayoutParams(dateParams);
            date.setText(userInfo.date.get(i));

            TextView time = new TextView(context);
            LinearLayout.LayoutParams timeParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            timeParams.weight = Float.parseFloat("0.5");
            time.setLayoutParams(timeParams);
            time.setText(userInfo.time.get(i));

            TextView info = new TextView(context);
            LinearLayout.LayoutParams infoParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            infoParams.weight = Float.parseFloat("2");
            info.setLayoutParams(infoParams);
            info.setText(userInfo.info.get(i));

            data1.addView(date);
            data1.addView(time);
            data1.addView(info);

            data.addView(data1);
        }
    }

    private void getUserinfo(FirebaseUser user){
        final String userName = user.getDisplayName();
        final String userId = user.getUid();
        databaseReference.child("users").child(userId).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                time = new ArrayList<String>();
                info = new ArrayList<String>();
                Iterable<DataSnapshot> timeInDatabase = dataSnapshot.child("time").getChildren();
                for (DataSnapshot times : timeInDatabase){
                    time.add(times.toString());
                }

                Iterable<DataSnapshot> dateInDatabase = dataSnapshot.child("date").getChildren();
                for (DataSnapshot infos : dateInDatabase){
                    date.add(infos.toString());
                }

                Iterable<DataSnapshot> infoInDatabase = dataSnapshot.child("info").getChildren();
                for (DataSnapshot infos : infoInDatabase){
                    info.add(infos.toString());
                }

                userInfo = new User(userName,userId, time,info,date);
                adddata();
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });

    }

}
