package org.example.RecommendationAPI.models;

import org.springframework.web.multipart.MultipartFile;

public class FileInput {

    public MultipartFile file;

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
