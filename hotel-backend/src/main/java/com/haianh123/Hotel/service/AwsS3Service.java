package com.haianh123.Hotel.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.haianh123.Hotel.exception.OurException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
public class AwsS3Service {

    private final String bucketName = "haianh-hotel-images";

    @Value("${aws.s3.secret.key}")
    private String awsS3secretKey;

    @Value("${aws.s3.access.key}")
    private String awsS3accessKey;

    @Value("${aws.s3.region}")
    private String awsRegion; // Thêm biến region từ file cấu hình

    public String saveImageToS3(MultipartFile photo){
        String s3LocationImage = null;

        try {
            String s3Filename = photo.getOriginalFilename();

            BasicAWSCredentials awsCredentials = new BasicAWSCredentials(awsS3accessKey, awsS3secretKey);
            AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                    .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                    .withRegion(awsRegion) // Sử dụng biến region từ file cấu hình
                    .build();

            InputStream inputStream = photo.getInputStream();

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType("image/jpeg");

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, s3Filename, inputStream, metadata);
            s3Client.putObject(putObjectRequest);
            s3LocationImage = "https://" + bucketName + ".s3." + awsRegion + ".amazonaws.com/" + s3Filename;
            return s3LocationImage;
        } catch (Exception e){
            e.printStackTrace();
            throw new OurException("Unable to upload image to s3 bucket: " + e.getMessage());
        }
    }
}
