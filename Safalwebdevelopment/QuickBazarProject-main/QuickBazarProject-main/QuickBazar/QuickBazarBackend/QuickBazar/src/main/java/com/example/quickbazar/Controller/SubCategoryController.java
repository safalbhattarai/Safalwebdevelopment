package com.example.quickbazar.Controller;

import com.example.quickbazar.Entity.Category;
import com.example.quickbazar.Entity.Product;
import com.example.quickbazar.Entity.SubCategory;
import com.example.quickbazar.Pojo.SubCategoryPojo;
import com.example.quickbazar.Service.SubCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("subCategory")
@RequiredArgsConstructor
public class SubCategoryController {

    private final SubCategoryService subCategoryService;

    @PostMapping("/save")
    public String saveSubCategory(@RequestBody SubCategoryPojo subCategoryPojo) throws IOException {
        subCategoryService.saveSubCategory(subCategoryPojo);
        return "Saved successfully";
    }


    @GetMapping("/findAll")
    public List<SubCategory> getAll(){
        return this.subCategoryService.findAll();
    }



    @GetMapping("/findById/{id}")
    public Optional<SubCategory> getById(@PathVariable("id") Integer id){
        return this.subCategoryService.findById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Integer id){
        this.subCategoryService.deleteById(id);
    }

    @GetMapping("/findByCategoryId/{id}") // Change the mapping to avoid conflict
    public List<SubCategory> findByCategoryId(@PathVariable("id") Integer id) {
        return subCategoryService.findByCategoryId(id);
    }


}
