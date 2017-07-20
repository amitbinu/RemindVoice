package com.tech.bean.remindvoice;

import java.util.ArrayList;

/**
 * Created by amitb on 2017-07-20.
 */

public class User {
    public String userName;
    public String userId;
    public ArrayList<String> time;
    public ArrayList<String> info;
    public ArrayList<String> date;

    public User(){

    }
    public User(String userName, String userId, ArrayList<String> time, ArrayList<String> info, ArrayList<String> date){
        this.userName = userName;
        this.userId = userId;
        this.time = time;
        this.info = info;
        this.date = date;
    }
}
