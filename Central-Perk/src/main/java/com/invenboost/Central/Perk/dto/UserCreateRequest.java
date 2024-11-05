package com.invenboost.Central.Perk.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author HP
 **/
@Getter
@Setter
public class UserCreateRequest {
    @NotBlank(message = "Username is required")
    private String name;
    private long point ;
    private MultipartFile image;
}
