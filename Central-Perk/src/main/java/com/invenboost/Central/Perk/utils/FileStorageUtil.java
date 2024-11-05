package com.invenboost.Central.Perk.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

/**
 * @author HP
 **/
public class FileStorageUtil {
    public static String saveFile(String uploadDir, String subDir, MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File must not be null or empty");
        }

        try {
            // Generate a unique file name
            String uniqueFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path destinationPath = Paths.get(uploadDir, subDir).toAbsolutePath().resolve(uniqueFileName);

            // Ensure the directory exists
            Files.createDirectories(destinationPath.getParent());

            // Copy file to the destination
            Files.copy(file.getInputStream(), destinationPath);

            // Return the file name (not full path) to be used as URL
            return "/uploads" + "/" + subDir + "/" + uniqueFileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

    public static void deleteFile(String uploadDir, String storedPath) {
        try {
            // Remove the "uploads/" prefix if it exists
            String relativePath = storedPath;
            if (storedPath.startsWith("uploads/")) {
                relativePath = storedPath.substring("uploads/".length());
            }

            // Construct the full path
            Path fullPath = Paths.get(uploadDir).resolve(relativePath);

            // Delete the file if it exists
            if (Files.deleteIfExists(fullPath)) {
                // Check if directory is empty and delete it if it is
                Path parentDir = fullPath.getParent();
                if (Files.exists(parentDir) && Files.isDirectory(parentDir) &&
                        Files.list(parentDir).count() == 0) {
                    Files.delete(parentDir);
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file: " + storedPath, e);
        }
    }

    public static Path getUploadsPath() {
        // Get the current working directory (the root of the project)
        String projectDir = System.getProperty("user.dir");

        // Construct the path to the uploads directory
        Path uploadsPath = Paths.get(projectDir, "uploads");

        return uploadsPath;
    }
}