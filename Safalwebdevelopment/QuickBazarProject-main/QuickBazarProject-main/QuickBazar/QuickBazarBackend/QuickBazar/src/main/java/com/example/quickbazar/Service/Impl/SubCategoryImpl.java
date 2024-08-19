package com.example.quickbazar.Service.Impl;

import com.example.quickbazar.Entity.Category;
import com.example.quickbazar.Entity.Product;
import com.example.quickbazar.Entity.SubCategory;
import com.example.quickbazar.Pojo.SubCategoryPojo;
import com.example.quickbazar.Repo.CategoryRepo;
import com.example.quickbazar.Repo.SubCategoryRepo;
import com.example.quickbazar.Service.SubCategoryService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubCategoryImpl implements SubCategoryService {

    private final SubCategoryRepo subCategoryRepo;
    private final CategoryRepo categoryRepo;

    @Override
    public void saveSubCategory(SubCategoryPojo subCategoryPojo)  {
        SubCategory subCategory;
        if (subCategoryPojo.getId() != null) {
            subCategory = subCategoryRepo.findById(subCategoryPojo.getId())
                    .orElseThrow(() -> new EntityNotFoundException("SubCategory not found with ID: " + subCategoryPojo.getId()));
        } else {
            subCategory = new SubCategory();
        }

        subCategory.setSubCategoryName(subCategoryPojo.getSubCategoryName());

//        Category category = categoryRepo.findById(subCategoryPojo.getCategoryId())
//                .orElseThrow(() -> new EntityNotFoundException("Category not found with ID: " + subCategoryPojo.getCategoryId()));
        Category category = categoryRepo.findById(subCategoryPojo.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found with ID: " + subCategoryPojo.getCategoryId()));


        subCategory.setCategory(category);
        subCategoryRepo.save(subCategory);
    }

    @Override
    public List<SubCategory> findAll() {
        return subCategoryRepo.findAll();
    }

    @Override
    public Optional<SubCategory> findById(Integer id) {
        return subCategoryRepo.findById(id);
    }

    @Override
    public void deleteById(Integer id) {
        subCategoryRepo.deleteById(id);
    }

    @Override
    public List<SubCategory> findByCategoryId(Integer categoryId) {
        return subCategoryRepo.findByCategoryId(categoryId);
    }
}
