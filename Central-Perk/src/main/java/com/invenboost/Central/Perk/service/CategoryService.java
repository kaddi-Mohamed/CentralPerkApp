package com.invenboost.Central.Perk.service;

import com.invenboost.Central.Perk.dto.CategoryDTO;
import com.invenboost.Central.Perk.dto.ProductDTO;
import com.invenboost.Central.Perk.entity.Category;
import com.invenboost.Central.Perk.entity.Product;
import com.invenboost.Central.Perk.repository.CategoryRepository;
import com.invenboost.Central.Perk.utils.FileStorageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductService productService;
    @Value("${file.upload-dir}")
    private  String uploadDir;

    public Category createCategory(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setPoint(categoryDTO.getPoint());
        if (categoryDTO.getImage() != null) {
            String imageUrl = FileStorageUtil.saveFile(uploadDir, "categories", categoryDTO.getImage());
            category.setImageUrl(imageUrl);
        }
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        category.setName(categoryDTO.getName());
        category.setPoint(categoryDTO.getPoint());

        MultipartFile file = categoryDTO.getImage();
        if (file != null && !file.isEmpty()) {
            FileStorageUtil.deleteFile(uploadDir , category.getImageUrl());
            String newImageUrl = FileStorageUtil.saveFile(uploadDir, "categories", file);
            category.setImageUrl(newImageUrl);
        }

        Category updatedCategory = categoryRepository.save(category);
        return updatedCategory;
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Delete the associated image
        FileStorageUtil.deleteFile(uploadDir , category.getImageUrl());
        categoryRepository.delete(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll() ; 
    }

    public Category getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return category ; 
    }

    public Product addProductToCategory(Long categoryId, Long productId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return productService.addCategoryToProduct(productId, category);
    }

    public List<Category> getThreeRandomCategories() {
        return categoryRepository.findRandomCategories(Pageable.ofSize(3));
    }


}
