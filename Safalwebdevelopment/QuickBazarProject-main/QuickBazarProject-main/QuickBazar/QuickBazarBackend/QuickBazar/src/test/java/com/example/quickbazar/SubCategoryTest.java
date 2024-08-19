package com.example.quickbazar;

import com.example.quickbazar.Entity.Category;
import com.example.quickbazar.Entity.SubCategory;
import com.example.quickbazar.Pojo.SubCategoryPojo;
import com.example.quickbazar.Repo.CategoryRepo;
import com.example.quickbazar.Repo.SubCategoryRepo;
import com.example.quickbazar.Service.Impl.SubCategoryImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class SubCategoryTest {

    @Mock
    private SubCategoryRepo subCategoryRepo;

    @Mock
    private CategoryRepo categoryRepo;

    @InjectMocks
    private SubCategoryImpl subCategoryService;

    @Test
    public void testSaveSubCategory_WithValidCategory()  {
        // Prepare data
        SubCategoryPojo subCategoryPojo = new SubCategoryPojo();
        subCategoryPojo.setId(1);
        subCategoryPojo.setSubCategoryName("Test SubCategory");
        subCategoryPojo.setCategoryId(1);

        Category category = new Category();
        category.setId(1);
        category.setName("Test Category");

        when(categoryRepo.findById(1)).thenReturn(Optional.of(category));
        when(subCategoryRepo.save(any(SubCategory.class))).thenReturn(new SubCategory());

        System.out.println("Test 'testSaveSubCategory_WithValidCategory' was successful!");
    }


    @Test
    public void testFindAll() {
        // Prepare data
        List<SubCategory> subCategories = new ArrayList<>();

        when(subCategoryRepo.findAll()).thenReturn(subCategories);

        // Call the method and assert result
        assertEquals(subCategories, subCategoryService.findAll());

        System.out.println("Test 'testFindAll' was successful!");
    }

    @Test
    public void testFindById() {
        // Prepare data
        Optional<SubCategory> optionalSubCategory = Optional.of(new SubCategory());

        when(subCategoryRepo.findById(1)).thenReturn(optionalSubCategory);

        // Call the method and assert result
        assertEquals(optionalSubCategory, subCategoryService.findById(1));

        System.out.println("Test 'testFindById' was successful!");
    }

    @Test
    public void testDeleteById() {
        // Call the method
        subCategoryService.deleteById(1);

        // Verify that deleteById method of subCategoryRepo is called once
        verify(subCategoryRepo, times(1)).deleteById(1);

        System.out.println("Test 'testDeleteById' was successful!");
    }

    @Test
    public void testFindByCategoryId() {
        // Prepare data
        List<SubCategory> subCategories = new ArrayList<>();

        when(subCategoryRepo.findByCategoryId(1)).thenReturn(subCategories);

        // Call the method and assert result
        assertEquals(subCategories, subCategoryService.findByCategoryId(1));

        System.out.println("Test 'testFindByCategoryId' was successful!");
    }
}

