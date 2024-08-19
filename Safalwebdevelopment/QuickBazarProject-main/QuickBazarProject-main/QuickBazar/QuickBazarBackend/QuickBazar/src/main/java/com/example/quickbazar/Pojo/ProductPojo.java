package com.example.quickbazar.Pojo;

import com.example.quickbazar.Entity.User;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductPojo {


    private Integer id;

    @NotNull
    private Long userId;

    @NotNull
    private Integer subCategoryId;

    @NotNull
    private Integer categoryId;

    @NotNull
    private String productName;

    @NotNull
    private String productBrand;

    @NotNull
    private String productCondition;

    @NotNull
    private String price;

    @NotNull
    private String address;

    @NotNull
    private String productDiscription;

    @NotNull
    private String phone;

    private MultipartFile productImage; //


}
