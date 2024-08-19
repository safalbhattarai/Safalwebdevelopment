package com.example.quickbazar.Service;

import com.example.quickbazar.Entity.Category;
import com.example.quickbazar.Pojo.CategoryPojo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface CategoryService {
    void saveCategory(CategoryPojo categoryPojo);


    List<Category> findAll();

    Optional<Category> findById(Integer id);

    void deleteById(Integer id);

    void saveCategory(Category category);

}

