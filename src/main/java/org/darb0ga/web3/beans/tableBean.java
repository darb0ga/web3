package org.darb0ga.web3.beans;

import jakarta.annotation.ManagedBean;
import jakarta.annotation.PostConstruct;
import jakarta.faces.view.ViewScoped;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@ViewScoped
@ManagedBean
public class tableBean implements Serializable {
    private List<Item> dataList;

    @PostConstruct
    public void init() {
        dataList = new ArrayList<>();
        dataList.add(new Item(1, 2.0, false));
        dataList.add(new Item(2, 3.0, true));
    }

    public void selectX(Item item) {
        System.out.println("Selected X: " + item.getX());
    }

    public List<Item> getDataList() {
        return dataList;
    }

    public void setDataList(List<Item> dataList) {
        this.dataList = dataList;
    }
}

