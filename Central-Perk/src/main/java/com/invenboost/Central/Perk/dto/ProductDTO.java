package com.invenboost.Central.Perk.dto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
@Getter
@Setter
public class ProductDTO {
    private String name;
    private int point;
    private long categoryId ;
    private String description;
    private MultipartFile image;
}
