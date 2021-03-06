package com.example.demo.dao;

import com.example.demo.model.Product;

import java.util.List;
import java.util.Map;

public interface ProductDao {

    List<Product> selectALlProductsByFilter(String condition);

    Product selectProductByID(String name);

    List<Map<String, Object>> selectTopThreeRelatedProducts(String name);

    int selectProductStock(String name);
}
