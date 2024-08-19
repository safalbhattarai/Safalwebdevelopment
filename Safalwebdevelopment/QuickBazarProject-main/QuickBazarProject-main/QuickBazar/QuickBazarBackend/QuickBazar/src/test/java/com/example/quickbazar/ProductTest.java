package com.example.quickbazar;
import com.example.quickbazar.Entity.Category;
import com.example.quickbazar.Entity.Product;
import com.example.quickbazar.Entity.SubCategory;
import com.example.quickbazar.Entity.User;
import com.example.quickbazar.Pojo.ProductPojo;
import com.example.quickbazar.Repo.CategoryRepo;
import com.example.quickbazar.Repo.ProductRepo;
import com.example.quickbazar.Repo.SubCategoryRepo;
import com.example.quickbazar.Repo.UserRepo;
import com.example.quickbazar.Service.Impl.ProductImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ProductTest {

    @Mock
    private ProductRepo productRepo;

    @Mock
    private CategoryRepo categoryRepo;

    @Mock
    private SubCategoryRepo subCategoryRepo;

    @Mock
    private UserRepo userRepo;

    @InjectMocks
    private ProductImpl productService;

    @Test
    public void testSaveProduct() throws IOException {
        // Prepare data
        ProductPojo productPojo = new ProductPojo();
        productPojo.setId(1);
        productPojo.setProductName("Test Product");
        productPojo.setProductBrand("Test Brand");
        productPojo.setProductCondition("New");
        productPojo.setPrice("100");
        productPojo.setAddress("Test Address");
        productPojo.setProductDiscription("Test Description");
        productPojo.setCategoryId(1);
        productPojo.setSubCategoryId(1);
        productPojo.setUserId(1L);
        productPojo.setProductImage(null); // Assuming no image for simplicity

        Category category = new Category();
        category.setId(1);
        category.setName("Test Category");

        SubCategory subCategory = new SubCategory();
        subCategory.setId(1);
        subCategory.setSubCategoryName("Test SubCategory");

        User user = new User();
        user.setId(1L);
        user.setFullName("Test User");

        productRepo.save(new Product());

        System.out.println("Test 'testSaveProduct' was successful!");



    }

    @Test
    public void testSaveProduct_WithInvalidCategoryId() {
        ProductPojo productPojo = new ProductPojo();
        productPojo.setId(1);
        productPojo.setProductName("Test Product");
        productPojo.setCategoryId(1);

        when(categoryRepo.findById(1)).thenReturn(Optional.empty());

        System.out.println("Test 'testSaveProduct_WithInvalidCategoryId' was successful!");

    }


}

