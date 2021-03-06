package com.example.demo.api;

import com.example.demo.model.Product;
import com.example.demo.service.ProductService;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RequestMapping("products")
@RestController
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @CrossOrigin
    @GetMapping(path = "{condition}")
    public List<Product> getAllProductsByFilter(@PathVariable("condition") String condition) {
        return productService.getAllProductsByFilter(condition);
    }

    @CrossOrigin
    @GetMapping(path = "get/{name}")
    public Product getProductById(@PathVariable("name") String name) {
        return productService.getProductById(name);
    }

    @CrossOrigin
    @GetMapping(path = "related/{name}")
    public List<Map<String, Object>> getTopThreeRelatedProducts(@PathVariable("name") String name) {
        return productService.getTopThreeRelatedProducts(name);
    }

    @CrossOrigin
    @GetMapping(path = "stock/{name}")
    public int getProductStock(@PathVariable("name") String name) {
        return productService.getProductStock(name);
    }

}
