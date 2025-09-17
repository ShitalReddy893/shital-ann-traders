package com.anntraders.product.service;

import org.springframework.stereotype.Service;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3UploadService {

	private final S3Client s3Client;
	private final String bucketName = "your-bucket-name";

	public S3UploadService() {
		this.s3Client = S3Client.builder().region(Region.US_EAST_1) // तुझ्या region नुसार बदल
				.credentialsProvider(ProfileCredentialsProvider.create()).build();
	}

	public String uploadFile(MultipartFile file) throws IOException {
		String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

		s3Client.putObject(PutObjectRequest.builder().bucket(bucketName).key(fileName)
				.contentType(file.getContentType()).acl("public-read") // public URL मिळण्यासाठी
				.build(), software.amazon.awssdk.core.sync.RequestBody.fromBytes(file.getBytes()));

		return "https://" + bucketName + ".s3.amazonaws.com/" + fileName;
	}
}
