package com.example.quickbazar.Controller;

import com.example.quickbazar.Entity.Category;
import com.example.quickbazar.Pojo.CategoryPojo;
import com.example.quickbazar.Service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping("save")
    public String saveUser(@RequestBody CategoryPojo categoryPojo){
        categoryService.saveCategory(categoryPojo);
        return "Category successfully created";
    }

    @GetMapping("/findAll")
    public List<Category> getAll(){
        return this.categoryService.findAll();
    }

    @GetMapping("/findById/{id}")
    public Optional<Category> getById(@PathVariable("id") Integer id){
        return this.categoryService.findById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Integer id){
        this.categoryService.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public String updateCategory(@PathVariable("id") Integer id, @RequestBody CategoryPojo categoryPojo) {
        Optional<Category> existingCategory = categoryService.findById(id);

        if(existingCategory.isPresent()) {
            Category category = existingCategory.get();
            // Update the category name
            category.setName(categoryPojo.getName());
            categoryService.saveCategory(category);
            return "Category successfully updated";
        } else {
            return "Category not found";
        }
    }


}
