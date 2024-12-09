package org.darb0ga.web3.db;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.darb0ga.web3.utils.Point;

import java.io.IOException;
import java.io.InputStream;
import java.io.Serializable;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;


@Named
@SessionScoped
public class DataBaseManager implements Serializable {
    private Connection connection;

    private String url;
    private String username;
    private String password;

    private static final Logger logger = LogManager.getLogger(DataBaseManager.class);

    public DataBaseManager() throws IOException {
        loadConfig();
        connect();
    }

    private void loadConfig() throws IOException {
        try (InputStream input = getClass().getClassLoader().getResourceAsStream("application.properties")) {
            Properties prop = new Properties();
            prop.load(input);
            this.url = prop.getProperty("db.url");
            this.username = prop.getProperty("db.username");
            this.password = prop.getProperty("db.password");
        }
    }

    private void connect() {
        try {
            connection = DriverManager.getConnection(url, username, password);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void addPoint(Point point) throws SQLException {
        String insertQuery = "INSERT INTO results (x, y, r, isIn) VALUES (?, ?, ?, ?)";

        PreparedStatement preparedStatement = connection.prepareStatement(insertQuery);

        preparedStatement.setFloat(1, point.getX());
        preparedStatement.setFloat(2, point.getY());
        preparedStatement.setFloat(3, point.getR());
        preparedStatement.setBoolean(4, point.getIn());

        preparedStatement.execute();
        //preparedStatement.executeUpdate(); хз в чем отличие надо посмотреть
    }

    public List<Point> getListOfPoints() throws SQLException {
        var points = new ArrayList<Point>();

        var query = "SELECT * FROM results";
        PreparedStatement ps = connection.prepareStatement(query);
        var answer = ps.executeQuery();
        while (answer.next()) {
            var point = new Point(
                    answer.getFloat("x"),
                    answer.getFloat("y"),
                    answer.getFloat("r"),
                    answer.getBoolean("isIn")
            );
            points.add(point);
        }

        return points;
    }

}
