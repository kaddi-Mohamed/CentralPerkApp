package com.invenboost.Central.Perk.controllers;

import com.invenboost.Central.Perk.dto.CategoryDTO;
import com.invenboost.Central.Perk.entity.Category;
import com.invenboost.Central.Perk.entity.Product;
import com.invenboost.Central.Perk.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author HP
 **/

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Category> createCategory(@ModelAttribute CategoryDTO categoryDTO) {
        return ResponseEntity.ok(categoryService.createCategory(categoryDTO));
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @PutMapping(path = "/{id}" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @ModelAttribute CategoryDTO categoryDTO) {
        return ResponseEntity.ok(categoryService.updateCategory(id, categoryDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok("Category deleted");
    }

    @PostMapping("/{categoryId}/products/{productId}")
    public ResponseEntity<Product> addProductToCategory(@PathVariable Long categoryId, @PathVariable Long productId) {
        return ResponseEntity.ok(categoryService.addProductToCategory(categoryId, productId));
    }
    @GetMapping("/random3")
    public ResponseEntity<List<Category>> getThreeRandomCategories() {
        List<Category> randomCategories = categoryService.getThreeRandomCategories();
        return ResponseEntity.ok(randomCategories);
    }
}
