package org.darb0ga.web3.utils;

import java.io.Serializable;

public class Point implements Serializable{
    private final float x;
    private final float y;
    private final float r;

    private boolean isIn;

    public Point(float x, float y, float r){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public float getX(){
        return this.x;
    }

    public float getY(){
        return this.y;
    }

    public float getR(){
        return this.r;
    }
    public boolean getIn(){
        return this.isIn;
    }

    public boolean isIn(){
        return this.isIn;
    }

    public void setIn(boolean in) {
        isIn = in;
    }

}
