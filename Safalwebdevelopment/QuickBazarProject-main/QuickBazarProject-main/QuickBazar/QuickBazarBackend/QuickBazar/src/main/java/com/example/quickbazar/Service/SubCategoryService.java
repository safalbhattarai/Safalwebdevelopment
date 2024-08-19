package com.example.quickbazar.Service;


import com.example.quickbazar.Entity.Category;
import com.example.quickbazar.Entity.Product;
import com.example.quickbazar.Entity.SubCategory;
import com.example.quickbazar.Pojo.SubCategoryPojo;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface SubCategoryService {

    void saveSubCategory(SubCategoryPojo subCategoryPojo)  throws IOException;

    List<SubCategory> findAll();

    Optional<SubCategory> findById(Integer id);

    void deleteById(Integer id);

    List<SubCategory> findByCategoryId(Integer categoryId);


}
