package com.example.quickbazar.Pojo;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SubCategoryPojo {


    private Integer id;

    @NotNull
    private String subCategoryName;

    @NotNull
    private Integer categoryId;

}
