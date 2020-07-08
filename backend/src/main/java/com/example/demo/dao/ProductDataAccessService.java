package com.example.demo.dao;

import com.example.demo.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository("postgres")
public class ProductDataAccessService implements ProductDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ProductDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Product> selectALlProducts() {
        final String sql = "SELECT * FROM products";
        return jdbcTemplate.query(sql, (resultSet, i) -> {
            final String name = resultSet.getString("name");
            final int stock = resultSet.getInt("stock");
            final double price = resultSet.getDouble("price");
            final String imageUrl = resultSet.getString("image_url");
            return new Product(name, stock, price, imageUrl);
        });
    }
}