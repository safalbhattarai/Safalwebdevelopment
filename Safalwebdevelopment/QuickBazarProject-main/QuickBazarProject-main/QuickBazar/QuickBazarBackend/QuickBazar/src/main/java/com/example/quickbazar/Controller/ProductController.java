package com.example.quickbazar.Controller;

import com.example.quickbazar.Entity.Product;
import com.example.quickbazar.Entity.User;
import com.example.quickbazar.Pojo.ProductPojo;
import com.example.quickbazar.Service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/save")
    public String saveProduct(@RequestBody @ModelAttribute ProductPojo productPojo) throws IOException {
        productService.saveProduct(productPojo);

        return "Saved successfully";
    }



    @GetMapping("/findAll")
    public List<Product> getAllProducts() {
        return productService.findAll();
    }


    @GetMapping("/findById/{id}")
    public Optional<Product> getById(@PathVariable("id") Integer id){
        return this.productService.findById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Integer id){
        this.productService.deleteById(id);
    }

    @GetMapping("/findByCategoryId/{id}") // Change the mapping to avoid conflict
    public List<Product> findByCategoryId(@PathVariable("id") Integer id) {
        return productService.findByCategoryId(id);
    }

    @GetMapping("/findBySubCategoryId/{id}") // Change the mapping to avoid conflict
    public List<Product> findBySubCategoryId(@PathVariable("id") Integer id) {
        return productService.findBySubCategoryId(id);
    }

    @GetMapping("/findByUserId/{id}") // Change the mapping to avoid conflict
    public List<Product> findByUserId(@PathVariable("id") User id) {
        return productService.findByUserId(id);
    }


}


