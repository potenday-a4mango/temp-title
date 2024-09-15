//package com.intoonpocket.backend.config;
//
//import com.amazonaws.SdkClientException;
//import com.amazonaws.auth.AWSStaticCredentialsProvider;
//import com.amazonaws.auth.BasicAWSCredentials;
//import com.amazonaws.client.builder.AwsClientBuilder;
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.AmazonS3ClientBuilder;
//import com.amazonaws.services.s3.model.AmazonS3Exception;
//import com.amazonaws.services.s3.model.ObjectMetadata;
//import com.amazonaws.services.s3.model.PutObjectRequest;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.PropertySource;
//
//import java.io.ByteArrayInputStream;
//
//@Configuration
//@PropertySource("classpath:application.yml")
//public class NcpStorageConfig {
//    @Value("${cloud.aws.s3.endpoint}")
//    private String endPoint;
//    @Value("${cloud.aws.credentials.region.static}")
//    private String regionName;
//    @Value("${cloud.aws.credentials.access-key}")
//    private String accessKey;
//    @Value("${cloud.aws.credentials.secret-key}")
//    private String secretKey;
//    @Value("${cloud.aws.s3.bucket}")
//    private String bucketName;
//
//    // S3 client
//    final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
//            .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(endPoint, regionName))
//            .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
//            .build();
//
//    // create folder
//    String folderName = "sample-folder/";
//
//    ObjectMetadata objectMetadata = new ObjectMetadata();
//    objectMetadata.setContentLength(0L);
//    objectMetadata.setContentType("application/x-directory");
//    PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, folderName, new ByteArrayInputStream(new byte[0]), objectMetadata);
//
//try
//
//    {
//        s3.putObject(putObjectRequest);
//        System.out.format("Folder %s has been created.\n", folderName);
//    } catch(
//    AmazonS3Exception e)
//
//    {
//        e.printStackTrace();
//    } catch(
//    SdkClientException e)
//
//    {
//        e.printStackTrace();
//    }
//
//    // upload local file
//    String objectName = "sample-object";
//    String filePath = "/tmp/sample.txt";
//
//try
//
//    {
//        s3.putObject(bucketName, objectName, new File(filePath));
//        System.out.format("Object %s has been created.\n", objectName);
//    } catch(
//    AmazonS3Exception e)
//
//    {
//        e.printStackTrace();
//    } catch(
//    SdkClientException e)
//
//    {
//        e.printStackTrace();
//    }
//}
