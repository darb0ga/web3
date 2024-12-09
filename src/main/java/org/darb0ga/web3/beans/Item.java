package org.darb0ga.web3.beans;

import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.darb0ga.web3.db.DataBaseManager;

import java.io.Serializable;

@Getter
@Setter
@Named("ItemBean")
public class Item implements Serializable {
    private double x;
    private double y;
    private double r;
    private boolean selected;
    private DataBaseManager dbmanager;

    private static final Logger logger = LogManager.getLogger(tableBean.class);



    public void init() {


    }

    public void addDot(float x, float y, float r){
        boolean isInArea = checkPoint(x, y, r);
        //dbmanager
        //tablebean
    }

    private boolean checkPoint(float x, float y, float r) {
        return ((x <= 0) && (x >= -r) && (y <= 0) && (y >= -r) || //in rectangle
                (x <= 0) && (y <= 1.5*r*x + r) && (y >= 0) || //in triangle
                (x * x + y * y <= r * r) && (x >= 0) && (y >= 0) //in circle
        );
    }


}
