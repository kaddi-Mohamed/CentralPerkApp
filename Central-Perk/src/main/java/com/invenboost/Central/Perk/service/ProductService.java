package com.invenboost.Central.Perk.service;

import com.invenboost.Central.Perk.dto.ProductDTO;
import com.invenboost.Central.Perk.entity.Category;
import com.invenboost.Central.Perk.entity.Product;
import com.invenboost.Central.Perk.repository.CategoryRepository;
import com.invenboost.Central.Perk.repository.ProductRepository;
import com.invenboost.Central.Perk.utils.FileStorageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;


import org.springframework.web.multipart.MultipartFile;

import java.util.List;



@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;
    @Value("${file.upload-dir}")
    private String uploadDir ;
    public Product createProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setPoint(productDTO.getPoint());
        product.setDescription(productDTO.getDescription());

        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(()->new RuntimeException("Category not found"));
        product.setCategory(category);

        if (productDTO.getImage() != null && !productDTO.getImage().isEmpty()) {
            String imageUrl = FileStorageUtil.saveFile(uploadDir, "products", productDTO.getImage());
            product.setImageUrl(imageUrl);
        }

        return productRepository.save(product);
    }

    public Product updateProduct(Long productId, ProductDTO productDTO) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(productDTO.getName());
        product.setPoint(productDTO.getPoint());
        product.setDescription(productDTO.getDescription());
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(()->new RuntimeException("Category not found"));
        product.setCategory(category);
        MultipartFile file = productDTO.getImage();
        if (file != null && !file.isEmpty()){
            FileStorageUtil.deleteFile(uploadDir ,product.getImageUrl());
            String newImageUrl = FileStorageUtil.saveFile(uploadDir, "products", file);
            product.setImageUrl(newImageUrl);
        }

        return productRepository.save(product);
    }

    public void deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Delete the associated image
        FileStorageUtil.deleteFile(uploadDir , product.getImageUrl());
        productRepository.delete(product);
    }

    public Product getProductById(long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll() ;
    }

    public Product addCategoryToProduct(Long id , Category category){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setCategory(category);
        return productRepository.save(product);
    }
    public List<Product> getFiveRandomProducts() {
        return productRepository.findRandomProducts(PageRequest.of(0, 5));
    }

    public List<Product> getTop5ByPointsDesc() {
        return productRepository.findAllByOrderByPointDesc(PageRequest.of(0, 5));
    }

}
