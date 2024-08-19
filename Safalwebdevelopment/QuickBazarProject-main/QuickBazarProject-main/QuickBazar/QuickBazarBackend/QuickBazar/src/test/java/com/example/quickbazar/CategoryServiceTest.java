package com.example.quickbazar;

import com.example.quickbazar.Entity.Category;
import com.example.quickbazar.Pojo.CategoryPojo;
import com.example.quickbazar.Repo.CategoryRepo;
import com.example.quickbazar.Service.Impl.CategoryServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CategoryServiceTest {

    @Mock
    private CategoryRepo categoryRepo;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveCategory() {
        // Mock data
        CategoryPojo categoryPojo = new CategoryPojo();
        categoryPojo.setId(1);
        categoryPojo.setName("Test Category");

        Category category = new Category();
        category.setId(1);
        category.setName("Test Category");

        when(categoryRepo.findById(1)).thenReturn(Optional.of(category));
        when(categoryRepo.save(any(Category.class))).thenReturn(category);

        // Call the method
        categoryService.saveCategory(categoryPojo);

        // Verify that save method of categoryRepo is called once
        verify(categoryRepo, times(1)).save(any(Category.class));
    }


    @Test
    void testFindAll() {
        // Mock data
        List<Category> categories = new ArrayList<>();
        categories.add(new Category(1, "Category 1"));
        categories.add(new Category(2, "Category 2"));

        when(categoryRepo.findAll()).thenReturn(categories);

        // Call the method
        List<Category> result = categoryService.findAll();

        // Verify that findAll method of categoryRepo is called once
        verify(categoryRepo, times(1)).findAll();

        // Verify the result
        assertEquals(categories.size(), result.size());
        assertEquals(categories.get(0).getName(), result.get(0).getName());
        assertEquals(categories.get(1).getName(), result.get(1).getName());

        System.out.println("Test 'testFindAll' was successful!");
    }



    @Test
    void testDeleteById() {
        // Mock behavior
        doNothing().when(categoryRepo).deleteById(anyInt());

        // Call the method
        categoryService.deleteById(1);

        verify(categoryRepo, times(1)).deleteById(1);
        System.out.println("Test 'testDeleteById' was successful!");

    }

    @Test
    void testFindById() {
        // Mock data
        Category category = new Category(1, "Category 1");

        // Mock behavior
        when(categoryRepo.findById(1)).thenReturn(Optional.of(category));

        // Call the method
        Optional<Category> result = categoryService.findById(1);

        assertEquals(category, result.orElse(null));
        System.out.println("Test 'testFindById' was successful!");
    }
}


