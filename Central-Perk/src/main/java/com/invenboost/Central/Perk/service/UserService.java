package com.invenboost.Central.Perk.service;

import com.invenboost.Central.Perk.dto.UserCreateRequest;

import com.invenboost.Central.Perk.entity.User;
import com.invenboost.Central.Perk.repository.UserRepository;
import com.invenboost.Central.Perk.utils.FileStorageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.*;

/**
 * @author HP
 **/
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Value("${file.upload-dir}")
    private String uploadDir;



    public User createUser(UserCreateRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setPoint(request.getPoint());
        MultipartFile file = request.getImage() ;
        String imageUrl =  FileStorageUtil.saveFile(uploadDir, "user", file);
        user.setImageUrl(imageUrl);
        return userRepository.save(user);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return user ;
    }

    public User updateUser(Long userId, UserCreateRequest userCreateRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(userCreateRequest.getName());
        user.setPoint(userCreateRequest.getPoint());

        MultipartFile newFile = userCreateRequest.getImage();
        if (newFile != null && !newFile.isEmpty()) {
            if (user.getImageUrl() != null) {
                FileStorageUtil.deleteFile(uploadDir , user.getImageUrl());
            }
            String newFileUrl = FileStorageUtil.saveFile(uploadDir,"user", newFile);
            user.setImageUrl(newFileUrl);
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getImageUrl() != null) {
            FileStorageUtil.deleteFile(uploadDir,user.getImageUrl());
        }
        userRepository.deleteById(userId) ;
    }

    public void addPoint(Long userId, Long point) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPoint(user.getPoint() + point);
        userRepository.save(user);
    }

    public void deductPoint(Long userId, Long point) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPoint(user.getPoint() - point);
        userRepository.save(user);
    }
    public List<User> getTop3ByPoints() {
        return userRepository.findTop3ByPoints(PageRequest.of(0, 3));
    }
}
