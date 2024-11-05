package com.invenboost.Central.Perk.controllers;

import com.invenboost.Central.Perk.dto.CategoryDTO;
import com.invenboost.Central.Perk.dto.ProductDTO;
import com.invenboost.Central.Perk.entity.Product;
import com.invenboost.Central.Perk.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Product createProduct(@ModelAttribute ProductDTO productDTO) {
        return productService.createProduct(productDTO);
    }

    @PutMapping(path = "/{id}" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Product updateProduct(@PathVariable long id, @ModelAttribute ProductDTO productDTO) {
        return productService.updateProduct(id , productDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable long id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable long id) {
        return productService.getProductById(id);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Get 5 random products
    @GetMapping("/random5")
    public ResponseEntity<List<Product>> getFiveRandomProducts() {
        List<Product> randomProducts = productService.getFiveRandomProducts();
        return ResponseEntity.ok(randomProducts);
    }

    // Get top 5 products ordered by points descending
    @GetMapping("/top5OrderedByPointsDesc")
    public ResponseEntity<List<Product>> getTop5ProductsOrderByPointsDesc() {
        List<Product> topProducts = productService.getTop5ByPointsDesc();
        return ResponseEntity.ok(topProducts);
    }

}