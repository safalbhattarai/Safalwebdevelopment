package com.example.quickbazar.Service.Impl;

import com.example.quickbazar.Entity.Category;
import com.example.quickbazar.Entity.Product;
import com.example.quickbazar.Entity.SubCategory;
import com.example.quickbazar.Entity.User;
import com.example.quickbazar.Pojo.ProductPojo;
import com.example.quickbazar.Repo.CategoryRepo;
import com.example.quickbazar.Repo.ProductRepo;
import com.example.quickbazar.Repo.SubCategoryRepo;
import com.example.quickbazar.Repo.UserRepo;
import com.example.quickbazar.Service.ProductService;
import com.example.quickbazar.util.ImageToBase64;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ProductImpl implements ProductService {

    private final ProductRepo productRepo;
    private final CategoryRepo categoryRepo;
    private final SubCategoryRepo subCategoryRepo;
    private final UserRepo userRepo;

    private final String UPLOAD_DIRECTORY = new StringBuilder().append(System.getProperty("user.dir")).append("/image_uploads/Product-Images").toString();
    ImageToBase64 imageToBase64 = new ImageToBase64();


    @Override
    public void saveProduct(ProductPojo productPojo) throws IOException {
        Product product;
        if (productPojo.getId() != null) {
            product = productRepo.findById(productPojo.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + productPojo.getId()));
        } else {
            product = new Product();
        }

        product.setProductName(productPojo.getProductName());
        product.setProductBrand(productPojo.getProductBrand());
        product.setProductCondition(productPojo.getProductCondition());
        product.setPrice(productPojo.getPrice());
        product.setAddress(productPojo.getAddress());
        product.setProductDiscription(productPojo.getProductDiscription());
        product.setPhone(productPojo.getPhone());

        Category category = categoryRepo.findById(productPojo.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found with ID: " + productPojo.getCategoryId()));

        SubCategory subCategory = subCategoryRepo.findById(productPojo.getSubCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("sub-Category not found with ID: " + productPojo.getSubCategoryId()));

        User user = userRepo.findById(productPojo.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productPojo.getUserId()));



        if (productPojo.getProductImage() != null) {
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, productPojo.getProductImage().getOriginalFilename());
            Files.write(fileNameAndPath, productPojo.getProductImage().getBytes());
        }
        product.setProductImage(productPojo.getProductImage().getOriginalFilename());


        product.setCategory(category);
        product.setSubCategory(subCategory);
        product.setUserId(user);
        productRepo.save(product);
    }


    @Override
    public List<Product> findAll(){
        List<Product> products = productRepo.findAll();
        products = products.stream().map(product -> {
            product.setProductImage(imageToBase64.getImageBase64("/Product-Images/" + product.getProductImage()));
            return product;
        }).collect(Collectors.toList());
        return products;
    }

    @Override
    public Optional<Product> findById(Integer id){
        Optional<Product> optionalProduct = productRepo.findById(id);
        return optionalProduct.map(product -> {
            product.setProductImage(imageToBase64.getImageBase64("/Product-Images/" + product.getProductImage()));
            return product;
        });
    }


    @Override
    public void deleteById(Integer id) {
        productRepo.deleteById(id);
    }

    @Override
    public List<Product> findByCategoryId(Integer categoryId) {
        return productRepo.findByCategoryId(categoryId);
    }

    @Override
    public List<Product> findBySubCategoryId(Integer subCategoryId) {
        return productRepo.findBySubCategoryId(subCategoryId);
    }

    @Override
    public List<Product> findByUserId(User userId) {
        return productRepo.findByUserId(userId);
    }



}
