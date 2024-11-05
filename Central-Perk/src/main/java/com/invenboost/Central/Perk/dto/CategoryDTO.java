package com.invenboost.Central.Perk.dto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
/**
 * @author HP
 **/
@Getter
@Setter
public class CategoryDTO {
    private String name;
    private long point;
    private MultipartFile image;
}

