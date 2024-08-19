package com.example.quickbazar.Repo;

import com.example.quickbazar.Entity.Product;
import com.example.quickbazar.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

    List<Product> findByCategoryId(Integer categoryId);

    List<Product> findBySubCategoryId(Integer subCategoryId);
    List<Product> findByUserId(User userId);
}
