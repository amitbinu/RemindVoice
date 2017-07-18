package com.tech.bean.remindvoice;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.widget.ScrollView;

public class MainActivity extends AppCompatActivity {

    private static LinearLayout data;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        data =(LinearLayout) findViewById(R.id.data);
        adddata();
    }

    //Clears all the data of the user in the server.
    public static void clear(){

    }

    //Adds all the user's data in the server to the application
    public static void adddata(){
    }
}
