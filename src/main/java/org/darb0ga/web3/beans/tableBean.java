package org.darb0ga.web3.beans;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;
import org.darb0ga.web3.db.DataBaseManager;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@SessionScoped
@Named
public class tableBean implements Serializable {
    private DataBaseManager dbmanager;
    private List<Item> dataList = new ArrayList<>();

    public tableBean() throws IOException {
        this.dbmanager = new DataBaseManager();
    }


    public List<Item> getDataList() {
        return dataList;
    }

    public void setDataList(List<Item> dataList) {
        this.dataList = dataList;
    }

    /** Метод для добавления нового результата в список и базу данных
    public void addResult(Item item) {
        dataList.add(item);
        dbmanager.saveResult(item);
    }*/

}

