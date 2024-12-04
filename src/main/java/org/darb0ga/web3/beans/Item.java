package org.darb0ga.web3.beans;

import java.io.Serializable;

public class Item implements Serializable {
    private int x;
    private double y;
    private boolean selected;

    public Item(int x, double y, boolean selected) {
        this.x = x;
        this.y = y;
        this.selected = selected;
    }

    // Геттеры и сеттеры
    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public boolean isSelected() {
        return selected;
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }
}
