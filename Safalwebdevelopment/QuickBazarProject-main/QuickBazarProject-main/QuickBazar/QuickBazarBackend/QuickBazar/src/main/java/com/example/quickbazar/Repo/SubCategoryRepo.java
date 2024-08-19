package com.example.quickbazar.Repo;

import com.example.quickbazar.Entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubCategoryRepo extends JpaRepository<SubCategory, Integer> {
    List<SubCategory> findByCategoryId(Integer categoryId);
}
